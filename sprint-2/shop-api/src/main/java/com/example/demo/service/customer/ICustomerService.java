package com.example.demo.service.customer;

import com.example.demo.model.customer.Customer;

import java.util.Optional;

public interface ICustomerService {
    Optional<Customer> findCustomerByUserName(String username);
}
