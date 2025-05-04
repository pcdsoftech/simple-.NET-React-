using System.ComponentModel.DataAnnotations;

namespace AuthBackend.Models
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Full name is required")]
        public required string FullName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public required string Password { get; set; }

        [Required(ErrorMessage = "Confirm password is required")]
        public required string ConfirmPassword { get; set; }
    }

    public class LoginModel
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public required string Password { get; set; }
    }

    public class ChangePasswordModel
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public required string email { get; set; }

        [Required(ErrorMessage = "Current password is required")]
        public required string currentPassword { get; set; }

        [Required(ErrorMessage = "New password is required")]
        public required string newPassword { get; set; }
    }
} 