package com.example.demo.repository;

import com.example.demo.model.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query(value = "SELECT * FROM customer WHERE user_name = :username", nativeQuery = true)
    Optional<Customer> findCustomerByUserName(@Param("username") String username);
}
