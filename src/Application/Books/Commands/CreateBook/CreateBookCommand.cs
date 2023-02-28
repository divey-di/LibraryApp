using LibraryApp.Application.Common.Interfaces;
using LibraryApp.Application.Common.Security;
using LibraryApp.Domain.Entities;
using LibraryApp.Domain.Events;
using MediatR;

namespace LibraryApp.Application.Books.Commands.CreateBook;

public record CreateBookCommand : IRequest<int>
{
    public int Id { get; init; }
    
    public int Isbn { get; init; }

    public string? Title { get; init; }

    public string? Author { get; init; }
}

[Authorize(Policy = "RequireLibrarianRole")]
public class CreateBookCommandHandler : IRequestHandler<CreateBookCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateBookCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateBookCommand request, CancellationToken cancellationToken)
    {
        var entity = new Book
        {
            Id = request.Id,
            Isbn = request.Isbn,
            Title = request.Title,
            Author = request.Author
        };

        entity.AddDomainEvent(new BookCreatedEvent(entity));

        _context.Books.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
