package com.devsuperior.dscatalog.tests.factory;

import java.time.Instant;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Product;

public class ProductFactory {
	
	public static Product createproduct() {
		return new Product(1L, "SmarthPhone", "New Smartphone, best price ", 150.0, "https://cell.com/new.png", Instant.parse("2021-02-23T03:00:00Z"));
	}
	
	public static ProductDTO createproductDTO() {
		return new ProductDTO(createproduct());
	}
	
}	
