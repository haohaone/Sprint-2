package com.example.demo.service.customer.imp;

import com.example.demo.model.customer.Customer;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private CustomerRepository customerRepository;
 
    @Override
    public Optional<Customer> findCustomerByUserName(String username) {
        return customerRepository.findCustomerByUserName(username);
    }
}
