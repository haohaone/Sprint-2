package com.example.demo.controller;

import com.example.demo.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class CustomerController {
    @Autowired
    private ICustomerService customerService;

    @GetMapping("/user-information/{username}")
    public ResponseEntity<?> getInformation(@PathVariable("username") String username){
        return new ResponseEntity<>(customerService.findCustomerByUserName(username).get(), HttpStatus.OK);
    }
}
