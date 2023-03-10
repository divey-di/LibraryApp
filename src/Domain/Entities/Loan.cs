namespace LibraryApp.Domain.Entities;

public class Loan: BaseEntity
{
    public int? BookId { get; set; }

    public string? UserId { get; set; }

    public DateTime LoanDate { get; set; }

    public DateTime DueDate { get; set; }

    public bool Active { get; set; }
}