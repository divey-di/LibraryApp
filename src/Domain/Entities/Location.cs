namespace LibraryApp.Entities;

public class Location: BaseEntity
{
    public string LibraryName { get; set; }

    public string Country { get; set; }
    
    public string State { get; set; }

    public string City { get; set; }

    public string Address { get; set; }
}