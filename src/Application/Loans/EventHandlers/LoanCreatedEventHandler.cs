using LibraryApp.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace LibraryApp.Application.Loans.EventHandlers;

public class LoanCreatedEventHandler : INotificationHandler<LoanCreatedEvent>
{
    private readonly ILogger<LoanCreatedEventHandler> _logger;

    public LoanCreatedEventHandler(ILogger<LoanCreatedEventHandler> logger)
    {
        _logger = logger;
    }

    public Task Handle(LoanCreatedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("LibraryApp Domain Event: {DomainEvent}", notification.GetType().Name);

        return Task.CompletedTask;
    }
}
