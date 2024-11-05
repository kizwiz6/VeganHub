using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;
using FluentAssertions;
using VeganHub.API.Controllers;
using VeganHub.Core.Interfaces;
using VeganHub.Core.Models;
using VeganHub.API.DTOs;

namespace VeganHub.Tests.Controllers;

public class RecipesControllerTests
{
    private readonly Mock<IUnitOfWork> _mockUnitOfWork;
    private readonly Mock<ILogger<RecipesController>> _mockLogger;
    private readonly RecipesController _controller;

    public RecipesControllerTests()
    {
        _mockUnitOfWork = new Mock<IUnitOfWork>();
        _mockLogger = new Mock<ILogger<RecipesController>>();
        _controller = new RecipesController(_mockUnitOfWork.Object, _mockLogger.Object);
    }

    [Fact]
    public async Task GetRecipes_ShouldReturnOkResult()
    {
        // Arrange
        var recipes = new List<Recipe> { CreateTestRecipe(), CreateTestRecipe() };
        _mockUnitOfWork.Setup(uow => uow.Recipes.GetAllAsync(It.IsAny<int>(), It.IsAny<int>()))
            .ReturnsAsync(recipes);
        _mockUnitOfWork.Setup(uow => uow.Recipes.GetTotalCountAsync())
            .ReturnsAsync(recipes.Count);

        // Act
        var result = await _controller.GetRecipes();

        // Assert
        var okResult = result.Result.Should().BeOfType<OkObjectResult>().Subject;
        var returnedRecipes = okResult.Value.Should().BeAssignableTo<IEnumerable<Recipe>>().Subject;
        returnedRecipes.Should().HaveCount(2);
    }

    [Fact]
    public async Task CreateRecipe_WithValidData_ShouldReturnCreatedResult()
    {
        // Arrange
        var recipeDto = CreateTestRecipeDto();
        var recipe = CreateTestRecipe();
        
        _mockUnitOfWork.Setup(uow => uow.Recipes.AddAsync(It.IsAny<Recipe>()))
            .ReturnsAsync(recipe);

        // Act
        var result = await _controller.CreateRecipe(recipeDto);

        // Assert
        var createdResult = result.Result.Should().BeOfType<CreatedAtActionResult>().Subject;
        createdResult.Value.Should().BeAssignableTo<Recipe>();
        _mockUnitOfWork.Verify(uow => uow.SaveChangesAsync(), Times.Once);
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

    private CreateRecipeDto CreateTestRecipeDto()
    {
        return new CreateRecipeDto
        {
            Title = "Test Recipe",
            Description = "Test Description",
            Instructions = "Test Instructions",
            PrepTime = TimeSpan.FromMinutes(15),
            CookTime = TimeSpan.FromMinutes(30),
            Servings = 8,
            CreatedById = "test-user-1",
            NutritionalInfo = new NutritionalInfoDto
            {
                Calories = 100,
                Protein = 10,
                Carbohydrates = 20,
                Fat = 5,
                Fiber = 3
            },
            Ingredients = new List<CreateRecipeIngredientDto>(),
            Tags = new List<CreateRecipeTagDto>()
        };
    }
}