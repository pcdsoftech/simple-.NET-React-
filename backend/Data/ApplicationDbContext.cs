using AuthBackend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AuthBackend.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure ApplicationUser
            builder.Entity<ApplicationUser>(entity =>
            {
                entity.ToTable("AspNetUsers");
                entity.Property(e => e.FullName).IsRequired();
                entity.Property(e => e.Email).IsRequired();
                entity.HasIndex(e => e.Email).IsUnique();
            });

            // Configure MySQL specific settings
            builder.Entity<ApplicationUser>().Property(e => e.Id).HasColumnType("varchar(255)");
            builder.Entity<ApplicationUser>().Property(e => e.UserName).HasColumnType("varchar(256)");
            builder.Entity<ApplicationUser>().Property(e => e.NormalizedUserName).HasColumnType("varchar(256)");
            builder.Entity<ApplicationUser>().Property(e => e.Email).HasColumnType("varchar(256)");
            builder.Entity<ApplicationUser>().Property(e => e.NormalizedEmail).HasColumnType("varchar(256)");
            builder.Entity<ApplicationUser>().Property(e => e.PasswordHash).HasColumnType("longtext");
            builder.Entity<ApplicationUser>().Property(e => e.SecurityStamp).HasColumnType("longtext");
            builder.Entity<ApplicationUser>().Property(e => e.ConcurrencyStamp).HasColumnType("longtext");
            builder.Entity<ApplicationUser>().Property(e => e.PhoneNumber).HasColumnType("longtext");
            builder.Entity<ApplicationUser>().Property(e => e.FullName).HasColumnType("varchar(256)");

            // Configure Identity tables
            builder.Entity<Microsoft.AspNetCore.Identity.IdentityRole>().ToTable("AspNetRoles");
            builder.Entity<Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>>().ToTable("AspNetRoleClaims");
            builder.Entity<Microsoft.AspNetCore.Identity.IdentityUserClaim<string>>().ToTable("AspNetUserClaims");
            builder.Entity<Microsoft.AspNetCore.Identity.IdentityUserLogin<string>>().ToTable("AspNetUserLogins");
            builder.Entity<Microsoft.AspNetCore.Identity.IdentityUserRole<string>>().ToTable("AspNetUserRoles");
            builder.Entity<Microsoft.AspNetCore.Identity.IdentityUserToken<string>>().ToTable("AspNetUserTokens");
        }
    }
} 