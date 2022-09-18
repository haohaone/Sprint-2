package com.example.demo.service.transaction.imp;

import com.example.demo.model.transaction.Transaction;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.service.transaction.ITransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService implements ITransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public void save(Transaction transaction) {
        transactionRepository.save(transaction);
    }

    @Override
    public Transaction getLastTransaction() {
        return transactionRepository.getLastTransaction();
    }


}
