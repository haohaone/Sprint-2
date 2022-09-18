package com.example.demo.model.order;

import com.example.demo.model.product.Product;
import com.example.demo.model.transaction.Transaction;

import javax.persistence.*;

@Entity(name = "order_mart")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "is_deleted")
    private int isDelete = 0;

    @Column(name = "quantity")
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "transaction_id", referencedColumnName = "id")
    private Transaction transactionOrder;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product productOrder;

    public Order() {
    }

    public Order(int quantity, Transaction transactionOrder, Product productOrder) {
        this.quantity = quantity;
        this.transactionOrder = transactionOrder;
        this.productOrder = productOrder;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(int isDelete) {
        this.isDelete = isDelete;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Transaction getTransactionOrder() {
        return transactionOrder;
    }

    public void setTransactionOrder(Transaction transactionOrder) {
        this.transactionOrder = transactionOrder;
    }

    public Product getProductOrder() {
        return productOrder;
    }

    public void setProductOrder(Product productOrder) {
        this.productOrder = productOrder;
    }
}
