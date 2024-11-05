// VeganHub.Core/Models/NutritionalInfo.cs
namespace VeganHub.Core.Models;

public class NutritionalInfo
{
    public decimal Calories { get; set; }
    public decimal Protein { get; set; }
    public decimal Carbohydrates { get; set; }
    public decimal Fat { get; set; }
    public decimal Fiber { get; set; }

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
        if (other == null) return;

        Calories += other.Calories;
        Protein += other.Protein;
        Carbohydrates += other.Carbohydrates;
        Fat += other.Fat;
        Fiber += other.Fiber;
    }
}