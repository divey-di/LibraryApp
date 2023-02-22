using LibraryApp.Application.Common.Interfaces;

namespace LibraryApp.Infrastructure.Services;

public class DateTimeService : IDateTime
{
    public DateTime Now => DateTime.Now;
}
