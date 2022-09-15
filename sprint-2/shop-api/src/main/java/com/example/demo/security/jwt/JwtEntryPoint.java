
package com.example.demo.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtEntryPoint implements AuthenticationEntryPoint {
    @Autowired
    JwtProvider jwtProvider;
    private String message = "";
    private Integer code = 500;
    private static final Logger logger = LoggerFactory.getLogger(JwtEntryPoint.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        logger.error("Unauthorized error Message {}", authException.getMessage());

        if (authException.getMessage().equals("Bad credentials")){
            message = "Tài khoản hoặc mật khẩu không chính xác";
            code = 400;
        }else{
            message = jwtProvider.getMessValidateToken();
            code = 401;
        }
        Map<String, Object> responseMap = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        response.setStatus(code);
        responseMap.put("errorStatus", true);
        responseMap.put("message", message);
        response.setHeader("content-type", "application/json");
        response.setCharacterEncoding("utf-8");
        String responseMsg = mapper.writeValueAsString(responseMap);
        response.getWriter().write(responseMsg);
    }
}

