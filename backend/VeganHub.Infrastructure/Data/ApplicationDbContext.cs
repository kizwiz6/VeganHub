// VeganHub.Infrastructure/Data/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using VeganHub.Core.Models;

namespace VeganHub.Infrastructure.Data;

/// <summary>
/// Represents the database context for the VeganHub application.
/// </summary>
public class ApplicationDbContext : DbContext
{
    /// <summary>
    /// Initializes a new instance of the ApplicationDbContext.
    /// </summary>
    /// <param name="options">The options to be used by the DbContext.</param>
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    /// <summary>
    /// Gets or sets the recipes DbSet.
    /// </summary>
    public DbSet<Recipe> Recipes { get; set; }

    /// <summary>
    /// Gets or sets the recipe tags DbSet.
    /// </summary>
    public DbSet<RecipeTag> Tags { get; set; }

    /// <summary>
    /// Configures the model that was discovered by convention from the entity types.
    /// </summary>
    /// <param name="modelBuilder">The builder being used to construct the model for this context.</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
    }
}