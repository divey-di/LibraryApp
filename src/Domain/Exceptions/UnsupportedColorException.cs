namespace LibraryApp.Domain.Exceptions;

public class UnsupportedColorException : Exception
{
    public UnsupportedColorException(string code)
        : base($"Colour \"{code}\" is unsupported.")
    {
    }
}
