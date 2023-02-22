using LibraryApp.Application.Common.Mappings;
using LibraryApp.Domain.Entities;

namespace LibraryApp.Application.TodoLists.Queries.ExportTodos;

public class TodoItemRecord : IMapFrom<TodoItem>
{
    public string? Title { get; set; }

    public bool Done { get; set; }
}
