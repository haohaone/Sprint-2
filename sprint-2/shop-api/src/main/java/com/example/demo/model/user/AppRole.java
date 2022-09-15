package com.example.demo.model.user;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;

/**
 * Create by HoangHN
 * Date create: 08/09/2022
 * function: AppRole
 * @param
 * @return
 */
@Entity
@Table(name = "role")
public class AppRole {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(name = "role_name", length = 60)
    private UserRole name;

    public AppRole() {
    }

    public AppRole(Integer id, UserRole name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public UserRole getName() {
        return name;
    }

    public void setName(UserRole name) {
        this.name = name;
    }
}
