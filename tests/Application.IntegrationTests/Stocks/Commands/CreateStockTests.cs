using LibraryApp.Application.Common.Exceptions;
using LibraryApp.Application.Stocks.Commands.CreateStock;
using LibraryApp.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;

namespace LibraryApp.Application.IntegrationTests.Stocks.Commands;

using static Testing;

public class CreateStockTests : BaseTestFixture
{
    [Test]
    public async Task ShouldRequireMinimumFields()
    {
        var command = new CreateStockCommand();

        await FluentActions.Invoking(() =>
            SendAsync(command)).Should().ThrowAsync<ValidationException>();
    }

    [Test]
    public async Task ShouldCreateStock()
    {
        var userId = await RunAsDefaultUserAsync();

        var command = new CreateStockCommand
        {
            BookId = 1,
            Quantity = 1,
            Available = 1
        };

        var itemId = await SendAsync(command);

        var item = await FindAsync<Stock>(itemId);

        item.Should().NotBeNull();
        item.BookId.Should().Be(command.BookId);
        item.Quantity.Should().Be(command.Quantity);
        item.Available.Should().Be(command.Available);
    }
}
