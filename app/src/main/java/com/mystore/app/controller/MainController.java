package com.mystore.app.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mystore.app.models.Order;
import com.mystore.app.repository.OrderRepository;

@Controller
@RequestMapping("/")
public class MainController {

    @Autowired
    private OrderRepository orderRepository;

    // Existing mappings for the different sections of the store

    @GetMapping("/index")
    public String home() {
        return "index"; // Maps to src/main/resources/templates/index.html
    }

    @GetMapping("/women")
    public String women() {
        return "women"; // Maps to src/main/resources/templates/women.html
    }

    @GetMapping("/men")
    public String men() {
        return "men"; // Maps to src/main/resources/templates/men.html
    }

    @GetMapping("/kids")
    public String kids() {
        return "kids"; // Maps to src/main/resources/templates/kids.html
    }

    @GetMapping("/jewellery")
    public String jewellery() {
        return "jewellery"; // Maps to src/main/resources/templates/jewellery.html
    }

    @GetMapping("/stationary")
    public String stationary() {
        return "stationary"; // Maps to src/main/resources/templates/stationary.html
    }

    // New method for handling the order placement
    @PostMapping("/place_order")
    public String placeOrder(@RequestBody Order order, Model model) {
        // Save the order to the database
        orderRepository.save(order);

        // Add success message to the model to be shown on the front-end
        model.addAttribute("message", "Order placed successfully!");

        // Redirect to a confirmation page (or redirect back to index if needed)
        return "confirmation_order"; // Maps to src/main/resources/templates/order_confirmation.html
    }
}