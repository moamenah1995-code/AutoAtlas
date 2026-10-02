using AutoAtlas.Models;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Extensions.Logging;

namespace AutoAtlasFunctions.CarChangeProcessor;

public sealed class CarChangeProcessor(ILogger<CarChangeProcessor> logger)
{
    [Function(nameof(CarChangeProcessor))]
    public void Run(
        [SqlTrigger("[dbo].[Cars]", "SqlConnectionString")]
        IReadOnlyList<SqlChange<Car>> changes)
    {
        foreach (var change in changes)
        {
            logger.LogInformation(
                "Car table change: {Operation} for car {CarId}.",
                change.Operation,
                change.Item.Id);
        }
    }
}
