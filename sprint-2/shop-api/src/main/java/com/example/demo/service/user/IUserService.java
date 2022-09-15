package com.example.demo.service.user;

import com.example.demo.model.user.AppUser;

import java.util.Optional;

public interface IUserService {
    Optional<AppUser> findByUsername(String name);

    Boolean existsByUsername(String username);

    void createUser(String username, String password);
}
