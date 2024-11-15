// VeganHub.Infrastructure/Configuration/RecipeConfiguration.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VeganHub.Core.Models;

namespace VeganHub.Infrastructure.Configuration;

/// <summary>
/// Configuration class for the Recipe entity.
/// </summary>
public class RecipeConfiguration : IEntityTypeConfiguration<Recipe>
{
    /// <summary>
    /// Configures the entity mapping for Recipe.
    /// </summary>
    /// <param name="builder">The builder used to configure the entity.</param>
    public void Configure(EntityTypeBuilder<Recipe> builder)
    {
        builder.HasKey(r => r.Id);

        builder.Property(r => r.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(r => r.Description)
            .HasMaxLength(2000);

        builder.Property(r => r.Instructions)
            .IsRequired();

        builder.Property(r => r.CreatedById)
            .IsRequired();

        builder.OwnsMany(r => r.Ingredients, ingredientBuilder =>
        {
            ingredientBuilder.WithOwner().HasForeignKey("RecipeId");
            ingredientBuilder.Property<Guid>("Id").IsRequired();
            ingredientBuilder.HasKey("Id");

            ingredientBuilder.OwnsOne(i => i.NutritionalInfo);
        });

        builder.OwnsOne(r => r.NutritionalInfo);

        builder.HasMany(r => r.Tags)
            .WithMany()
            .UsingEntity(j => j.ToTable("RecipeTags"));
    }
}