package com.example.demo.service.order;

import com.example.demo.dto.ProductDto;

import java.util.List;

public interface IOrderService {
    void saveProductInCustomer(List<ProductDto> productList);
}
