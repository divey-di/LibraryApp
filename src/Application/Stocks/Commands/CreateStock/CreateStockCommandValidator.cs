using FluentValidation;

namespace LibraryApp.Application.Stocks.Commands.CreateStock;

public class CreateBookCommandValidator : AbstractValidator<CreateStockCommand>
{
    public CreateBookCommandValidator()
    {
        RuleFor(v => v.BookId)
            .GreaterThan(0);
        
        RuleFor(v => v.Quantity)
            .GreaterThan(0);

        RuleFor(v => v.Available)
            .GreaterThanOrEqualTo(0)
            .LessThanOrEqualTo(v => v.Quantity);
    }
}
