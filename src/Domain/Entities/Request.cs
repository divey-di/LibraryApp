namespace LibraryApp.Entities;

// The Request object will be used to lookup the best stock
// to loan the book from
public class Request: BaseEntity
{
    public Book Book { get; set; }

    // the Location ID of the library making the request
    public Location RequestLocation { get; set; }
}