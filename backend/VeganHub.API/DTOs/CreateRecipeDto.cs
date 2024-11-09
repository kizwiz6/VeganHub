using System.ComponentModel.DataAnnotations;

namespace VeganHub.API.DTOs;

public class CreateRecipeDto
{
    [Required]
    [StringLength(200)]
    public required string Title { get; set; }

    [StringLength(2000)]
    public required string Description { get; set; }

    [Required]
    public required string Instructions { get; set; }

    [Required]
    public TimeSpan PrepTime { get; set; }

    [Required]
    public TimeSpan CookTime { get; set; }

    [Required]
    [Range(1, 100)]
    public int Servings { get; set; }

    [Required]
    public required string CreatedById { get; set; }

    [Required]
    public required NutritionalInfoDto NutritionalInfo { get; set; }

    [Required]
    public required List<CreateRecipeIngredientDto> Ingredients { get; set; }

    public required List<CreateRecipeTagDto> Tags { get; set; }
}
