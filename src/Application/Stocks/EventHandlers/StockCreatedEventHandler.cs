using LibraryApp.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace LibraryApp.Application.Stocks.EventHandlers;

public class StockCreatedEventHandler : INotificationHandler<StockCreatedEvent>
{
    private readonly ILogger<StockCreatedEventHandler> _logger;

    public StockCreatedEventHandler(ILogger<StockCreatedEventHandler> logger)
    {
        _logger = logger;
    }

    public Task Handle(StockCreatedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("LibraryApp Domain Event: {DomainEvent}", notification.GetType().Name);

        return Task.CompletedTask;
    }
}
