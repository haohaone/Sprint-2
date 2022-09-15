package com.example.demo.service.product.imp;

import com.example.demo.model.category.Category;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.product.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryServiceImp implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        return (List<Category>) categoryRepository.findAll();
    }
}
