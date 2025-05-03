using Microsoft.AspNetCore.Identity;

namespace AuthBackend.Models
{
    public class ApplicationUser : IdentityUser
    {
        public required string FullName { get; set; }
    }
}