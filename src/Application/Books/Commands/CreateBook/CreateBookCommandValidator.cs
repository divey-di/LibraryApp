using FluentValidation;

namespace LibraryApp.Application.Books.Commands.CreateBook;

public class CreateBookCommandValidator : AbstractValidator<CreateBookCommand>
{
    public CreateBookCommandValidator()
    {
        RuleFor(v => v.Title)
            .MaximumLength(200)
            .NotEmpty();
        
        RuleFor(v => v.Author)
            .MaximumLength(200)
            .NotEmpty();

        // RuleFor(v => v.Isbn) //TODO: ISBN Rules are tricky. This will require some additional thought
        //     .MaximumLength(200)
        //     .NotEmpty();
    }
}
