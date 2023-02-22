using LibraryApp.Application.TodoLists.Queries.ExportTodos;

namespace LibraryApp.Application.Common.Interfaces;

public interface ICsvFileBuilder
{
    byte[] BuildTodoItemsFile(IEnumerable<TodoItemRecord> records);
}
