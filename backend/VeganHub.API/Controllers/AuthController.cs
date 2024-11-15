// VegWiz.API/Controllers/AuthController.cs
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Hosting;
using VegWiz.Core.Configuration;
using VegWiz.Core.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly JwtSettings _jwtSettings;
    private readonly ILogger<AuthController> _logger;
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly IEmailService _emailService;

    public AuthController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IOptions<JwtSettings> jwtSettings,
        ILogger<AuthController> logger,
        IWebHostEnvironment webHostEnvironment,
        IEmailService emailService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtSettings = jwtSettings.Value;
        _logger = logger;
        _webHostEnvironment = webHostEnvironment;
        _emailService = emailService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        _logger.LogInformation("Received registration request for email: {Email}", request.Email);
        try
        {
            var user = new ApplicationUser
            {
                UserName = request.Username,
                Email = request.Email,
                CreatedAt = DateTime.UtcNow,
                EmailConfirmed = false // Ensure email isn't confirmed
            };

            var result = await _userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new { Errors = result.Errors });
            }

            // Generate and send verification email
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            await _emailService.SendVerificationEmailAsync(request.Email, token);

            _logger.LogInformation("User created successfully, verification email sent");
            return Ok(new
            {
                message = "Registration successful. Please check your email to verify your account.",
                user = new
                {
                    user.Id,
                    user.UserName,
                    user.Email
                }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Registration failed for email: {Email}", request.Email);
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            _logger.LogInformation("Login attempt for email: {Email}", request.Email);

            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
            {
                _logger.LogWarning("User not found: {Email}", request.Email);
                return BadRequest(new { message = "Invalid credentials" });
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
            _logger.LogInformation("Password check result: {Result}", result);

            if (result.Succeeded)
            {
                var token = GenerateJwtToken(user);
                var refreshToken = GenerateRefreshToken();

                // Store refresh token
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(_jwtSettings.RefreshTokenExpiryDays);

                var updateResult = await _userManager.UpdateAsync(user);

                _logger.LogInformation($"User avatar URL at login: {user.AvatarUrl}");

                if (!updateResult.Succeeded)
                {
                    _logger.LogError("Failed to update user with refresh token: {Errors}",
                        string.Join(", ", updateResult.Errors.Select(e => e.Description)));
                }

                return Ok(new
                {
                    token,
                    refreshToken,
                    user = new
                    {
                        user.Id,
                        user.Email,
                        user.UserName,
                        user.DisplayName,
                        user.Bio,
                        avatar = user.AvatarUrl
                    }
                });
            }

            _logger.LogWarning("Login failed for user {Email}: {Reason}",
                request.Email,
                result.IsLockedOut ? "Locked out" : result.IsNotAllowed ? "Not allowed" : "Invalid password");

            return BadRequest(new { message = "Invalid credentials" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Login error for email: {Email}", request.Email);
            return StatusCode(500, new { message = ex.Message });
        }
    }

    private string GenerateJwtToken(ApplicationUser user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtSettings.Key);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email!),
                new Claim(ClaimTypes.Name, user.UserName!)
            }),
            Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiryMinutes),
            Issuer = _jwtSettings.Issuer,
            Audience = _jwtSettings.Audience,
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    private string GenerateRefreshToken()
    {
        return Convert.ToBase64String(Guid.NewGuid().ToByteArray());
    }

    [Authorize]
    [HttpPatch("profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return NotFound("User not found");

            user.DisplayName = dto.DisplayName;
            user.Bio = dto.Bio;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return BadRequest(new { Errors = result.Errors });

            return Ok(new
            {
                user = new
                {
                    id = user.Id,
                    username = user.UserName,
                    displayName = user.DisplayName,
                    bio = user.Bio,
                    avatarUrl = user.AvatarUrl
                }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating profile");
            return StatusCode(500, "An error occurred while updating the profile");
        }
    }

    [Authorize]
    [HttpPost("profile/avatar")]
    public async Task<IActionResult> UploadAvatar(IFormFile file)
    {
        try
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return NotFound("User not found");

            // Generate unique filename
            var fileName = $"{userId}-{DateTime.UtcNow.Ticks}{Path.GetExtension(file.FileName)}";
            var avatarPath = Path.Combine("uploads", "avatars", fileName);
            var fullPath = Path.Combine(_webHostEnvironment.WebRootPath, avatarPath);

            // Log the paths
            _logger.LogInformation($"Saving file to: {fullPath}");
            _logger.LogInformation($"Public URL will be: /uploads/avatars/{fileName}");

            // Ensure directory exists
            Directory.CreateDirectory(Path.GetDirectoryName(fullPath));

            // Save file
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Update user avatar URL
            var avatarUrl = $"/uploads/avatars/{fileName}";
            user.AvatarUrl = avatarUrl;

            var updateResult = await _userManager.UpdateAsync(user);

            if (!updateResult.Succeeded)
            {
                _logger.LogError($"Failed to update user avatar: {string.Join(", ", updateResult.Errors)}");
                return StatusCode(500, "Failed to update user avatar");
            }

            _logger.LogInformation($"Avatar URL updated to: {avatarUrl}");

            // Create response object
            var response = new
            {
                avatarUrl = $"https://localhost:7777{avatarUrl}",  // Add domain for client
                user = new
                {
                    user.Id,
                    user.Email,
                    user.UserName,
                    user.DisplayName,
                    user.Bio,
                    avatar = $"https://localhost:7777{avatarUrl}"
                }
            };

            // Log the response
            _logger.LogInformation($"Returning response: {System.Text.Json.JsonSerializer.Serialize(response)}");

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading avatar");
            return StatusCode(500, "An error occurred while uploading the avatar");
        }
    }

    [Authorize]
    [HttpGet("session")]
    public async Task<IActionResult> VerifySession()
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return NotFound("User not found");

            return Ok(new
            {
                user = new
                {
                    id = user.Id,
                    email = user.Email,
                    username = user.UserName,
                    displayName = user.DisplayName,
                    bio = user.Bio,
                    avatar = user.AvatarUrl != null
                        ? $"https://localhost:7777{user.AvatarUrl}"  // Add domain
                        : null,
                    createdAt = user.CreatedAt,
                    recipesCount = user.RecipesCount,
                    followersCount = user.FollowersCount,
                    followingCount = user.FollowingCount,
                }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error verifying session");
            return StatusCode(500, "An error occurred while verifying the session");
        }
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        try
        {
            await _signInManager.SignOutAsync();
            return Ok(new { message = "Successfully logged out" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during logout");
            return StatusCode(500, "An error occurred during logout");
        }
    }
}