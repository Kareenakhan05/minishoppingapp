package com.mystore.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mystore.app.models.Order;
import com.mystore.app.repository.OrderRepository;

@Controller
@RequestMapping("/api/orders")
public class PlaceOrderController {

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/place_order")
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest orderRequest) {

         // Validate payment method
         
        try {
            Order order = new Order();
            order.setCartItems(orderRequest.getCartItems());
            order.setName(orderRequest.getName());
            order.setAddress(orderRequest.getAddress());
            order.setPincode(orderRequest.getPincode());
            order.setMobile(orderRequest.getMobile());
            order.setPaymentMethod(orderRequest.getPaymentMethod());
            orderRepository.save(order);

            return ResponseEntity.ok().body(new ResponseMessage("Order placed successfully!"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new ResponseMessage("Failed to place order."+ e.getMessage()));
        }
    }

    @GetMapping("/confirmation")
    public String showConfirmationPage() {
        return "confirmation"; // Maps to src/main/resources/templates/confirmation.html
    }
}
