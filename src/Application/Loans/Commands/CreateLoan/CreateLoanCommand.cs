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
        var entity = new Loan
        {
            Id = request.Id,
            BookId = request.BookId,
            UserId = request.UserId,
            LoanDate = new DateTime(),
            DueDate = (new DateTime()).AddMonths(3)
        };

        entity.AddDomainEvent(new LoanCreatedEvent(entity));

        _context.Loans.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
