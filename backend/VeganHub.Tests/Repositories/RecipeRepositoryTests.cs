using Moq;
using Xunit;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using VegWiz.Core.Models;
using VegWiz.Infrastructure.Data;
using VegWiz.Infrastructure.Repositories;

namespace VegWiz.Tests.Repositories;

public class RecipeRepositoryTests
{
    private readonly DbContextOptions<ApplicationDbContext> _options;

    public RecipeRepositoryTests()
    {
        _options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
    }

    [Fact]
    public async Task GetByIdAsync_WithExistingRecipe_ShouldReturnRecipe()
    {
        // Arrange
        var recipe = CreateTestRecipe();
        using (var context = new ApplicationDbContext(_options))
        {
            await context.Recipes.AddAsync(recipe);
            await context.SaveChangesAsync();
        }

        // Act
        using (var context = new ApplicationDbContext(_options))
        {
            var repository = new RecipeRepository(context);
            var result = await repository.GetByIdAsync(recipe.Id);

            // Assert
            result.Should().NotBeNull();
            result.Id.Should().Be(recipe.Id);
            result.Title.Should().Be(recipe.Title);
        }
    }

    [Fact]
    public async Task GetAllAsync_ShouldReturnPaginatedResults()
    {
        // Arrange
        using (var context = new ApplicationDbContext(_options))
        {
            for (int i = 0; i < 15; i++)
            {
                await context.Recipes.AddAsync(CreateTestRecipe($"Recipe {i}"));
            }
            await context.SaveChangesAsync();
        }

        // Act
        using (var context = new ApplicationDbContext(_options))
        {
            var repository = new RecipeRepository(context);
            var page1 = await repository.GetAllAsync(page: 1, pageSize: 10);
            var page2 = await repository.GetAllAsync(page: 2, pageSize: 10);

            // Assert
            page1.Should().HaveCount(10);
            page2.Should().HaveCount(5);
        }
    }

    [Fact]
    public async Task SearchAsync_ShouldReturnMatchingRecipes()
    {
        // Arrange
        using (var context = new ApplicationDbContext(_options))
        {
            await context.Recipes.AddAsync(CreateTestRecipe("Vegan Cake"));
            await context.Recipes.AddAsync(CreateTestRecipe("Vegan Pizza"));
            await context.Recipes.AddAsync(CreateTestRecipe("Vegetable Soup"));
            await context.SaveChangesAsync();
        }

        // Act
        using (var context = new ApplicationDbContext(_options))
        {
            var repository = new RecipeRepository(context);
            var results = await repository.SearchAsync("Vegan", new string[] { });

            // Assert
            results.Should().HaveCount(2);
            results.Should().AllSatisfy(r => r.Title.Should().Contain("Vegan"));
        }
    }

    private Recipe CreateTestRecipe(string title = "Test Recipe")
    {
        return new Recipe(
            title,
            "Test Description",
            "Test Instructions",
            TimeSpan.FromMinutes(15),
            TimeSpan.FromMinutes(30),
            8,
            "test-user-1");
    }
}