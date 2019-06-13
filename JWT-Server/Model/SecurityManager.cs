using JWT_Server.Model;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace JWT_Server.Security
{
    public class SecurityManager
    {
        private JwtSettings _settings = null;
        public SecurityManager(JwtSettings settings)
        {
            _settings = settings;
        }

        public AppUserAuth ValidateUser(AppUser user)
        {
            AppUserAuth ret = new AppUserAuth();
            AppUser authUser = null;

            using (var db = new JwtDbContext())
            {
                authUser = db.Users.Where(
                    u => u.UserName.ToLower() == user.UserName.ToLower()
                    && u.Password == user.Password).FirstOrDefault();
            }

            if (authUser != null)
            {
                ret = BuildUserAuthObject(authUser);
            }

            return ret;
        }
        protected AppUserAuth BuildUserAuthObject(AppUser authUser)
        {
            AppUserAuth ret = new AppUserAuth();

            ret.UserName = authUser.UserName;
            ret.IsAuthenticated = true;

            ret.Claims = GetUserClaims(authUser);

            ret.BearerToken = BuildJwtToken(ret);

            return ret;
        }
        protected List<AppUserClaim> GetUserClaims(AppUser authUser)
        {
            List<AppUserClaim> list = new List<AppUserClaim>();

            try
            {
                using (var db = new JwtDbContext())
                {
                    list = db.Claims.Where(
                        u => u.UserId == authUser.UserId).ToList();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(
                    "Exception trying to retrieve user claims.", ex);
            }

            return list;
        }
        protected string BuildJwtToken(AppUserAuth authUser)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_settings.Key));

            List<Claim> jwtClaims = new List<Claim>();
            jwtClaims.Add(new Claim(JwtRegisteredClaimNames.Sub,
                authUser.UserName));
            jwtClaims.Add(new Claim(JwtRegisteredClaimNames.Jti,
                Guid.NewGuid().ToString()));

            jwtClaims.Add(new Claim("isAuthenticated",
                authUser.IsAuthenticated.ToString().ToLower()));

            foreach (var claim in authUser.Claims)
            {
                jwtClaims.Add(new Claim(claim.ClaimType, claim.ClaimValue));
            }

            var token = new JwtSecurityToken(
                issuer: _settings.Issuer,
                audience: _settings.Audience,
                claims: jwtClaims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(
                    _settings.MinutesToExpiration),
                signingCredentials: new SigningCredentials(key,
                SecurityAlgorithms.HmacSha256)
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
