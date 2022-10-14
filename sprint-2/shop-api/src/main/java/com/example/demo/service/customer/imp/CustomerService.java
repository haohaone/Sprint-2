package com.example.demo.service.customer.imp;

import com.example.demo.model.customer.Customer;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.service.customer.ICustomerService;
import com.example.demo.service.user.impl.RoleServiceImpl;
import com.example.demo.service.user.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    UserServiceImpl userService;
    @Autowired
    RoleServiceImpl roleService;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Optional<Customer> findCustomerByUserName(String username) {
        return customerRepository.findCustomerByUserName(username);
    }

    @Override
    public void addNew(Customer customer) {
        userService.createUser(customer.getAppUser().getUsername(), passwordEncoder.encode(customer.getAppUser().getPassword()));
        roleService.addNewCustomerUserRole(customer.getAppUser().getUsername());
        customerRepository.save(customer);
    }
}
