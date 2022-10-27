package com.example.demo.service.user.impl;


import com.example.demo.model.user.AppUser;
import com.example.demo.repository.user_repo.IUserRepository;
import com.example.demo.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    /**
     * Create by HoangHN
     * Date create: 10/8/2022
     * function: findByUsername
     *
     * @param name
     * @return
     */
    @Override
    public Optional<AppUser> findByUsername(String name) {
        return userRepository.findByUsername(name);
    }

    /**
     * Create by HaoNH
     * Date create: 11/09/2022
     * method check username is exits
     *
     * @param username
     * @return
     */
    @Override
    public Boolean existsByUsername(String username) {
        if (userRepository.existsByUsername(username) == null) {
            return false;
        }
        return username.toLowerCase().equals(userRepository.existsByUsername(username).toLowerCase());
    }

    /**
     * Create by HaoNH
     * Date create: 11/09/2022
     * method create user
     *
     * @param username
     * @param password
     */
    @Override
    public void createUser(String username, String password) {
        userRepository.createUser(username, password);
    }
}
