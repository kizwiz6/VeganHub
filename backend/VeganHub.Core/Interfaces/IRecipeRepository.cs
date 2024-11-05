// VeganHub.Core/Interfaces/IRecipeRepository.cs
namespace VeganHub.Core.Interfaces;

public interface IRecipeRepository
{
    Task<Recipe> GetByIdAsync(Guid id);
    Task<IEnumerable<Recipe>> GetAllAsync(int page = 1, int pageSize = 10);
    Task<IEnumerable<Recipe>> SearchAsync(string searchTerm, string[] tags);
    Task<Recipe> AddAsync(Recipe recipe);
    Task UpdateAsync(Recipe recipe);
    Task DeleteAsync(Guid id);
    Task<IEnumerable<Recipe>> GetByUserIdAsync(string userId);
    Task<int> GetTotalCountAsync();
}