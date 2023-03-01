using AutoMapper;
using AutoMapper.QueryableExtensions;
using LibraryApp.Application.Common.Interfaces;
using LibraryApp.Application.Common.Mappings;
using LibraryApp.Application.Common.Models;
using LibraryApp.Application.Common.Security;
using MediatR;

namespace LibraryApp.Application.Loans.Queries.GetLoansWithPagination;

public record GetLoansWithPaginationQuery : IRequest<PaginatedList<LoanDto>>
{
    public int? BookId { get; init; }
    public string? UserId { get; init; }
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
}

[Authorize(Policy = "RequireLibrarianRole")]
public class GetLoansWithPaginationQueryHandler : IRequestHandler<GetLoansWithPaginationQuery, PaginatedList<LoanDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;
    private readonly IIdentityService _identityService;

    public GetLoansWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper, IIdentityService identityService, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _identityService = identityService;
        _currentUserService = currentUserService;
    }

    public async Task<PaginatedList<LoanDto>> Handle(GetLoansWithPaginationQuery request, CancellationToken cancellationToken)
    {
        return await _context.Loans
            .Where(x => x.Active)
            .Where(x => (request.BookId == 0 || x.BookId == request.BookId) && (x.UserId == request.UserId || request.UserId == "" || request.UserId == null))
            .OrderBy(x => x.DueDate)
            .ProjectTo<LoanDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
