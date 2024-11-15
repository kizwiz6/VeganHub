// VeganHub.Core/Interfaces/IUnitOfWork.cs
namespace VeganHub.Core.Interfaces;

public interface IUnitOfWork
{
    IRecipeRepository Recipes { get; }
    Task<int> SaveChangesAsync();
}