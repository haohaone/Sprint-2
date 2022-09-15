package com.example.demo.repository.user_repo;

import com.example.demo.model.user.AppRole;
import com.example.demo.model.user.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;


@Repository
@Transactional
public interface IRoleRepository extends JpaRepository<AppRole, Integer> {
    @Query(value = "SELECT id, name FROM role WHERE name = :name", nativeQuery = true)
    Optional<AppRole> findByName(UserRole name);

    @Modifying
    @Query(value = "INSERT INTO user_role (user_name,role_id) VALUES (:username, :role)",
            nativeQuery = true)
    void addNewUserRole(@Param("username") String username,
                        @Param("role") Integer roleId);
}
