using System.Globalization;
using LibraryApp.Application.Common.Interfaces;
using LibraryApp.Application.TodoLists.Queries.ExportTodos;
using LibraryApp.Infrastructure.Files.Maps;
using CsvHelper;

namespace LibraryApp.Infrastructure.Files;

public class CsvFileBuilder : ICsvFileBuilder
{
    public byte[] BuildTodoItemsFile(IEnumerable<TodoItemRecord> records)
    {
        using var memoryStream = new MemoryStream();
        using (var streamWriter = new StreamWriter(memoryStream))
        {
            using var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture);

            csvWriter.Context.RegisterClassMap<TodoItemRecordMap>();
            csvWriter.WriteRecords(records);
        }

        return memoryStream.ToArray();
    }
}
