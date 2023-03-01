using LibraryApp.Application.Common.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LibraryApp.Application.Loans.Commands.CreateLoan;
using LibraryApp.Application.Loans.Commands.DeleteLoan;
using LibraryApp.Application.Loans.Queries.GetLoansWithPagination;
using LibraryApp.Application.Common.Interfaces;

namespace LibraryApp.WebUI.Controllers;

[Authorize]
public class LoansController : ApiControllerBase
{
    private readonly ICurrentUserService _currentUserService;
    public LoansController(ICurrentUserService currentUserService)
    {
        _currentUserService = currentUserService;
    }

    [HttpGet]
    public async Task<ActionResult<PaginatedList<LoanDto>>> GetLoansWithPagination([FromQuery] GetLoansWithPaginationQuery query)
    {
        return await Mediator.Send(query);
    }

    [HttpPost] // User
    public async Task<ActionResult<int>> Create(CreateLoanCommand command)
    {
        var updateCommand = new CreateLoanCommand {
            BookId = command.BookId,
            UserId = _currentUserService.UserId
        };

        return await Mediator.Send(updateCommand);
    }

    [HttpDelete("{id}")] // Librarian
    public async Task<ActionResult> Delete(int id)
    {
        await Mediator.Send(new DeleteLoanCommand(id));

        return NoContent();
    }
}
