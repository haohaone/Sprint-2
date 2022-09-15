package com.example.demo.service.user.impl;

import com.example.demo.model.user.AppRole;
import com.example.demo.model.user.UserRole;
import com.example.demo.repository.user_repo.IRoleRepository;
import com.example.demo.service.user.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl implements IRoleService {
    @Autowired
    private IRoleRepository roleRepository;

    /**
     * Create by HoangHN
     * Date create: 10/08/2022
     * function: find by name
     *
     * @param name
     * @return
     */
    @Override
    public Optional<AppRole> findByName(UserRole name) {
        return roleRepository.findByName(name);
    }


    /**
     * Create by HaoNH
     * Date create: 11/08/2022
     * method update role of user
     *
     * @param username
     * @return
     */
    @Override
    public void addNewCustomerUserRole(String username) {
        roleRepository.addNewUserRole(username, 3);
    }

    /**
     * create by TrungND
     * date create: 11/08/22
     * function: update User
     */
    @Override
    public void addNewEmployeeUserRole(String username) {
        roleRepository.addNewUserRole(username, 2);
    }
}
