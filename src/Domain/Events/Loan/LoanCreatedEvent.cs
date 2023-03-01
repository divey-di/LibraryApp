namespace LibraryApp.Domain.Events;

public class LoanCreatedEvent : BaseEvent
{
    public LoanCreatedEvent(Loan loan)
    {
        Loan = loan;
    }

    public Loan Loan { get; }
}
