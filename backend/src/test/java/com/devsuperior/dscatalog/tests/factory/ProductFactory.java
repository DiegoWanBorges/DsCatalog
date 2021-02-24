package com.devsuperior.dscatalog.tests.factory;

import java.time.Instant;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;

public class ProductFactory {
	
	public static Product createproduct() {
		Product product = new Product(1L, "SmarthPhone", "New Smartphone, best price ", 150.0, "https://cell.com/new.png", Instant.parse("2021-02-23T03:00:00Z"));
		product.getCategories().add(new Category(1L, "Teste"));
		return product;
	}
	
	public static ProductDTO createproductDTO() {
		Product product = createproduct();
		return new ProductDTO(product,product.getCategories());
	}
	public static ProductDTO createproductDTO(Long id) {
		ProductDTO product = createproductDTO();
		product.setId(id);
		return product;
	}
	
}	
