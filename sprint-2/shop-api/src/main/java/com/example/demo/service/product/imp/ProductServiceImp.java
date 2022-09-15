package com.example.demo.service.product.imp;

import com.example.demo.model.product.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImp implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> productList(Integer category, String name, String price, Integer limit) {
        if (price.equals("ASC")){
            return productRepository.productListPriceAsc(category, "%" + name + "%", limit);
        }else if (price.equals("DESC")){
            return productRepository.productListPriceDesc(category, "%" + name + "%", limit);
        }else {
            return productRepository.productList(category, "%" + name + "%", limit);
        }
    }

    @Override
    public Product findByID(Integer id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(Product product) {
        product.setIsDelete(1);
        productRepository.save(product);
    }

    @Override
    public void update(Product product) {
        productRepository.save(product);
    }
}
