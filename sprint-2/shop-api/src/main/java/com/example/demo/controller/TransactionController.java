package com.example.demo.controller;

import com.example.demo.dto.ProductDto;
import com.example.demo.dto.TransactionDto;
import com.example.demo.model.customer.Customer;
import com.example.demo.model.transaction.Transaction;
import com.example.demo.service.customer.ICustomerService;
import com.example.demo.service.order.IOrderService;
import com.example.demo.service.transaction.ITransactionService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin("*")
public class TransactionController {
    @Autowired
    private ITransactionService iTransactionService;
    @Autowired
    private IOrderService iOrderService;
    @Autowired
    private ICustomerService customerService;

    @PostMapping("/transaction")
    private ResponseEntity<?> saveTransaction(@RequestBody TransactionDto transactionDto){
        Transaction transaction = new Transaction();
        BeanUtils.copyProperties(transactionDto, transaction);
        LocalDateTime localDateTime = LocalDateTime.now();
        transaction.setStartDate(localDateTime.toString());
        Customer customer = customerService.findCustomerByUserName(transactionDto.getUsername()).get();
        transaction.setCustomer(customer);
        iTransactionService.save(transaction);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get-transaction")
    private ResponseEntity<?> getTransaction(@RequestParam(defaultValue = "0", name = "page") Integer page,
                                             @RequestParam Integer id){
        return new ResponseEntity<>(
                iTransactionService.getTransactionByCustomerId(PageRequest.of(page, 5), id),
                HttpStatus.OK
        );
    }

    @PostMapping("/order")
    private ResponseEntity<?> addProductToOrder(@RequestBody List<ProductDto> productDtoList){
        iOrderService.saveProductInCustomer(productDtoList);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
