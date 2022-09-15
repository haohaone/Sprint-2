package com.example.demo.dto;

import com.example.demo.model.customer.Customer;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class JwtResponse {
    private Boolean errorStatus = true;
    private String message = "";
    private Customer customer;
    private String token;
    private Collection<? extends GrantedAuthority> roles;

    public JwtResponse() {
    }

    public JwtResponse(Boolean errorStatus, String message, Customer customer, String token, Collection<? extends GrantedAuthority> roles) {
        this.errorStatus = errorStatus;
        this.message = message;
        this.customer = customer;
        this.token = token;
        this.roles = roles;
    }

    public Boolean getErrorStatus() {
        return errorStatus;
    }

    public void setErrorStatus(Boolean errorStatus) {
        this.errorStatus = errorStatus;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Collection<? extends GrantedAuthority> getRoles() {
        return roles;
    }

    public void setRoles(Collection<? extends GrantedAuthority> roles) {
        this.roles = roles;
    }
}
