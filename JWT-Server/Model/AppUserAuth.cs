using System.Collections.Generic;

namespace JWT_Server.Model
{
    public class AppUserAuth
    {
        public string UserName { get; set; }
        public string BearerToken { get; set; }
        public bool IsAuthenticated { get; set; }

        public List<AppUserClaim> Claims { get; set; }

        public AppUserAuth() : base()
        {
            UserName = "Not autorized";
            BearerToken = string.Empty;
        }
    }
}
