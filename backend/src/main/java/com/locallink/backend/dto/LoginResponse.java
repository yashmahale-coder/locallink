package com.locallink.backend.dto;

import com.locallink.backend.entity.User;

public class LoginResponse {

    private String message;
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;

    public LoginResponse(User user) {
        this.message = "Login successful";
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.role = user.getRole();
    }

    public String getMessage() {
        return message;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getRole() {
        return role;
    }
}