package com.ssafy.readly.interceptor;

import com.ssafy.readly.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@RequiredArgsConstructor
@Component
public class JwtInterceptor implements HandlerInterceptor {

    private final JWTUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if(request.getMethod().equals("OPTIONS")) {
            return true;
        }

        String accessToken = request.getHeader("Authorization");
        if(accessToken != null && jwtUtil.checkToken(accessToken)) {
            int memberId = jwtUtil.getMemberId(accessToken);
            request.setAttribute("memberId", memberId);
            return true;
        }  else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("토큰이 유효하지 않습니다.");
            return false;
        }
    }
}
