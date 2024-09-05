package com.mystore.app.controller;

public class OrderRequest {
    private String cartItems;
    private String name;
    private String address;
    private String pincode;
    private String mobile;

 
    private String paymentMethod;
    

    // Getters and Setters

    public String getCartItems() {
        return cartItems;
    }

    public void setCartItems(String cartItems) {
        this.cartItems = cartItems;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
