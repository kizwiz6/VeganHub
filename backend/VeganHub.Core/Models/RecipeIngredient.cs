// VeganHub.Core/Models/RecipeIngredient.cs
namespace VeganHub.Core.Models;

public class RecipeIngredient
{
    private RecipeIngredient() { } // For EF Core

    public RecipeIngredient(
        string name,
        decimal quantity,
        string unit,
        NutritionalInfo nutritionalInfo)
    {
        Id = Guid.NewGuid();
        Name = name;
        Quantity = quantity;
        Unit = unit;
        NutritionalInfo = nutritionalInfo;
    }

    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public decimal Quantity { get; private set; }
    public string Unit { get; private set; }
    public NutritionalInfo NutritionalInfo { get; private set; }

    public void UpdateQuantity(decimal quantity)
    {
        Quantity = quantity;
    }
}