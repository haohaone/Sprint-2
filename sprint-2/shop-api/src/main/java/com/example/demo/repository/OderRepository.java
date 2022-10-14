package com.example.demo.repository;

import com.example.demo.dto.StatisticDto;
import com.example.demo.model.order.Order;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface OderRepository extends CrudRepository<Order, Integer> {
    @Query(value="SELECT SUM(om.quantity) as quantity, p.name, t.start_date FROM order_mart as om\n" +
            "JOIN `transaction` as t ON om.transaction_id = t.id\n" +
            "JOIN product as p ON p.id = om.product_id\n" +
            "GROUP BY om.product_id HAVING t.start_date >= current_date - interval 1 year ORDER BY quantity desc LIMIT 10;", nativeQuery = true)
    List<StatisticDto> getStatisticByYear();

    @Query(value="SELECT SUM(om.quantity) as quantity, p.name, t.start_date FROM order_mart as om\n" +
            "JOIN `transaction` as t ON om.transaction_id = t.id\n" +
            "JOIN product as p ON p.id = om.product_id\n" +
            "GROUP BY om.product_id HAVING t.start_date >= current_date - interval 1 month ORDER BY quantity desc LIMIT 10;", nativeQuery = true)
    List<StatisticDto> getStatisticByMonth();

    @Query(value="SELECT SUM(om.quantity) as quantity, p.name, t.start_date FROM order_mart as om\n" +
            "JOIN `transaction` as t ON om.transaction_id = t.id\n" +
            "JOIN product as p ON p.id = om.product_id\n" +
            "GROUP BY om.product_id HAVING t.start_date >= current_date - interval 7 day ORDER BY quantity desc LIMIT 10;", nativeQuery = true)
    List<StatisticDto> getStatisticByWeek();
}
