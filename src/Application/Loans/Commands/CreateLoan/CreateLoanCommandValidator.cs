using FluentValidation;

namespace LibraryApp.Application.Loans.Commands.CreateLoan;

public class CreateLoanCommandValidator : AbstractValidator<CreateLoanCommand>
{
    public CreateLoanCommandValidator()
    {
        // RuleFor(v => v.Title)
        //     .MaximumLength(200)
        //     .NotEmpty();
        
        // RuleFor(v => v.Author)
        //     .MaximumLength(200)
        //     .NotEmpty();

        // RuleFor(v => v.Isbn) //TODO: ISBN Rules are tricky. This will require some additional thought
        //     .MaximumLength(200)
        //     .NotEmpty();
    }
}
