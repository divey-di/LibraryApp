using LibraryApp.Application.Common.Exceptions;
using LibraryApp.Application.Loans.Commands.CreateLoan;
using LibraryApp.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using LibraryApp.Application.Stocks.Commands.CreateStock;

namespace LibraryApp.Application.IntegrationTests.Loans.Commands;

using static Testing;

public class CreateLoanTests : BaseTestFixture
{
    [Test]
    public async Task ShouldRequireMinimumFields()
    {
        var command = new CreateLoanCommand();

        await FluentActions.Invoking(() =>
            SendAsync(command)).Should().ThrowAsync<ValidationException>();
    }

    [Test]
    public async Task ShouldRequireAvailableStock()
    {
        var userId = await RunAsDefaultUserAsync();

        await SendAsync(new CreateStockCommand {
            BookId = 1,
            Quantity = 1,
            Available = 0
        });

        var command = new CreateLoanCommand
        {
            UserId = userId,
            BookId = 1
        };

        await FluentActions.Invoking(() =>
            SendAsync(command)).Should().ThrowAsync<ValidationException>();
    }

    [Test]
    public async Task ShouldCreateLoan()
    {
        var userId = await RunAsDefaultUserAsync();

        var stockId = await SendAsync(new CreateStockCommand {
            BookId = 1,
            Quantity = 1,
            Available = 1
        });

        var command = new CreateLoanCommand
        {
            UserId = userId,
            BookId = 1
        };

        var itemId = await SendAsync(command);

        var item = await FindAsync<Loan>(itemId);
        var stock = await FindAsync<Stock>(stockId);

        item.Should().NotBeNull();
        item.Active.Should().BeTrue();
        item.UserId.Should().Be(command.UserId);
        item.BookId.Should().Be(command.BookId);

        stock.Should().NotBeNull();
        stock.Available.Should().Be(0);
    }
}
