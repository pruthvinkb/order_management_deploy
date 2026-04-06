package com.shop.orderSystem.controller;

import com.shop.orderSystem.model.Product;
import com.shop.orderSystem.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.lang.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController//this tell spring this class handles controlesler request
@RequestMapping("/products")
public class ProductController {
    @Autowired
    ProductRepository productRepository;

    @PostMapping
    public Product addProduct(@NonNull @Valid @RequestBody Product product) {
    //       if (!authController.isLoggedIn()) {
    //     throw new RuntimeException("Unauthorized: Please login first");
    // }
        return productRepository.save(product);
    }
    @GetMapping
    public List<Product> getAllProducts() {
        // if (!authController.isLoggedIn()) {
        //     throw new RuntimeException("Unauthorized: Please login first");
        // }
        return productRepository.findAll();
    }
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable long id,
         @RequestBody Product updatedProduct) {
        // if(!authController.isLoggedIn()) {
        //     throw new RuntimeException("Unauthorized: Please login first");
        // }
        Product existing = productRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found"));
        existing.setName(updatedProduct.getName());
       existing.setImageUrl(updatedProduct.getImageUrl());
       existing.setPrice(updatedProduct.getPrice());
       return productRepository.save(existing);
}



}
