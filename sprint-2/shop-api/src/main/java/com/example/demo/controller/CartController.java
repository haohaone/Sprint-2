package com.example.demo.controller;

import com.example.demo.dto.CartDto;
import com.example.demo.dto.ProductDto;
import com.example.demo.model.product.Product;
import com.example.demo.service.product.ProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
public class CartController {
    @Autowired
    private ProductService productService;

    @PostMapping("/cart")
    public ResponseEntity<?> watchList(@RequestBody List<CartDto> storageList){
        List<ProductDto> cartList = new ArrayList<>();
        Product product;
        CartDto cartDto;
        for (int i = 0; i < storageList.size(); i++) {
            cartDto = storageList.get(i);
            product = productService.findByID(cartDto.getKey());
            ProductDto productDto = new ProductDto();
            BeanUtils.copyProperties(product, productDto);
            productDto.setQuantityOrder(cartDto.getValue());
            cartList.add(productDto);
        }
        return new ResponseEntity<>(cartList, HttpStatus.OK);
    }
}
