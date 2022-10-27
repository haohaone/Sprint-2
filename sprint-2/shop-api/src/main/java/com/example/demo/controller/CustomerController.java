package com.example.demo.controller;

import com.example.demo.dto.CustomerDto;
import com.example.demo.model.customer.Customer;
import com.example.demo.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin("*")
public class CustomerController {
    @Autowired
    private ICustomerService customerService;

    @GetMapping("/user-information/{username}")
    public ResponseEntity<?> getInformation(@PathVariable("username") String username){
        return new ResponseEntity<>(customerService.findCustomerByUserName(username).get(), HttpStatus.OK);
    }

    @PostMapping("/customer")
    public ResponseEntity<?> save(@Valid @RequestBody CustomerDto customerDto, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else {
            customerService.addNew(customerDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
}
