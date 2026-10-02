using System.Data;
using AutoAtlas.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace AutoAtlasFunctions.Services;

public sealed class DatabaseService
{
    private static readonly HashSet<int> TransientSqlErrorNumbers =
    [
        233, 64, 20, 10053, 10054, 10060, 10928, 10929,
        40143, 40197, 40501, 40540, 40613,
        49918, 49919, 49920
    ];

    private readonly string _connectionString;

    public DatabaseService(IConfiguration configuration)
    {
        var configuredConnectionString = configuration["SqlConnectionString"];
        if (string.IsNullOrWhiteSpace(configuredConnectionString))
        {
            throw new InvalidOperationException(
                "The SqlConnectionString application setting is required.");
        }

        var builder = new SqlConnectionStringBuilder(configuredConnectionString)
        {
            Encrypt = true,
            TrustServerCertificate = false,
            ConnectTimeout = 30,
            ConnectRetryCount = 0,
            MaxPoolSize = 20
        };

        _connectionString = builder.ConnectionString;
    }

    public async Task<Car> AddCarAsync(Car car, CancellationToken cancellationToken)
    {
        await using var connection = await OpenConnectionWithRetryAsync(
            _connectionString,
            cancellationToken);

        const string commandText = """
            INSERT INTO [dbo].[Cars] ([Brand], [Model], [Year], [Category])
            OUTPUT INSERTED.[Id], INSERTED.[Brand], INSERTED.[Model],
                   INSERTED.[Year], INSERTED.[Category]
            VALUES (@Brand, @Model, @Year, @Category);
            """;

        await using var command = new SqlCommand(commandText, connection);
        command.Parameters.Add("@Brand", SqlDbType.NVarChar, 100).Value = car.Brand;
        command.Parameters.Add("@Model", SqlDbType.NVarChar, 100).Value = car.Model;
        command.Parameters.Add("@Year", SqlDbType.Int).Value = car.Year;
        command.Parameters.Add("@Category", SqlDbType.NVarChar, 50).Value = car.Category;

        await using var reader = await command.ExecuteReaderAsync(cancellationToken);
        if (!await reader.ReadAsync(cancellationToken))
        {
            throw new DataException("The inserted car was not returned by the database.");
        }

        return new Car
        {
            Id = reader.GetInt32(0),
            Brand = reader.GetString(1),
            Model = reader.GetString(2),
            Year = reader.GetInt32(3),
            Category = reader.GetString(4)
        };
    }

    private static async Task<SqlConnection> OpenConnectionWithRetryAsync(
        string connectionString,
        CancellationToken cancellationToken)
    {
        const int maxAttempts = 4;
        for (var attempt = 1; ; attempt++)
        {
            var connection = new SqlConnection(connectionString);
            try
            {
                await connection.OpenAsync(cancellationToken);
                return connection;
            }
            catch (SqlException exception) when (
                attempt < maxAttempts &&
                IsTransient(exception))
            {
                await connection.DisposeAsync();
                var delay = TimeSpan.FromSeconds(Math.Min(5 * (1 << (attempt - 1)), 60));
                await Task.Delay(delay, cancellationToken);
            }
            catch
            {
                await connection.DisposeAsync();
                throw;
            }
        }
    }

    private static bool IsTransient(SqlException exception) =>
        exception.Errors
            .Cast<SqlError>()
            .Any(error => TransientSqlErrorNumbers.Contains(error.Number));
}
