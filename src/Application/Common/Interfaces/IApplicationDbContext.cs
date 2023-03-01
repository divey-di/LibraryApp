using LibraryApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryApp.Application.Common.Interfaces;

public interface IApplicationDbContext
{    
    DbSet<Book> Books { get; }

    DbSet<Stock> Stock { get; }

    DbSet<Loan> Loans { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
