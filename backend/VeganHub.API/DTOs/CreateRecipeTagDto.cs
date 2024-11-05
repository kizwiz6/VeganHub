using System.ComponentModel.DataAnnotations;

namespace VeganHub.API.DTOs;

public class CreateRecipeTagDto
{
    [Required]
    public string Name { get; set; }
}