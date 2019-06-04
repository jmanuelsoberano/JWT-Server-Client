using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using JWT_Server.Model;

namespace JWT_Server.Security
{
    public class SecurityManager
    {
        public AppUserAuth ValidateUser(AppUser user)
        {
            AppUserAuth result = new AppUserAuth();
            AppUser authUser = null;

            using (var db = new JwtDbContext())
            {
                authUser = db.Users.Where(
                    u => u.UserName.ToLower() == user.UserName.ToLower()
                    && u.Password == user.Password).FirstOrDefault();
            }

            if (authUser != null)
            {
                result = BuildUserAuthObject(authUser);
            }

            return result;

        }

        protected AppUserAuth BuildUserAuthObject(AppUser authUser)
        {
            AppUserAuth result = new AppUserAuth();

            result.UserName = authUser.UserName;
            result.IsAuthenticated = true;
            result.BearerToken = new Guid().ToString();
            result.Claims = GetUserClaims(authUser);

            return result;

        }

        protected List<AppUserClaim> GetUserClaims(AppUser authUser)
        {
            List<AppUserClaim> list = new List<AppUserClaim>();

            try
            {
                using (var db = new JwtDbContext())
                {
                    list = db.Claims.Where(u => u.UserId == authUser.UserId).ToList();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Exception trying to retrieve user claims", ex);
            }

            return list;
        }
    }
}
