using System.ComponentModel.DataAnnotations;

namespace VeganHub.API.DTOs;


public class CreateIngredientDto
{
    public string Name { get; set; }
    public decimal Quantity { get; set; }
    public string Unit { get; set; }
    public NutritionalInfoDto NutritionalInfo { get; set; }
}