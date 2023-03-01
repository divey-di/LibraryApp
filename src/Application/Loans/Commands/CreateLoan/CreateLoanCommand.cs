using FluentValidation.Results;
using LibraryApp.Application.Common.Exceptions;
using LibraryApp.Application.Common.Interfaces;
using LibraryApp.Application.Common.Security;
using LibraryApp.Domain.Entities;
using LibraryApp.Domain.Events;
using MediatR;

namespace LibraryApp.Application.Loans.Commands.CreateLoan;

public record CreateLoanCommand : IRequest<int>
{
    public int Id { get; init; }
    
    public int BookId { get; init; }

    public string? UserId { get; init; }
}

[Authorize(Roles = "User")]
public class CreateLoanCommandHandler : IRequestHandler<CreateLoanCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateLoanCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateLoanCommand request, CancellationToken cancellationToken)
    {
        var loanEntity = new Loan
        {
            Id = request.Id,
            BookId = request.BookId,
            UserId = request.UserId,
            LoanDate = DateTime.Now,
            DueDate = (DateTime.Now).AddMonths(3)
        };

        var stockEntity = _context.Stock.First(s => s.BookId == request.BookId);
        stockEntity.Available--;

        if (stockEntity.Available < 0) {
            var failures = new List<ValidationFailure>
            {
                new ValidationFailure("Stock", "This Title is out of stock"),
            };

            throw new ValidationException(failures);
        }

        loanEntity.AddDomainEvent(new LoanCreatedEvent(loanEntity));

        _context.Loans.Add(loanEntity);
        _context.Stock.Update(stockEntity);

        await _context.SaveChangesAsync(cancellationToken);

        return loanEntity.Id;
    }
}
