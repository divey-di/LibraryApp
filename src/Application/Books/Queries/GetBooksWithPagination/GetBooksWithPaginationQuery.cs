using AutoMapper;
using AutoMapper.QueryableExtensions;
using LibraryApp.Application.Common.Interfaces;
using LibraryApp.Application.Common.Mappings;
using LibraryApp.Application.Common.Models;
using LibraryApp.Application.Common.Security;
using MediatR;

namespace LibraryApp.Application.Books.Queries.GetBooksWithPagination;

public record GetBooksWithPaginationQuery : IRequest<PaginatedList<BookDto>>
{
    public int Id { get; init; }
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
}

public class GetBooksWithPaginationQueryHandler : IRequestHandler<GetBooksWithPaginationQuery, PaginatedList<BookDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;
    private readonly IIdentityService _identityService;

    public GetBooksWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper, IIdentityService identityService, ICurrentUserService currentUserService)
    {
        _context = context;
        _mapper = mapper;
        _identityService = identityService;
        _currentUserService = currentUserService;
    }

    public async Task<PaginatedList<BookDto>> Handle(GetBooksWithPaginationQuery request, CancellationToken cancellationToken)
    {
        var isLibrarian = await _identityService.IsInRoleAsync(_currentUserService.UserId, RoleType.Librarian.ToString());

        //Join on available stock
        return await _context.Books
            .Join(
                _context.Stock,
                b => b.Id,
                s => s.BookId,
                (book, stock) => new { //Wherefore art thou object spreading. ie. ..book
                    book.Id,
                    book.Isbn,
                    book.Author,
                    book.Title,
                    book.Genre,
                    book.Publisher,
                    book.PublishDate,
                    book.CoverArtUri,
                    book.PageCount,
                    book.Synopsis,
                    stock.Available
                }
            )
            .Where(x => x.Id == request.Id || request.Id == 0)
            .Where(x => isLibrarian || x.Available > 0)
            .OrderBy(x => x.Title)
            .ProjectTo<BookDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
