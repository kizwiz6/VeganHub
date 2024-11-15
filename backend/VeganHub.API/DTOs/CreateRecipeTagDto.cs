using System.ComponentModel.DataAnnotations;

namespace VegWiz.API.DTOs;

public class CreateRecipeTagDto
{
    [Required]
    public string Name { get; set; }
}