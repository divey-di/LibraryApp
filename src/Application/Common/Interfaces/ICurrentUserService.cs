using System.Security.Claims;

namespace LibraryApp.Application.Common.Interfaces;

public interface ICurrentUserService
{
    string? UserId { get; }
}
