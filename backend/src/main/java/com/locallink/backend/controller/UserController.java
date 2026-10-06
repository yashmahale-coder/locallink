package com.locallink.backend.controller;

import com.locallink.backend.dto.LoginRequest;
import com.locallink.backend.dto.LoginResponse;
import com.locallink.backend.dto.UserResponse;
import com.locallink.backend.entity.User;
import com.locallink.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponse registerUser(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        return new UserResponse(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {

        Optional<User> user = userService.loginUser(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        if (user.isPresent()) {
            return ResponseEntity.ok(new LoginResponse(user.get()));
        }

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Invalid email or password");
    }
}