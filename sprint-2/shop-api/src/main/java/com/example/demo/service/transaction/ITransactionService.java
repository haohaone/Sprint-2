package com.example.demo.service.transaction;

import com.example.demo.model.transaction.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

public interface ITransactionService {
    void save(Transaction transaction);

    Transaction getLastTransaction();

    Page<Transaction> getTransactionByCustomerId(Pageable p, Integer id);
}
