using FluentValidation;

namespace LibraryApp.Application.Loans.Commands.CreateLoan;

public class CreateLoanCommandValidator : AbstractValidator<CreateLoanCommand>
{
    public CreateLoanCommandValidator()
    {
        RuleFor(v => v.UserId)
            .NotNull()
            .NotEmpty();
        
        RuleFor(v => v.BookId)
            .GreaterThan(0)
            .NotEmpty();
    }
}
