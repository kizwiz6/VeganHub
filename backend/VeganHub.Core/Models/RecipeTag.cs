// VegWiz.Core/Models/RecipeTag.cs
namespace VegWiz.Core.Models;

public class RecipeTag
{
    public RecipeTag(string name)
    {
        Id = Guid.NewGuid();
        Name = name.ToLower();
    }

    public Guid Id { get; private set; }
    public string Name { get; private set; }
}