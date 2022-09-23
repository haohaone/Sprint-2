package com.example.demo.repository;

import com.example.demo.model.transaction.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface TransactionRepository extends CrudRepository<Transaction, Integer> {
    @Query(value="SELECT * FROM transaction ORDER BY id DESC LIMIT 1", nativeQuery =true)
    Transaction getLastTransaction();

    @Query(value="SELECT * FROM transaction WHERE customer_id = :id ORDER BY start_date DESC", nativeQuery =true)
    Page<Transaction> getTransactionByCustomerId(Pageable p, @Param("id") Integer id);
}
