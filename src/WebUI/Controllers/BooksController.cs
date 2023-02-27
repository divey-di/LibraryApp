using LibraryApp.Application.Common.Models;
using LibraryApp.Application.Books.Commands.CreateBook;
using LibraryApp.Application.Books.Commands.DeleteBook;
using LibraryApp.Application.Books.Commands.UpdateBook;
using LibraryApp.Application.Books.Commands.UpdateBookDetail;
using LibraryApp.Application.Books.Queries.GetBooksWithPagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApp.WebUI.Controllers;

[Authorize]
public class BooksController : ApiControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<PaginatedList<BookDto>>> GetBooksWithPagination([FromQuery] GetBooksWithPaginationQuery query)
    {
        return await Mediator.Send(query);
    }

    [HttpPost]
    public async Task<ActionResult<int>> Create(CreateBookCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, UpdateBookCommand command)
    {
        if (id != command.Id)
        {
            return BadRequest();
        }

        await Mediator.Send(command);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await Mediator.Send(new DeleteBookCommand(id));

        return NoContent();
    }
}
