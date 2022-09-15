package com.example.demo.repository;

import com.example.demo.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query(value = "SELECT * FROM product WHERE category_id = :category AND name LIKE :name AND is_deleted = 0 ORDER BY price ASC, id DESC LIMIT :limit", nativeQuery = true)
    List<Product> productListPriceAsc(@Param("category") Integer category,
                              @Param("name") String name,
                              @Param("limit") Integer limit);

    @Query(value = "SELECT * FROM product WHERE category_id = :category AND name LIKE :name AND is_deleted = 0 ORDER BY price DESC, id DESC LIMIT :limit", nativeQuery = true)
    List<Product> productListPriceDesc(@Param("category") Integer category,
                              @Param("name") String name,
                              @Param("limit") Integer limit);

    @Query(value = "SELECT * FROM product WHERE category_id = :category AND name LIKE :name AND is_deleted = 0 ORDER BY id DESC LIMIT :limit", nativeQuery = true)
    List<Product> productList(@Param("category") Integer category,
                              @Param("name") String name,
                              @Param("limit") Integer limit);
}
