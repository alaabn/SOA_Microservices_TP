using Microsoft.EntityFrameworkCore;

namespace RecordStore.data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<RecordStoreEntity> RecordStoreEnitys { set; get; }
}