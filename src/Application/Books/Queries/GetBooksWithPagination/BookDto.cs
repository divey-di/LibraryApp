using LibraryApp.Application.Common.Mappings;
using LibraryApp.Domain.Entities;

namespace LibraryApp.Application.Books.Queries.GetBooksWithPagination;

public class BookDto : IMapFrom<Book>
{
    public int Id { get; set; }
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
