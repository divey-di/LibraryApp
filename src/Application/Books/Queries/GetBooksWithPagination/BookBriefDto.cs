using LibraryApp.Application.Common.Mappings;
using LibraryApp.Domain.Entities;

namespace LibraryApp.Application.Books.Queries.GetBooksWithPagination;

public class BookBriefDto : IMapFrom<Book>
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Author { get; set; }
}
