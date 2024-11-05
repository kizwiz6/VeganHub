// VeganHub.Core/Models/NutritionalInfo.cs
namespace VeganHub.Core.Models;

public class NutritionalInfo
{
    public decimal Calories { get; private set; }
    public decimal Protein { get; private set; }
    public decimal Carbohydrates { get; private set; }
    public decimal Fat { get; private set; }
    public decimal Fiber { get; private set; }

    public NutritionalInfo()
    {
        Calories = 0;
        Protein = 0;
        Carbohydrates = 0;
        Fat = 0;
        Fiber = 0;
    }

    public void Add(NutritionalInfo other)
    {
        Calories += other.Calories;
        Protein += other.Protein;
        Carbohydrates += other.Carbohydrates;
        Fat += other.Fat;
        Fiber += other.Fiber;
    }
}