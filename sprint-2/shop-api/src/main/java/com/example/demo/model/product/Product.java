package com.example.demo.model.product;

import com.example.demo.model.category.Category;
import com.example.demo.model.order.Order;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.List;
import javax.persistence.*;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "is_deleted", columnDefinition = "BIT(1)")
    private Integer isDelete;
    @Column(name = "name")
    private String name;
    @Column(name = "battery")
    private String battery;
    @Column(name = "bluetooth", columnDefinition = "BIT(1)")
    private Integer bluetooth;
    @Column(name = "callable", columnDefinition = "BIT(1)")
    private Integer callable;
    @Column(name = "country_of_origin")
    private String countryOfOrigin;
    @Column(name = "color")
    private String color;
    @Column(name = "price")
    private Double price;
    private String url;
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @OneToMany(mappedBy = "product")
    @JsonBackReference("product")
    private List<Order> orderList;


    public Product(){
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public List<Order> getOrderList() {
        return orderList;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setOrderList(List<Order> orderList) {
        this.orderList = orderList;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Integer isDelete) {
        this.isDelete = isDelete;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBattery() {
        return battery;
    }

    public void setBattery(String battery) {
        this.battery = battery;
    }

    public Integer getBluetooth() {
        return bluetooth;
    }

    public void setBluetooth(Integer bluetooth) {
        this.bluetooth = bluetooth;
    }

    public Integer getCallable() {
        return callable;
    }

    public void setCallable(Integer callable) {
        this.callable = callable;
    }

    public String getCountryOfOrigin() {
        return countryOfOrigin;
    }

    public void setCountryOfOrigin(String countryOfOrigin) {
        this.countryOfOrigin = countryOfOrigin;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
