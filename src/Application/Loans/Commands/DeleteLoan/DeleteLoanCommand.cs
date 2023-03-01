using LibraryApp.Application.Common.Exceptions;
using LibraryApp.Application.Common.Interfaces;
using LibraryApp.Application.Common.Security;
using LibraryApp.Domain.Entities;
using LibraryApp.Domain.Events;
using MediatR;

namespace LibraryApp.Application.Loans.Commands.DeleteLoan;

public record DeleteLoanCommand(int Id) : IRequest;

[Authorize(Policy = "RequireLibrarianRole")]
public class DeleteLoanCommandHandler : IRequestHandler<DeleteLoanCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteLoanCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteLoanCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Loans
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Loan), request.Id);
        }

        _context.Loans.Remove(entity);

        entity.AddDomainEvent(new LoanDeletedEvent(entity));

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
