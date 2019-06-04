using Microsoft.EntityFrameworkCore;

namespace JWT_Server.Model
{
    public class JwtDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<AppUserClaim> Claims { get; set; }

        private const string CONN =
            @"Server=Localhost;
            Database=JWT-COURSE;
            Trusted_Connection=True;
            MultipleActiveResultSets=true";

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlServer(CONN);

    }
}
