using AutoMapper;
using AutoMapper.QueryableExtensions;
using LibraryApp.Application.Common.Interfaces;
using LibraryApp.Application.Common.Mappings;
using LibraryApp.Application.Common.Models;
using MediatR;

namespace LibraryApp.Application.Books.Queries.GetBooksWithPagination;

public record GetBooksWithPaginationQuery : IRequest<PaginatedList<BookBriefDto>>
{
    public int Id { get; init; }
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 10;
}

public class GetBooksWithPaginationQueryHandler : IRequestHandler<GetBooksWithPaginationQuery, PaginatedList<BookBriefDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetBooksWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<PaginatedList<BookBriefDto>> Handle(GetBooksWithPaginationQuery request, CancellationToken cancellationToken)
    {
        return await _context.Books
            .Where(x => x.Id == request.Id)
            .OrderBy(x => x.Title)
            .ProjectTo<BookBriefDto>(_mapper.ConfigurationProvider)
            .PaginatedListAsync(request.PageNumber, request.PageSize);
    }
}
