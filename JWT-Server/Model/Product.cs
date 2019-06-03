using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JWT_Server.Model
{
    [Table("Product", Schema = "dbo")]
    public partial class Product
    {
        public int ProductId { get; set; }

        [Required()]
        [StringLength(80)]
        public string ProductName { get; set; }

        public DateTime? IntroductionDate { get; set; }

        [Column(TypeName = "money")]
        public decimal? Price { get; set; }

        [Required()]
        [StringLength(255)]
        public string Url { get; set; }

        public int? CategoryId { get; set; }
    }
}
