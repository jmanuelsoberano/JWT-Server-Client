using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JWT_Server.Model
{
    [Table("User", Schema = "Security")]
    public class AppUser
    {
        [Required()]
        [Key()]
        public Guid UserId { get; set; }

        [Required()]
        [StringLength(255)]
        public string UserName { get; set; }

        [Required()]
        [StringLength(255)]
        public string Password { get; set; }
    }
}
