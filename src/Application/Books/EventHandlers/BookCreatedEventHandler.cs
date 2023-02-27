using LibraryApp.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace LibraryApp.Application.Books.EventHandlers;

public class BookCreatedEventHandler : INotificationHandler<BookCreatedEvent>
{
    private readonly ILogger<BookCreatedEventHandler> _logger;

    public BookCreatedEventHandler(ILogger<BookCreatedEventHandler> logger)
    {
        _logger = logger;
    }

    public Task Handle(BookCreatedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("LibraryApp Domain Event: {DomainEvent}", notification.GetType().Name);

        return Task.CompletedTask;
    }
}
