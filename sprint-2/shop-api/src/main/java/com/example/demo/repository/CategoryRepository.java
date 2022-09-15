package com.example.demo.repository;

import com.example.demo.model.category.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Integer> {
}
