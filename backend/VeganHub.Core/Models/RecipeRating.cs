// VegWiz.Core/Models/RecipeRating.cs
namespace VegWiz.Core.Models;

public class RecipeRating
{
    public Guid Id { get; private set; }
    public Guid RecipeId { get; private set; }
    public string UserId { get; private set; }
    public int Rating { get; private set; }
    public string? Comment { get; private set; }
    public DateTime CreatedAt { get; private set; }

    public RecipeRating(Guid recipeId, string userId, int rating, string? comment = null)
    {
        Id = Guid.NewGuid();
        RecipeId = recipeId;
        UserId = userId;
        Rating = rating;
        Comment = comment;
        CreatedAt = DateTime.UtcNow;
    }

    public void UpdateRating(int rating, string? comment)
    {
        Rating = rating;
        Comment = comment;
    }
}