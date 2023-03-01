using LibraryApp.Application.Common.Mappings;
using LibraryApp.Domain.Entities;

namespace LibraryApp.Application.Loans.Queries.GetLoansWithPagination;

public class LoanDto : IMapFrom<Book>
{
    public int? BookId { get; set; }

    public string? UserId { get; set; }

    public DateTime LoanDate { get; set; }

    public DateTime DueDate { get; set; }

    public bool Active { get; set; }
}
