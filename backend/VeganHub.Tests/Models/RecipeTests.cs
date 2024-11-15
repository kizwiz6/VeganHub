using Xunit;
using FluentAssertions;
using VegWiz.Core.Models;
using VegWiz.Core.Enums;

namespace VegWiz.Tests.Models;

public class RecipeTests
{
    [Fact]
    public void CreateRecipe_WithValidData_ShouldCreateRecipeSuccessfully()
    {
        // Arrange
        var title = "Vegan Chocolate Cake";
        var description = "Delicious chocolate cake";
        var instructions = "1. Mix 2. Bake";
        var prepTime = TimeSpan.FromMinutes(15);
        var cookTime = TimeSpan.FromMinutes(30);
        var servings = 8;
        var userId = "test-user-1";

        // Act
        var recipe = new Recipe(
            title,
            description,
            instructions,
            prepTime,
            cookTime,
            servings,
            userId);

        // Assert
        recipe.Should().NotBeNull();
        recipe.Id.Should().NotBe(Guid.Empty);
        recipe.Title.Should().Be(title);
        recipe.Description.Should().Be(description);
        recipe.Instructions.Should().Be(instructions);
        recipe.PrepTime.Should().Be(prepTime);
        recipe.CookTime.Should().Be(cookTime);
        recipe.Servings.Should().Be(servings);
        recipe.CreatedById.Should().Be(userId);
        recipe.Status.Should().Be(RecipeStatus.Draft);
        recipe.Ingredients.Should().BeEmpty();
        recipe.Tags.Should().BeEmpty();
        recipe.Likes.Should().Be(0);
    }

    [Fact]
    public void AddIngredient_ShouldUpdateNutritionalInfo()
    {
        // Arrange
        var recipe = CreateTestRecipe();
        var ingredient = new RecipeIngredient(
            "Flour",
            2,
            "cups",
            new NutritionalInfo { Calories = 100, Protein = 3, Carbohydrates = 20, Fat = 1, Fiber = 1 });

        // Act
        recipe.AddIngredient(ingredient);

        // Assert
        recipe.Ingredients.Should().HaveCount(1);
        recipe.Ingredients.Should().Contain(ingredient);
        recipe.NutritionalInfo.Should().NotBeNull();
        recipe.NutritionalInfo.Calories.Should().Be(100);
        recipe.NutritionalInfo.Protein.Should().Be(3);
    }

    [Fact]
    public void RemoveIngredient_ShouldUpdateNutritionalInfo()
    {
        // Arrange
        var recipe = CreateTestRecipe();
        var ingredient = new RecipeIngredient(
            "Flour",
            2,
            "cups",
            new NutritionalInfo { Calories = 100, Protein = 3, Carbohydrates = 20, Fat = 1, Fiber = 1 });
        recipe.AddIngredient(ingredient);

        // Act
        recipe.RemoveIngredient(ingredient.Id);

        // Assert
        recipe.Ingredients.Should().BeEmpty();
        recipe.NutritionalInfo.Calories.Should().Be(0);
        recipe.NutritionalInfo.Protein.Should().Be(0);
    }

    [Fact]
    public void UpdateDetails_ShouldUpdateRecipeProperties()
    {
        // Arrange
        var recipe = CreateTestRecipe();
        var newTitle = "Updated Recipe";
        var newDescription = "Updated Description";
        var newInstructions = "Updated Instructions";
        var newPrepTime = TimeSpan.FromMinutes(20);
        var newCookTime = TimeSpan.FromMinutes(40);
        var newServings = 10;

        // Act
        recipe.UpdateDetails(
            newTitle,
            newDescription,
            newInstructions,
            newPrepTime,
            newCookTime,
            newServings);

        // Assert
        recipe.Title.Should().Be(newTitle);
        recipe.Description.Should().Be(newDescription);
        recipe.Instructions.Should().Be(newInstructions);
        recipe.PrepTime.Should().Be(newPrepTime);
        recipe.CookTime.Should().Be(newCookTime);
        recipe.Servings.Should().Be(newServings);
    }

    private Recipe CreateTestRecipe()
    {
        return new Recipe(
            "Test Recipe",
            "Test Description",
            "Test Instructions",
            TimeSpan.FromMinutes(15),
            TimeSpan.FromMinutes(30),
            8,
            "test-user-1");
    }
}