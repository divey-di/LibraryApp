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
        var loanEntity = await _context.Loans
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (loanEntity == null)
        {
            throw new NotFoundException(nameof(Loan), request.Id);
        }

        var stockEntity = _context.Stock.First(s => s.BookId == loanEntity.BookId);

        loanEntity.AddDomainEvent(new LoanCreatedEvent(loanEntity));

        loanEntity.Active = false;
        _context.Loans.Update(loanEntity);
        
        stockEntity.Available++;
        _context.Stock.Update(stockEntity);

        await _context.SaveChangesAsync(cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
