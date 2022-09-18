package com.example.demo.service.order.imp;

import com.example.demo.dto.ProductDto;
import com.example.demo.model.order.Order;
import com.example.demo.model.product.Product;
import com.example.demo.model.transaction.Transaction;
import com.example.demo.repository.OderRepository;
import com.example.demo.service.MailService;
import com.example.demo.service.ThymeleafService;
import com.example.demo.service.order.IOrderService;
import com.example.demo.service.product.ProductService;
import com.example.demo.service.transaction.ITransactionService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class OrderService implements IOrderService {
    @Autowired
    private OderRepository oderRepository;
    @Autowired
    private ITransactionService transactionService;
    @Autowired
    private ProductService productService;
    @Autowired
    private MailService mailService;
    @Autowired
    private ThymeleafService thymeleafService;

    @Override
    public void saveProductInCustomer(List<ProductDto> productDtoList) {
        Transaction transaction = transactionService.getLastTransaction();
        Order order;
        for (int i = 0; i < productDtoList.size(); i++) {
            ProductDto productDto = productDtoList.get(i);
            Product product = new Product();
            BeanUtils.copyProperties(productDto, product);
            product.setQuantity(product.getQuantity() - productDto.getQuantityOrder());
            productService.update(product);
            order = new Order(productDto.getQuantityOrder(), transaction, product);
            oderRepository.save(order);
        }
        mailService.sendMail("daihoanhao@gmail.com", transaction, productDtoList);
    }
}
