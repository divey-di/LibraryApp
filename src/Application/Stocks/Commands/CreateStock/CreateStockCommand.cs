using LibraryApp.Application.Common.Interfaces;
using LibraryApp.Application.Common.Security;
using LibraryApp.Domain.Entities;
using LibraryApp.Domain.Events;
using MediatR;

namespace LibraryApp.Application.Stocks.Commands.CreateStock;

public record CreateStockCommand : IRequest<int>
{
    public int Id { get; init; }

    public int BookId { get; init; }

    public int Quantity { get; init; }

    public int Available { get; init; }
}

[Authorize(Policy = "RequireLibrarianRole")]
public class CreateStocksCommandHandler : IRequestHandler<CreateStockCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateStocksCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateStockCommand request, CancellationToken cancellationToken)
    {
        var entity = new Stock
        {
            Id = request.Id,
            BookId = request.BookId,
            Quantity = request.Quantity,
            Available = request.Available
        };

        entity.AddDomainEvent(new StockCreatedEvent(entity));

        _context.Stock.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
