package com.mystore.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mystore.app.models.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    // JpaRepository provides standard CRUD operations, so no additional methods are required
}
