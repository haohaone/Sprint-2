package com.example.demo.service.customer;

import com.example.demo.dto.CustomerDto;
import com.example.demo.model.customer.Customer;

import java.util.Optional;

public interface ICustomerService {
    Optional<Customer> findCustomerByUserName(String username);
    void addNewByFb(Customer customer);
    void addNew(CustomerDto customerDto);
}
