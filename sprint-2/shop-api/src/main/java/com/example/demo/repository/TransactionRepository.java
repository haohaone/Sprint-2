package com.example.demo.repository;

import com.example.demo.model.transaction.Transaction;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface TransactionRepository extends CrudRepository<Transaction, Integer> {
    @Query(value="SELECT * FROM transaction ORDER BY id DESC LIMIT 1", nativeQuery =true)
    Transaction getLastTransaction();
}
