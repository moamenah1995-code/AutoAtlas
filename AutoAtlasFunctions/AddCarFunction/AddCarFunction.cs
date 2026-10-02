using System.Net;
using System.Text.Json;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using AutoAtlas.Models;

namespace AutoAtlas.Functions;

public class AddCarFunction
{
    private static readonly JsonSerializerOptions RequestJsonOptions =
        new() { PropertyNameCaseInsensitive = true };

    private readonly IConfiguration _config;

    public AddCarFunction(IConfiguration config)
    {
        _config = config;
    }

    [Function("AddCar")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post")]
        HttpRequestData req)
    {
        var car = await JsonSerializer.DeserializeAsync<Car>(req.Body, RequestJsonOptions);

        var response = req.CreateResponse();

        if (car is null)
        {
            response.StatusCode = HttpStatusCode.BadRequest;
            await response.WriteStringAsync("Request body must be valid JSON describing a car.");
            return response;
        }

        try
        {
            string? connectionString =
                _config["SqlConnectionString"];

            if (string.IsNullOrWhiteSpace(connectionString))
            {
                response.StatusCode = HttpStatusCode.InternalServerError;
                await response.WriteStringAsync("The SqlConnectionString application setting is not configured.");
                return response;
            }

            using SqlConnection conn =
                new(connectionString);

            await conn.OpenAsync();

            string sql = @"
                INSERT INTO Cars
                (Id, Brand, Model, Year, Category)
                VALUES
                (@Id,@Brand,@Model,@Year,@Category)";

            using SqlCommand cmd =
                new(sql, conn);

            cmd.Parameters.AddWithValue("@Id", car.Id);
            cmd.Parameters.AddWithValue("@Brand", car.Brand);
            cmd.Parameters.AddWithValue("@Model", car.Model);
            cmd.Parameters.AddWithValue("@Year", car.Year);
            cmd.Parameters.AddWithValue("@Category", car.Category);

            await cmd.ExecuteNonQueryAsync();

            response.StatusCode = HttpStatusCode.Created;

            await response.WriteStringAsync(
                $"Car {car.Brand} {car.Model} added.");

            return response;
        }
        catch (SqlException ex)
        {
            response.StatusCode = HttpStatusCode.BadRequest;

            await response.WriteStringAsync(
                $"Database Error: {ex.Message}");

            return response;
        }
    }
}
