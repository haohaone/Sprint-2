package com.example.demo.security.userprincal;

import com.example.demo.model.user.AppUser;
import com.example.demo.repository.user_repo.IUserRepository;
import com.example.demo.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserDetail implements UserDetailsService {
    @Autowired
    IUserRepository userRepository;
    @Autowired
    IUserService userService;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return UserPrinciple.build(appUser);
    }
}
