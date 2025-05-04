using AuthBackend.Models;
using AuthBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                return BadRequest(new { 
                    Status = "Error", 
                    Message = "Registration failed", 
                    Errors = errors 
                });
            }

            var (result, user, token) = await _authService.RegisterUserAsync(model);
            if (result.Succeeded)
            {
                return Ok(new { 
                    Status = "Success", 
                    Message = "User created successfully!",
                    Token = token,
                    User = new {
                        Id = user.Id,
                        Name = user.FullName,
                        Email = user.Email
                    }
                });
            }

            var identityErrors = result.Errors.Select(e => e.Description).ToList();
            return BadRequest(new { 
                Status = "Error", 
                Message = "User creation failed!", 
                Errors = identityErrors 
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Status = "Error", Message = "Invalid input", Errors = ModelState.Values.SelectMany(v => v.Errors) });
            }

            var (token, user) = await _authService.LoginAsync(model);
            if (token != null && user != null)
            {
                return Ok(new { 
                    Token = token,
                    User = new {
                        Id = user.Id,
                        Name = user.FullName,
                        Email = user.Email
                    }
                });
            }
            return Unauthorized(new { Status = "Error", Message = "Invalid credentials" });
        }

        [HttpGet("test")]
        [Authorize]
        public IActionResult Test()
        {
            return Ok(new { Message = "This is a protected endpoint" });
        }

        [HttpPost("change-password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        {
            Console.WriteLine(model.currentPassword);
            Console.WriteLine(model.newPassword);
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Status = "Error", Message = "Invalid input", Errors = ModelState.Values.SelectMany(v => v.Errors) });
            }

            var result = await _authService.ChangePasswordAsync(model);
            if (result.Succeeded)
            {
                return Ok(new { Status = "Success", Message = "Password changed successfully!" });
            }
            return BadRequest(new { Status = "Error", Message = "Password change failed!", Errors = result.Errors });
        }
    }
} 