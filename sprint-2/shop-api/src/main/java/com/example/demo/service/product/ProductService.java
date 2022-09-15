package com.example.demo.service.product;

import com.example.demo.model.product.Product;


import java.util.List;


public interface ProductService {
    List<Product> productList(Integer category, String name, String price, Integer limit);
    Product findByID(Integer id);
    void delete(Product product);
    void update(Product product);
}
