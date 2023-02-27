namespace LibraryApp.Entities;

// The same Title can be offered from multiple locations
// Each location will be represented by its own stock object
// Stock -> Location: 1-1
// Stock -> Book Title: 1-1
public class Stock: BaseEntity
{
    public Book Book { get; set; }

    public int Quantity { get; set; }

    public int Available { get; set; }

    public Location Location { get; set; }
}