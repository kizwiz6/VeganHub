using System.ComponentModel.DataAnnotations;

namespace VegWiz.API.DTOs;

public class NutritionalInfoDto
{
    [Required]
    public decimal Calories { get; set; }

    [Required]
    public decimal Protein { get; set; }

    [Required]
    public decimal Carbohydrates { get; set; }

    [Required]
    public decimal Fat { get; set; }

    [Required]
    public decimal Fiber { get; set; }
}
