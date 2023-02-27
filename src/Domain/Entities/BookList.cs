namespace LibraryApp.Entities;

public class BookList: BaseEntity
{
    public BookListVisibilityType Visibility { get; set; }

    public string Name { get; set; }
    
    public BookListType Type { get; set; }

    public IEnumerable<Book> Books { get; set; } 
}