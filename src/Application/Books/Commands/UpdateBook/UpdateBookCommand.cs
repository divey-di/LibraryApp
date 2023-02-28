using LibraryApp.Application.Common.Exceptions;
using LibraryApp.Application.Common.Interfaces;
using LibraryApp.Application.Common.Security;
using LibraryApp.Domain.Entities;
using MediatR;

namespace LibraryApp.Application.Books.Commands.UpdateBook;

public record UpdateBookCommand : IRequest
{
    public int Id { get; init; }

    public string? Title { get; init; }

    public string? Author {get; init; }

    public string? Publisher {get; init; }

    public string? Genre {get; init; }

    public string? Synopsis {get; init; }
}

[Authorize(Policy = "RequireLibrarianRole")]
public class UpdateBookCommandHandler : IRequestHandler<UpdateBookCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateBookCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateBookCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Books
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Book), request.Id);
        }

        entity.Title = request.Title;
        entity.Author = request.Author;
        entity.Publisher = request.Publisher;
        entity.Genre = request.Genre;
        entity.Synopsis = request.Synopsis;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
