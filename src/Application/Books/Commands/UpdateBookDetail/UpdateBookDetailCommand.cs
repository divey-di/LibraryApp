using LibraryApp.Application.Common.Exceptions;
using LibraryApp.Application.Common.Interfaces;
using LibraryApp.Domain.Entities;
using LibraryApp.Domain.Enums;
using MediatR;

namespace LibraryApp.Application.Books.Commands.UpdateBookDetail;

public record UpdateBookDetailCommand : IRequest
{
    public int Id { get; init; }

    public int ListId { get; init; }

    public PriorityLevel Priority { get; init; }

    public string? Note { get; init; }
}

public class UpdateBookDetailCommandHandler : IRequestHandler<UpdateBookDetailCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateBookDetailCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateBookDetailCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Books
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Book), request.Id);
        }

        // entity.ListId = request.ListId;
        // entity.Priority = request.Priority;
        // entity.Note = request.Note;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
