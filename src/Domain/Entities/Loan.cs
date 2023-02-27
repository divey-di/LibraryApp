namespace LibraryApp.Domain.Entities;

public class Loan: BaseEntity
{
    public Book Book { get; set; }

    // public User User { get; set; }

    public DateTime LoanDate { get; set; }

    public DateTime DueDate { get; set; }

    public bool Active { get; set; }
}