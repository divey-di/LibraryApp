using LibraryApp.Domain.Entities;
using LibraryApp.Infrastructure.Identity;
using LibraryApp.Infrastructure.Security;
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

        if (_roleManager.Roles.All(r => r.Name != administratorRole.Name))
        {
            await _roleManager.CreateAsync(administratorRole);
        }
        if (_roleManager.Roles.All(r => r.Name != librarianRole.Name))
        {
            await _roleManager.CreateAsync(librarianRole);
        }
        if (_roleManager.Roles.All(r => r.Name != userRole.Name))
        {
            await _roleManager.CreateAsync(userRole);
        }

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

        var bookId = 1;
        var bookFaker = new Bogus.Faker<Book>()
            .RuleFor(b => b.Isbn, _ => ++bookId*1000000)
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
            for (int i=0;i<100;i++) {
                _context.Books.Add(bookFaker.Generate());
            }
            await _context.SaveChangesAsync();
        }
    }
}
