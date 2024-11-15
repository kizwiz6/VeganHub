// VegWiz.Infrastructure/Configuration/RecipeTagConfiguration.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VegWiz.Core.Models;

namespace VegWiz.Infrastructure.Configuration;

/// <summary>
/// Configuration class for the RecipeTag entity.
/// </summary>
public class RecipeTagConfiguration : IEntityTypeConfiguration<RecipeTag>
{
    /// <summary>
    /// Configures the entity mapping for RecipeTag.
    /// </summary>
    /// <param name="builder">The builder used to configure the entity.</param>
    public void Configure(EntityTypeBuilder<RecipeTag> builder)
    {
        builder.HasKey(t => t.Id);

        builder.Property(t => t.Name)
            .IsRequired()
            .HasMaxLength(50);

        builder.HasIndex(t => t.Name)
            .IsUnique();
    }
}