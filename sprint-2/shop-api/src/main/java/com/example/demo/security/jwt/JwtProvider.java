
package com.example.demo.security.jwt;


import com.example.demo.security.userprincal.UserPrinciple;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);
    private String jwtSecret = "c0222g1";
    private int jwtExpiration = 86400;  //1 day
    private String token_temp = "";

    public String createToken(Authentication authentication) {
        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
        return Jwts.builder().setSubject(userPrinciple.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpiration * 1000))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public boolean validateToken(String token) {
        token_temp = token;
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature -> Message: {} ", e);
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token -> Message: {}", e);
        } catch (ExpiredJwtException e) {
            logger.error("Expired JWT token -> Message: {}", e);
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token -> Message: {}", e);
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty -> Message: {}", e);
        }

        return false;
    }

    public String getMessValidateToken() {

        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token_temp);
            return "Token không hợp lệ";
        } catch (SignatureException e) {
            return "Token không hợp lệ.";
        } catch (MalformedJwtException e) {
            return "Token không hợp lệ";
        } catch (ExpiredJwtException e) {
            return "Token đã hết hạn";
        } catch (UnsupportedJwtException e) {
            return "Token không hỗ trợ";
        } catch (IllegalArgumentException e) {
            return "Token trống";
        }
    }

    public String getUerNameFromToken(String token) {
        String userName = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
        System.out.println(">>>>>>>>>>>>>>>>>>>>>" + userName);
        return userName;
    }
}

