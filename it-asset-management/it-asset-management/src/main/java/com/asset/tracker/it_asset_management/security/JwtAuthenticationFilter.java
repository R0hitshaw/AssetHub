package com.asset.tracker.it_asset_management.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
//        System.out.println("AUTH HEADER = " + header);

        if(header!=null && header.startsWith("Bearer "))
        {
            String token = header.substring(7);
            if(SecurityContextHolder.getContext().getAuthentication()==null)
            {
                try{
                    if(jwtUtil.isTokenValid(token))
                    {
                        String username = jwtUtil.extractUsername(token);
                        var userDetails = customUserDetailsService.loadUserByUsername(username);

                        var auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }
                catch (Exception ignored)
                {

                }
            }
        }
        filterChain.doFilter(request,response);
    }
}
