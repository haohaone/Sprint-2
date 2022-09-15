package com.example.demo.repository.user_repo;

import com.example.demo.model.user.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public interface IUserRepository extends JpaRepository<AppUser, Integer> {

    @Query(value = "SELECT user_name, user_password FROM user WHERE user_name = :name", nativeQuery = true)
    Optional<AppUser> findByUsername(String name);

    @Query(value = "SELECT user_name FROM user where user_name = :username", nativeQuery = true)
    String existsByUsername(String username);

    @Modifying
    @Query(value = "INSERT INTO user (user_name, user_password) VALUES (:username, :password)",
            nativeQuery = true)
    void createUser(@Param("username") String username,
                    @Param("password") String password);
}
