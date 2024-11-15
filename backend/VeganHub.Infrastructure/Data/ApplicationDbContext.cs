// VegWiz.Infrastructure/Data/ApplicationDbContext.cs
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using VegWiz.Core.Models;
using System.Text.Json;

namespace VegWiz.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSets for other entities
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<RecipeTag> Tags { get; set; }
        public DbSet<UserDietary> UserDietaries { get; set; } // Add DbSet for UserDietary

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Call the base method to set up Identity entities
            base.OnModelCreating(builder);

            // Configure the UserDietary entity
            builder.Entity<UserDietary>(entity =>
            {
                // Set the primary key
                entity.HasKey(e => e.Id);

                // Set up the one-to-one relationship with ApplicationUser
                entity.HasOne(d => d.User)
                    .WithOne(u => u.Dietary) // Assuming ApplicationUser has a 'Dietary' navigation property
                    .HasForeignKey<UserDietary>(d => d.UserId);

                // Configure Preferences and Allergies as JSON columns
                entity.Property(e => e.Preferences)
                    .HasConversion(
                        v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                        v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new List<string>());

                entity.Property(e => e.Allergies)
                    .HasConversion(
                        v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                        v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions?)null) ?? new List<string>());
            });

            // Additional configurations for other models can be added here
            builder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        }
    }
}
