package com.example.demo.service.transaction;

import com.example.demo.model.transaction.Transaction;

public interface ITransactionService {
    void save(Transaction transaction);

    Transaction getLastTransaction();
}
