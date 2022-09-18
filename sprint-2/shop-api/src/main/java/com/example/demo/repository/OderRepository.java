package com.example.demo.repository;

import com.example.demo.model.order.Order;
import org.springframework.data.repository.CrudRepository;

public interface OderRepository extends CrudRepository<Order, Integer> {
}
