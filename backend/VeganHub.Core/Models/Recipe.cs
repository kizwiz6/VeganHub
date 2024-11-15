// VegWiz.Core/Models/Recipe.cs
using System;
using System.Collections.Generic;
using VegWiz.Core.Enums;

namespace VegWiz.Core.Models;

/// <summary>
/// Represents a recipe in the system.
/// </summary>
public class Recipe
{
    private Recipe() { } // For EF Core

    public Recipe(
        string title,
        string description,
        string instructions,
        TimeSpan prepTime,
        TimeSpan cookTime,
        int servings,
        string createdById)
    {
        Id = Guid.NewGuid();
        Title = title;
        Description = description;
        Instructions = instructions;
        PrepTime = prepTime;
        CookTime = cookTime;
        Servings = servings;
        CreatedById = createdById;
        CreatedAt = DateTime.UtcNow;
        Ingredients = new List<RecipeIngredient>();
        Tags = new List<RecipeTag>();
        Likes = 0;
        Status = RecipeStatus.Draft;
    }

    public Guid Id { get; private set; }
    public string Title { get; private set; }
    public string Description { get; private set; }
    public string Instructions { get; private set; }
    public TimeSpan PrepTime { get; private set; }
    public TimeSpan CookTime { get; private set; }
    public int Servings { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public string CreatedById { get; private set; }
    public List<RecipeIngredient> Ingredients { get; private set; }
    public List<RecipeTag> Tags { get; private set; }
    public NutritionalInfo NutritionalInfo { get; private set; }
    public int Likes { get; private set; }
    public RecipeStatus Status { get; private set; }
    public string? ImageUrl { get; set; }

    public void UpdateDetails(
        string title,
        string description,
        string instructions,
        TimeSpan prepTime,
        TimeSpan cookTime,
        int servings,
        string url)
    {
        Title = title;
        Description = description;
        Instructions = instructions;
        PrepTime = prepTime;
        CookTime = cookTime;
        Servings = servings;
        ImageUrl = url;
    }

    public void UpdateImageUrl(string url)
    {
        ImageUrl = url;
    }

    public void AddIngredient(RecipeIngredient ingredient)
    {
        Ingredients.Add(ingredient);
        UpdateNutritionalInfo();
    }

    public void RemoveIngredient(Guid ingredientId)
    {
        var ingredient = Ingredients.Find(i => i.Id == ingredientId);
        if (ingredient != null)
        {
            Ingredients.Remove(ingredient);
            UpdateNutritionalInfo();
        }
    }

    public void AddTag(RecipeTag tag)
    {
        if (!Tags.Contains(tag))
        {
            Tags.Add(tag);
        }
    }

    public void RemoveTag(RecipeTag tag)
    {
        Tags.Remove(tag);
    }

    public void Like() => Likes++;
    public void Unlike() => Likes = Math.Max(0, Likes - 1);

    public void Publish()
    {
        if (Status == RecipeStatus.Draft && IsValidForPublishing())
        {
            Status = RecipeStatus.Published;
        }
    }

    private bool IsValidForPublishing()
    {
        return !string.IsNullOrEmpty(Title)
            && !string.IsNullOrEmpty(Instructions)
            && Ingredients.Count > 0;
    }

    private void UpdateNutritionalInfo()
    {
        var totalNutrition = new NutritionalInfo();
        foreach (var ingredient in Ingredients)
        {
            totalNutrition.Add(ingredient.NutritionalInfo);
        }
        NutritionalInfo = totalNutrition;
    }
}