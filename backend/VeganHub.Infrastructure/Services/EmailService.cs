// VeganHub.Infrastructure/Services/EmailService.cs
using SendGrid;
using SendGrid.Helpers.Mail;
using VeganHub.Core.Interfaces;

public interface IEmailService
{
    Task SendVerificationEmailAsync(string email, string token);
    Task SendPasswordResetEmailAsync(string email, string token);
}

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly SendGridClient _client;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
        _client = new SendGridClient(configuration["SendGrid:ApiKey"]);
    }

    public async Task SendVerificationEmailAsync(string email, string token)
    {
        var from = new EmailAddress("noreply@vegwiz.com", "VegWiz");
        var to = new EmailAddress(email);
        var subject = "Verify your VegWiz account";
        var verifyUrl = $"{_configuration["AppUrl"]}/verify-email?token={token}";
        var htmlContent = $@"
            <h1>Welcome to VegWiz!</h1>
            <p>Please verify your email by clicking the link below:</p>
            <a href='{verifyUrl}'>Verify Email</a>
        ";

        var msg = MailHelper.CreateSingleEmail(from, to, subject, null, htmlContent);
        await _client.SendEmailAsync(msg);
    }

    public async Task SendPasswordResetEmailAsync(string email, string token)
    {
    var from = new EmailAddress("noreply@vegwiz.com", "VegWiz");
    var to = new EmailAddress(email);
    var subject = "Reset your VegWiz password";
    var resetUrl = $"{_configuration["AppUrl"]}/reset-password?token={token}";
    var htmlContent = $@"
        <h1>Password Reset Request</h1>
        <p>A password reset was requested for your VegWiz account. If you didn't make this request, please ignore this email.</p>
        <p>To reset your password, click the link below (valid for 24 hours):</p>
        <a href='{resetUrl}'>Reset Password</a>
        <p>If you can't click the link, copy and paste this URL into your browser:</p>
        <p>{resetUrl}</p>
    ";

    var msg = MailHelper.CreateSingleEmail(from, to, subject, null, htmlContent);
    await _client.SendEmailAsync(msg);
    }
}