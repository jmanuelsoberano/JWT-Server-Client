using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JWT_Server.Model
{
    [Table("UserClaim", Schema = "Security")]
    public class AppUserClaim
    {
        [Required()]
        [Key()]
        public Guid ClaimId { get; set; }

        [Required()]
        public Guid UserId { get; set; }

        [Required()]
        public string ClaimType { get; set; }

        [Required()]
        public string ClaimValue { get; set; }
    }
}
