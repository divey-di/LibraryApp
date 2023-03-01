namespace LibraryApp.Domain.Events;

public class LoanDeletedEvent : BaseEvent
{
    public LoanDeletedEvent(Loan loan)
    {
        Loan = loan;
    }

    public Loan Loan { get; }
}
