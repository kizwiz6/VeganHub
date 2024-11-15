using System.ComponentModel.DataAnnotations;

namespace VegWiz.API.DTOs;

public class CreateRecipeIngredientDto
{
    [Required]
    public string Name { get; set; }

    [Required]
    public decimal Quantity { get; set; }

    [Required]
    public string Unit { get; set; }

    [Required]
    public NutritionalInfoDto NutritionalInfo { get; set; }
}