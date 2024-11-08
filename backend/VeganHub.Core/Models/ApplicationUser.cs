// ApplicationUser.cs
using Microsoft.AspNetCore.Identity;

namespace VeganHub.Core.Models;

public class ApplicationUser : IdentityUser
{
    public string? DisplayName { get; set; }
    public string? Avatar { get; set; }
    public string? Bio { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int RecipesCount { get; set; }
    public int FollowersCount { get; set; }
    public int FollowingCount { get; set; }
    public List<string> Favourites { get; set; } = new();
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }
    public virtual UserDietary? Dietary { get; set; }
}

public class UserDietary
{
    public Guid Id { get; set; }  // Primary key
    public string UserId { get; set; } = string.Empty;  // Foreign key
    public virtual ApplicationUser User { get; set; } = null!;  // Navigation property
    public List<string> Preferences { get; set; } = new();
    public List<string> Allergies { get; set; } = new();
}