using System.ComponentModel.DataAnnotations;

namespace VeganHub.API.DTOs;

public class CreateRecipeDto
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; }

    [StringLength(2000)]
    public string Description { get; set; }

    [Required]
    public string Instructions { get; set; }

    [Required]
    public TimeSpan PrepTime { get; set; }

    [Required]
    public TimeSpan CookTime { get; set; }

    [Required]
    [Range(1, 100)]
    public int Servings { get; set; }

    [Required]
    public string CreatedById { get; set; }

    [Required]
    public NutritionalInfoDto NutritionalInfo { get; set; }

    [Required]
    public List<CreateRecipeIngredientDto> Ingredients { get; set; }

    public List<CreateRecipeTagDto> Tags { get; set; }
}
