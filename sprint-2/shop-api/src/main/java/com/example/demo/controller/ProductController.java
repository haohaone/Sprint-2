package com.example.demo.controller;

import com.example.demo.dto.ProductDto;
import com.example.demo.model.product.Product;
import com.example.demo.service.product.CategoryService;
import com.example.demo.service.product.ProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin("*")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/product/{category}/{limit}")
    public ResponseEntity<?> watchList(@PathVariable("category") Integer category,
                                       @PathVariable("limit") Integer limit,
                                       @RequestParam(name = "name", defaultValue = "") String name,
                                       @RequestParam(name = "price", defaultValue = "") String price) {
        return new ResponseEntity<>(productService.productList(category, name, price, limit * 4), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(productService.findByID(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        Product product = productService.findByID(id);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            productService.delete(product);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody ProductDto productDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            Product product = new Product();
            BeanUtils.copyProperties(productDto, product);
            productService.update(product);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @GetMapping("/categoryList")
    public ResponseEntity<?> getAllCategory() {
        return new ResponseEntity<>(categoryService.findAll(), HttpStatus.OK);
    }

    @PatchMapping("")
    public ResponseEntity<?> updateProduct(@RequestBody ProductDto productDto, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Product product = new Product();
        BeanUtils.copyProperties(productDto, product);
        productService.update(product);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> addNew(@RequestBody ProductDto productDto, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Product product = new Product();
        BeanUtils.copyProperties(productDto, product);
        productService.update(product);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
