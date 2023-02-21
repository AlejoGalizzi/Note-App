package com.alejogalizzi.notes.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtTokenUtil {

  private static final String AUTHORITIES = "authorities";

  @Value("secret.key")
  private String secret;

  public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();
    return doGenerateToken(claims, userDetails.getUsername());
  }

  private String doGenerateToken(Map<String, Object> claims, String username) {
    return Jwts.builder()
        .setClaims(claims)
        .setSubject(username)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)).signWith(
            SignatureAlgorithm.HS256, secret).compact();
  }

  public boolean validateToken(String token, String username) {
    final String usernameFromToken = getUsernameFromToken(token);
    return (usernameFromToken.equals(username) && !isTokenExpired(token));
  }

  private boolean isTokenExpired(String token) {
    final Date expiration = getExpirationFromToken(token);
    return expiration.before(new Date());
  }

  private Date getExpirationFromToken(String token) {
    return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getExpiration();
  }

  public String getUsernameFromToken(String token) {
    return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
  }

  private List<String> convertTo(List<GrantedAuthority> grantedAuthorities) {
    return grantedAuthorities.stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.toList());
  }
}
