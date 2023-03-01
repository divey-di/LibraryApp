using LibraryApp.Application.Common.Models;
using LibraryApp.Application.Books.Queries.GetBooksWithPagination;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LibraryApp.Application.Loans.Commands.CreateLoan;
using LibraryApp.Application.Loans.Commands.DeleteLoan;

namespace LibraryApp.WebUI.Controllers;

[Authorize]
public class LoanController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PaginatedList<BookDto>>> GetBooksWithPagination([FromQuery] GetBooksWithPaginationQuery query)
    {
        return await Mediator.Send(query);
    }

    [HttpPost] // User
    public async Task<ActionResult<int>> Create(CreateLoanCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpDelete("{id}")] // Librarian
    public async Task<ActionResult> Delete(int id)
    {
        await Mediator.Send(new DeleteLoanCommand(id));

        return NoContent();
    }
}
