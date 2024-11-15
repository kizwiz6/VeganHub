// VegWiz.API/Controllers/RecipesController.cs

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using VegWiz.Core.Interfaces;
using VegWiz.Core.Models;
using VegWiz.API.DTOs;

namespace VegWiz.API.Controllers;

/// <summary>
/// Controller for managing recipe operations.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class RecipesController : ControllerBase
    {
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<RecipesController> _logger;
    private readonly IWebHostEnvironment _webHostEnvironment;

    /// <summary>
    /// Initialises a new instance of the RecipesController.
    /// </summary>

    public RecipesController(
        IUnitOfWork unitOfWork, 
        ILogger<RecipesController> logger,
        IWebHostEnvironment webHostEnvironment)
    {
        _unitOfWork = unitOfWork;
        _logger = logger;
        _webHostEnvironment = webHostEnvironment;
    }

    /// <summary>
    /// Gets a paginated list of recipes.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        try
        {
            var recipes = await _unitOfWork.Recipes.GetAllAsync(page, pageSize);
            var totalCount = await _unitOfWork.Recipes.GetTotalCountAsync();

            Response.Headers.Append("X-Total-Count", totalCount.ToString());
            return Ok(recipes);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving recipes");
            return StatusCode(500, "An error occurred while retrieving recipes");
        }
    }

    /// <summary>
    /// Gets a specific recipe by id.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<Recipe>> GetRecipe(Guid id)
    {
        try
        {
            var recipe = await _unitOfWork.Recipes.GetByIdAsync(id);
            return Ok(recipe);
        }
        catch (KeyNotFoundException)
        {
            return NotFound($"Recipe with ID {id} not found");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving recipe {RecipeId}", id);
            return StatusCode(500, "An error occurred while retrieving the recipe");
        }
    }

    [HttpPost]
    public async Task<ActionResult<Recipe>> CreateRecipe(CreateRecipeDto recipeDto)
    {
        try
        {
            var recipe = new Recipe(
                recipeDto.Title,
                recipeDto.Description,
                recipeDto.Instructions,
                recipeDto.PrepTime,
                recipeDto.CookTime,
                recipeDto.Servings,
                recipeDto.CreatedById);

            // Add nutritional info
            var nutritionalInfo = new NutritionalInfo
            {
                Calories = recipeDto.NutritionalInfo.Calories,
                Protein = recipeDto.NutritionalInfo.Protein,
                Carbohydrates = recipeDto.NutritionalInfo.Carbohydrates,
                Fat = recipeDto.NutritionalInfo.Fat,
                Fiber = recipeDto.NutritionalInfo.Fiber
            };

            // Add ingredients
            foreach (var ingredientDto in recipeDto.Ingredients)
            {
                var ingredientNutrition = new NutritionalInfo
                {
                    Calories = ingredientDto.NutritionalInfo.Calories,
                    Protein = ingredientDto.NutritionalInfo.Protein,
                    Carbohydrates = ingredientDto.NutritionalInfo.Carbohydrates,
                    Fat = ingredientDto.NutritionalInfo.Fat,
                    Fiber = ingredientDto.NutritionalInfo.Fiber
                };

                var ingredient = new RecipeIngredient(
                    ingredientDto.Name,
                    ingredientDto.Quantity,
                    ingredientDto.Unit,
                    ingredientNutrition);

                recipe.AddIngredient(ingredient);
            }

            // Add tags
            if (recipeDto.Tags != null)
            {
                foreach (var tagDto in recipeDto.Tags)
                {
                    recipe.AddTag(new RecipeTag(tagDto.Name));
                }
            }

            var createdRecipe = await _unitOfWork.Recipes.AddAsync(recipe);
            await _unitOfWork.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetRecipe),
                new { id = createdRecipe.Id },
                createdRecipe);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating recipe");
            return StatusCode(500, "An error occurred while creating the recipe");
        }
    }

    /// <summary>
    /// Updates an existing recipe.
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRecipe(Guid id, Recipe recipe)
    {
        if (id != recipe.Id)
        {
            return BadRequest("ID mismatch");
        }

        try
        {
            await _unitOfWork.Recipes.UpdateAsync(recipe);
            await _unitOfWork.SaveChangesAsync();
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound($"Recipe with ID {id} not found");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating recipe {RecipeId}", id);
            return StatusCode(500, "An error occurred while updating the recipe");
        }
    }

    /// <summary>
    /// Deletes a specific recipe.
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecipe(Guid id)
    {
        try
        {
            await _unitOfWork.Recipes.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound($"Recipe with ID {id} not found");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting recipe {RecipeId}", id);
            return StatusCode(500, "An error occurred while deleting the recipe");
        }
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<Recipe>>> SearchRecipes(
        [FromQuery] string? searchTerm,
        [FromQuery] string[]? tags,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        try
        {
            var recipes = await _unitOfWork.Recipes.SearchAsync(searchTerm, tags);
            return Ok(recipes);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error searching recipes");
            return StatusCode(500, "An error occurred while searching recipes");
        }
    }

    [HttpGet("tags")]
    public async Task<ActionResult<IEnumerable<string>>> GetAllTags()
    {
        try
        {
            var recipes = await _unitOfWork.Recipes.GetAllAsync();
            var tags = recipes
                .SelectMany(r => r.Tags)
                .Select(t => t.Name)
                .Distinct()
                .OrderBy(t => t)
                .ToList();

            return Ok(tags);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving tags");
            return StatusCode(500, "An error occurred while retrieving tags");
        }
    }

    [HttpPost("{id}/image")]
    [Authorize]
    public async Task<IActionResult> UploadImage(Guid id, IFormFile image)
    {
        if (image == null || image.Length == 0)
            return BadRequest("No image file provided");

        try
        {
            var recipe = await _unitOfWork.Recipes.GetByIdAsync(id);
            if (recipe == null)
                return NotFound();

            // Only allow recipe author to upload images
            if (recipe.CreatedById != User.FindFirst("userId")?.Value)
                return Forbid();

            var fileName = $"{id}-{DateTime.UtcNow.Ticks}{Path.GetExtension(image.FileName)}";
            var filePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", "recipes", fileName);

            Directory.CreateDirectory(Path.GetDirectoryName(filePath) ?? throw new InvalidOperationException("Invalid file path"));
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            recipe.UpdateDetails(
                recipe.Title,
                recipe.Description,
                recipe.Instructions,
                recipe.PrepTime,
                recipe.CookTime,
                recipe.Servings,
                $"/images/recipes/{fileName}");

            await _unitOfWork.SaveChangesAsync();

            return Ok(new { imageUrl = recipe.ImageUrl });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading image for recipe {RecipeId}", id);
            return StatusCode(500, "An error occurred while uploading the image");
        }
    }
}