namespace LibraryApp.Domain.Events;

public class BookCreatedEvent : BaseEvent
{
    public BookCreatedEvent(Book book)
    {
        Book = book;
    }

    public Book Book { get; }
}
