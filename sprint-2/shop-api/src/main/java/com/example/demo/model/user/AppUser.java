package com.example.demo.model.user;

import com.example.demo.model.customer.Customer;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user")
public class AppUser {
    @Id
    @Column(name = "user_name")
    private String username;
    @Column(name = "user_password")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",
    joinColumns = @JoinColumn(name = "user_name"),
    inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<AppRole> appRoles;

    @OneToOne(mappedBy = "appUser")
    @JsonBackReference("customer")
    private Customer customer;

    public AppUser() {
    }

    public AppUser(String username, String password, Set<AppRole> appRoles) {
        this.username = username;
        this.password = password;
        this.appRoles = appRoles;
    }

    public Set<AppRole> getAppRoles() {
        return appRoles;
    }

    public void setAppRoles(Set<AppRole> appRoles) {
        this.appRoles = appRoles;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<AppRole> getRoles() {
        return appRoles;
    }

    public void setRoles(Set<AppRole> appRoles) {
        this.appRoles = appRoles;
    }
}
