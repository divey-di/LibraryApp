using LibraryApp.Application.Common.Exceptions;
using LibraryApp.Application.Books.Commands.CreateBook;
using LibraryApp.Application.Books.Commands.UpdateBook;
using LibraryApp.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;

namespace LibraryApp.Application.IntegrationTests.Books.Commands;

using static Testing;

public class UpdateBookTests : BaseTestFixture
{
    [Test]
    public async Task ShouldRequireValidBookId()
    {
        var command = new UpdateBookCommand { Id = 99, Title = "New Title" };
        await FluentActions.Invoking(() => SendAsync(command)).Should().ThrowAsync<NotFoundException>();
    }

    [Test]
    public async Task ShouldUpdateBook()
    {
        var userId = await RunAsLibrarianAsync();

        var itemId = await SendAsync(new CreateBookCommand
        {
            Title = "New Item",
            Author = "me"
        });

        var command = new UpdateBookCommand
        {
            Id = itemId,
            Title = "Updated Item Title"
        };

        await SendAsync(command);

        var item = await FindAsync<Book>(itemId);

        item.Should().NotBeNull();
        item!.Title.Should().Be(command.Title);
        item.LastModifiedBy.Should().NotBeNull();
        item.LastModifiedBy.Should().Be(userId);
        item.LastModified.Should().NotBeNull();
        item.LastModified.Should().BeCloseTo(DateTime.Now, TimeSpan.FromMilliseconds(10000));
    }
}
