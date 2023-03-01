namespace LibraryApp.Domain.Events;

public class StockCreatedEvent : BaseEvent
{
    public StockCreatedEvent(Stock stock)
    {
        Stock = stock;
    }

    public Stock Stock { get; }
}
