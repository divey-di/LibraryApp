using LibraryApp.Application.Common.Exceptions;
using LibraryApp.Application.Books.Commands.CreateBook;
using LibraryApp.Application.Books.Commands.DeleteBook;
using LibraryApp.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;

namespace LibraryApp.Application.IntegrationTests.Books.Commands;

using static Testing;

public class DeleteBookTests : BaseTestFixture
{
    [Test]
    public async Task ShouldRequireValidBookId()
    {
        var command = new DeleteBookCommand(99);

        await FluentActions.Invoking(() =>
            SendAsync(command)).Should().ThrowAsync<NotFoundException>();
    }

    [Test]
    public async Task ShouldDeleteBook()
    {
        var userId = await RunAsLibrarianAsync();
        
        var itemId = await SendAsync(new CreateBookCommand
        {
            Title = "New Item",
            Author = "me"
        });

        await SendAsync(new DeleteBookCommand(itemId));

        var item = await FindAsync<Book>(itemId);

        item.Should().BeNull();
    }
}
