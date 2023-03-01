using LibraryApp.Application.Common.Exceptions;
using LibraryApp.Application.Loans.Commands.CreateLoan;
using LibraryApp.Application.Loans.Commands.DeleteLoan;
using LibraryApp.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using LibraryApp.Application.Stocks.Commands.CreateStock;

namespace LibraryApp.Application.IntegrationTests.Loans.Commands;

using static Testing;

public class DeleteLoanTests : BaseTestFixture
{
    [Test]
    public async Task ShouldRequireValidLoanId()
    {
        var command = new DeleteLoanCommand(99);

        await FluentActions.Invoking(() =>
            SendAsync(command)).Should().ThrowAsync<NotFoundException>();
    }

    [Test]
    public async Task ShouldDeleteLoan()
    {
        var userId = await RunAsLibrarianAsync();

        var stockId = await SendAsync(new CreateStockCommand {
            BookId = 1,
            Quantity = 1,
            Available = 1
        });

        var loanId = await SendAsync(new CreateLoanCommand
        {
            UserId = userId,
            BookId = 1,
        });

        await SendAsync(new DeleteLoanCommand(loanId));

        var loan = await FindAsync<Loan>(loanId);
        var stock = await FindAsync<Stock>(stockId);


        loan.Should().NotBeNull();
        loan.Active.Should().BeFalse();
        stock.Should().NotBeNull();
        stock.Available.Should().Be(1);
    }
}
