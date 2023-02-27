namespace LibraryApp.Domain.Entities;

public class Book: BaseEntity
{
    public int Isbn { get; set; }
    public string? Title { get; set; }
    public string? Author { get; set; }
    public string? Publisher { get; set; }
    public DateTime PublishDate { get; set; }

    public string? Genre { get; set; }

    public string? Synopsis { get; set; } //Truncate

    public Uri? CoverArtUri { get; set; }

    public int PageCount { get; set; }
}