// VegWiz.Core/Enums/RecipeStatus.cs
namespace VegWiz.Core.Enums;

/// <summary>
/// Represents the current status of a recipe.
/// </summary>
public enum RecipeStatus
{
    /// <summary>
    /// Recipe is in draft state
    /// </summary>
    Draft,

    /// <summary>
    /// Recipe is published and visible to users
    /// </summary>
    Published,

    /// <summary>
    /// Recipe has been archived
    /// </summary>
    Archived
}