using LibraryApp.Domain.Exceptions;
using LibraryApp.Domain.ValueObjects;
using FluentAssertions;
using NUnit.Framework;

namespace LibraryApp.Domain.UnitTests.ValueObjects;

public class ColorTests
{
    [Test]
    public void ShouldReturnCorrectColourCode()
    {
        var code = "#FFFFFF";

        var color = Color.From(code);

        color.Code.Should().Be(code);
    }

    [Test]
    public void ToStringReturnsCode()
    {
        var color = Color.White;

        color.ToString().Should().Be(color.Code);
    }

    [Test]
    public void ShouldPerformImplicitConversionToColourCodeString()
    {
        string code = Color.White;

        code.Should().Be("#FFFFFF");
    }

    [Test]
    public void ShouldPerformExplicitConversionGivenSupportedColourCode()
    {
        var color = (Color)"#FFFFFF";

        color.Should().Be(Color.White);
    }

    [Test]
    public void ShouldThrowUnsupportedColourExceptionGivenNotSupportedColourCode()
    {
        FluentActions.Invoking(() => Color.From("##FF33CC"))
            .Should().Throw<UnsupportedColorException>();
    }
}
