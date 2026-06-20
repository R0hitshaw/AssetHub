package com.asset.tracker.it_asset_management.controller;


import com.asset.tracker.it_asset_management.dto.request.LoginRequest;
import com.asset.tracker.it_asset_management.dto.response.ApiResponse;
import com.asset.tracker.it_asset_management.dto.response.LoginResponse;
import com.asset.tracker.it_asset_management.security.CustomUserDetailsService;
import com.asset.tracker.it_asset_management.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest loginRequest)
    {

            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));

            var userdetails = customUserDetailsService.loadUserByUsername(loginRequest.getUsername());
            String token = jwtUtil.generateToken(userdetails);

            return ResponseEntity.ok(ApiResponse.success(new LoginResponse(token)));



    }

}
