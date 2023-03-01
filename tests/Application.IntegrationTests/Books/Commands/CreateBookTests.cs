using LibraryApp.Application.Common.Exceptions;
using LibraryApp.Application.Books.Commands.CreateBook;
using LibraryApp.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;

namespace LibraryApp.Application.IntegrationTests.Books.Commands;

using static Testing;

public class CreateBookTests : BaseTestFixture
{
    [Test]
    public async Task ShouldRequireMinimumFields()
    {
        var command = new CreateBookCommand();

        await FluentActions.Invoking(() =>
            SendAsync(command)).Should().ThrowAsync<ValidationException>();
    }

    [Test]
    public async Task ShouldCreateBook()
    {
        var userId = await RunAsLibrarianAsync();

        var command = new CreateBookCommand
        {
            Author = "me",
            Title = "Tasks"
        };

        var itemId = await SendAsync(command);

        var item = await FindAsync<Book>(itemId);

        item.Should().NotBeNull();
        item.Author.Should().Be(command.Author);
        item.Title.Should().Be(command.Title);
        item.CreatedBy.Should().Be(userId);
        item.Created.Should().BeCloseTo(DateTime.Now, TimeSpan.FromMilliseconds(10000));
        item.LastModifiedBy.Should().Be(userId);
        item.LastModified.Should().BeCloseTo(DateTime.Now, TimeSpan.FromMilliseconds(10000));
    }
}
