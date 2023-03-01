using System.Security.Claims;
using LibraryApp.Domain.Entities;
using LibraryApp.Infrastructure.Identity;
using LibraryApp.Application.Common.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace LibraryApp.Infrastructure.Persistence;

public class ApplicationDbContextInitialiser
{
    private readonly ILogger<ApplicationDbContextInitialiser> _logger;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public ApplicationDbContextInitialiser(ILogger<ApplicationDbContextInitialiser> logger, ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _logger = logger;
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task InitialiseAsync()
    {
        try
        {
            if (_context.Database.IsSqlServer())
            {
                await _context.Database.MigrateAsync();
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while initialising the database.");
            throw;
        }
    }

    public async Task SeedAsync()
    {
        try
        {
            await TrySeedAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    public async Task TrySeedAsync()
    {
        // Default roles
        var administratorRole = new IdentityRole(RoleType.Administrator.ToString());
        var librarianRole = new IdentityRole(RoleType.Librarian.ToString());
        var userRole = new IdentityRole(RoleType.User.ToString());

        await TrySeedRoles(administratorRole, librarianRole, userRole);

        await TrySeedAdminAsync(administratorRole);

        var faker = new Bogus.Faker<ApplicationUser>()
            .RuleFor(u => u.Email, f => f.Person.Email)
            .RuleFor(u => u.UserName, f => f.Person.UserName);

        await TrySeedLibrariansAsync(faker);
        await TrySeedUsersAsync(faker);

        await TrySeedBooks();
        await TrySeedStock();
        await TrySeedLoans();
    }

    private async Task TrySeedUsersAsync(Bogus.Faker<ApplicationUser> faker)
    {
        if ((await _userManager.GetUsersInRoleAsync(RoleType.User.ToString())).Count() < 100)
        {
            for (int i = 0; i < 100; i++)
            {
                var defaultUser = faker.Generate();

                var user = await _userManager.FindByEmailAsync(defaultUser.Email);
                if (user == null)
                {
                    await _userManager.CreateAsync(defaultUser, "123Pa$$word!");
                    await _userManager.AddToRoleAsync(defaultUser, RoleType.User.ToString());
                }
            }
        }
    }

    private async Task TrySeedLibrariansAsync(Bogus.Faker<ApplicationUser> faker)
    {
        if ((await _userManager.GetUsersInRoleAsync(RoleType.Librarian.ToString())).Count() < 5)
        {
            for (int i = 0; i < 5; i++)
            {
                var defaultUser = faker.Generate();

                var user = await _userManager.FindByEmailAsync(defaultUser.Email);
                if (user == null)
                {
                    await _userManager.CreateAsync(defaultUser, "123Pa$$word!");
                    await _userManager.AddToRoleAsync(defaultUser, RoleType.Librarian.ToString());
                }
            }
        }
    }

    private async Task TrySeedAdminAsync(IdentityRole administratorRole)
    {
        // Default users
        var administrator = new ApplicationUser { UserName = "administrator@localhost", Email = "administrator@localhost" };

        // This would be removed in a production Env.
        if (_userManager.Users.All(u => u.UserName != administrator.UserName))
        {
            // An alternative to removing this would be to store the values in a SecretManager
            await _userManager.CreateAsync(administrator, "Administrator1!");
            if (!string.IsNullOrWhiteSpace(administratorRole.Name))
            {
                await _userManager.AddToRolesAsync(administrator, new[] { administratorRole.Name });
            }
        }
    }

    private async Task TrySeedRoles(params IdentityRole[] roles)
    {
        foreach (var role in roles)
        {
            if (_roleManager.Roles.All(r => r.Name != role.Name))
            {
                await _roleManager.CreateAsync(role);
            }
        }
    }

    private async Task TrySeedBooks()
    {
        var bookId = 1;
        var bookFaker = new Bogus.Faker<Book>()
            .RuleFor(b => b.Isbn, _ => ++bookId * 1000000)
            .RuleFor(b => b.Title, f => f.Lorem.Sentence(f.Random.Int(1, 6)))
            .RuleFor(b => b.Author, f => $"{f.Person.FirstName} {f.Person.LastName}")
            .RuleFor(b => b.Genre, f => f.Lorem.Word())
            .RuleFor(b => b.Publisher, f => f.Lorem.Text())
            .RuleFor(b => b.PublishDate, f => f.Date.Past(f.Random.Int(0, 300)))
            .RuleFor(b => b.PageCount, f => f.Random.Int(168, 1500))
            .RuleFor(b => b.Synopsis, f => f.Lorem.Paragraph())
            .RuleFor(b => b.CoverArtUri, f => new Uri(f.Internet.UrlWithPath()));

        // Default data
        // Seed, if necessary
        if (!_context.Books.Any())
        {
            for (int i = 0; i < 100; i++)
            {
                _context.Books.Add(bookFaker.Generate());
            }
            await _context.SaveChangesAsync();
        }
    }

    private async Task TrySeedStock()
    {
        var faker = new Bogus.Faker<Stock>()
            .RuleFor(s => s.Quantity, 1)//f => f.Random.Int(25, 50))
            .RuleFor(s => s.Available, (_, s) => s.Quantity);

        // Default data
        // Seed, if necessary
        if (!_context.Stock.Any())
        {
            foreach (var book in _context.Books)
            {
                var stock = faker.Generate();
                stock.BookId = book.Id;
                _context.Stock.Add(stock);
            }
            await _context.SaveChangesAsync();
        }
    }

    private async Task TrySeedLoans()
    {
        var stock = _context.Stock.Where(s => s.Available > 0).ToList();
        var users = await _userManager.GetUsersInRoleAsync(RoleType.User.ToString());

        var faker = new Bogus.Faker<Loan>()
            .RuleFor(l => l.BookId, f => {
                var stockItem = stock[f.Random.Int(0, stock.Count-1)];
                var book = _context.Books.First(b => b.Id == stockItem.BookId);
                return book.Id;
            })
            .RuleFor(l => l.UserId, f => users[f.Random.Int(0, users.Count-1)].Id)
            .RuleFor(l => l.LoanDate, f => f.Date.Between(new DateTime(2001, 1, 1), DateTime.Now))
            .RuleFor(l => l.DueDate, (_, s) => new DateTime(s.LoanDate.Year, s.LoanDate.Month, s.LoanDate.Day).AddMonths(3))
            .RuleFor(l => l.Active, (_, s) => DateTime.Now <= s.DueDate);

        // Default data
        // Seed, if necessary
        if (!_context.Loans.Any())
        {
            for (int i = 0; i < 50; i++)
            {
                var loan = faker.Generate();
                var stockItem = stock.First(s => s.BookId == loan.BookId);
                
                if (stockItem.Available > 0) stockItem.Available--;
                else continue;
                
                _context.Loans.Add(loan);
                _context.Stock.Update(stockItem);
            }
            await _context.SaveChangesAsync();
        }
    }
}
