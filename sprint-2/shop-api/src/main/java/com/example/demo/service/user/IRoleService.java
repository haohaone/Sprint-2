package com.example.demo.service.user;


import com.example.demo.model.user.AppRole;
import com.example.demo.model.user.UserRole;

import java.util.Optional;

public interface IRoleService {
    Optional<AppRole> findByName(UserRole name);

    void addNewCustomerUserRole(String username);

    void addNewEmployeeUserRole(String username);

}
