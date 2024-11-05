using VeganHub.Core.Interfaces;
using VeganHub.Infrastructure.Data;

namespace VeganHub.Infrastructure.Repositories;

/// <summary>
/// Implementation of the Unit of Work pattern to manage transactions and repositories.
/// </summary>
public class UnitOfWork : IUnitOfWork, IDisposable
{
    private readonly ApplicationDbContext _context;
    private IRecipeRepository? _recipeRepository;
    private bool _disposed;

    /// <summary>
    /// Initialises a new instance of the UnitOfWork.
    /// </summary>
    /// <param name="context">The database context.</param>
    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Gets the recipe repository.
    /// </summary>
    public IRecipeRepository Recipes => 
        _recipeRepository ??= new RecipeRepository(_context);

    /// <summary>
    /// Saves all pending changes in the unit of work.
    /// </summary>
    /// <returns>The number of objects written to the database.</returns>
    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed && disposing)
        {
            _context.Dispose();
        }
        _disposed = true;
    }
}