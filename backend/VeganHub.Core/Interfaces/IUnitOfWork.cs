// VegWiz.Core/Interfaces/IUnitOfWork.cs
namespace VegWiz.Core.Interfaces;

public interface IUnitOfWork
{
    IRecipeRepository Recipes { get; }
    Task<int> SaveChangesAsync();
}