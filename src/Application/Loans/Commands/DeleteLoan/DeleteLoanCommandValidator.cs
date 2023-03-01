using FluentValidation;

namespace LibraryApp.Application.Loans.Commands.DeleteLoan;

public class DeleteLoanCommandValidator : AbstractValidator<DeleteLoanCommand>
{
    public DeleteLoanCommandValidator()
    {
        RuleFor(v => v.Id)
            .GreaterThan(0)
            .NotEmpty();
    }
}
