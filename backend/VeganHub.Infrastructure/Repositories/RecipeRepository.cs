using Microsoft.EntityFrameworkCore;
using VegWiz.Core.Interfaces;
using VegWiz.Core.Models;
using VegWiz.Infrastructure.Data;

namespace VegWiz.Infrastructure.Repositories;

/// <summary>
/// Implementation of the recipe repository pattern for database operations.
/// </summary>
public class RecipeRepository : IRecipeRepository
{
    private readonly ApplicationDbContext _context;

    /// <summary>
    /// Initializes a new instance of the RecipeRepository.
    /// </summary>
    /// <param name="context">The database context.</param>
    public RecipeRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Retrieves a recipe by its identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the recipe.</param>
    /// <returns>The recipe if found, otherwise throws KeyNotFoundException.</returns>
    public async Task<Recipe> GetByIdAsync(Guid id)
    {
        var recipe = await _context.Recipes
            .Include(r => r.Ingredients)
            .Include(r => r.Tags)
            .FirstOrDefaultAsync(r => r.Id == id);
        
        return recipe ?? throw new KeyNotFoundException($"Recipe with ID {id} not found");
    }

    /// <summary>
    /// Retrieves a paginated list of recipes.
    /// </summary>
    /// <param name="page">The page number.</param>
    /// <param name="pageSize">The number of items per page.</param>
    /// <returns>A collection of recipes.</returns>
    public async Task<IEnumerable<Recipe>> GetAllAsync(int page = 1, int pageSize = 10)
    {
        return await _context.Recipes
            .Include(r => r.Ingredients)
            .Include(r => r.Tags)
            .OrderByDescending(r => r.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    /// <summary>
    /// Searches for recipes based on search terms and tags.
    /// </summary>
    /// <param name="searchTerm">The search term to filter recipes.</param>
    /// <param name="tags">The tags to filter recipes.</param>
    /// <returns>A collection of matching recipes.</returns>
    public async Task<IEnumerable<Recipe>> SearchAsync(string searchTerm, string[] tags)
    {
        var query = _context.Recipes
            .Include(r => r.Ingredients)
            .Include(r => r.Tags)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(searchTerm))
        {
            query = query.Where(r => 
                r.Title.Contains(searchTerm) || 
                r.Description.Contains(searchTerm));
        }

        if (tags != null && tags.Length > 0)
        {
            query = query.Where(r => 
                r.Tags.Any(t => tags.Contains(t.Name)));
        }

        return await query.ToListAsync();
    }

    /// <summary>
    /// Adds a new recipe to the database.
    /// </summary>
    /// <param name="recipe">The recipe to add.</param>
    /// <returns>The added recipe.</returns>
    public async Task<Recipe> AddAsync(Recipe recipe)
    {
        await _context.Recipes.AddAsync(recipe);
        await _context.SaveChangesAsync();
        return recipe;
    }

    /// <summary>
    /// Updates an existing recipe in the database.
    /// </summary>
    /// <param name="recipe">The recipe to update.</param>
    public async Task UpdateAsync(Recipe recipe)
    {
        _context.Entry(recipe).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    /// <summary>
    /// Deletes a recipe from the database.
    /// </summary>
    /// <param name="id">The unique identifier of the recipe to delete.</param>
    public async Task DeleteAsync(Guid id)
    {
        var recipe = await GetByIdAsync(id);
        if (recipe != null)
        {
            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();
        }
    }

    /// <summary>
    /// Retrieves all recipes created by a specific user.
    /// </summary>
    /// <param name="userId">The unique identifier of the user.</param>
    /// <returns>A collection of recipes created by the user.</returns>
    public async Task<IEnumerable<Recipe>> GetByUserIdAsync(string userId)
    {
        return await _context.Recipes
            .Include(r => r.Ingredients)
            .Include(r => r.Tags)
            .Where(r => r.CreatedById == userId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
    }

    /// <summary>
    /// Gets the total count of recipes in the database.
    /// </summary>
    /// <returns>The total number of recipes.</returns>
    public async Task<int> GetTotalCountAsync()
    {
        return await _context.Recipes.CountAsync();
    }
}