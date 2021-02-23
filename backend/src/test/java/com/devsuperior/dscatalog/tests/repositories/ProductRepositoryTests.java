package com.devsuperior.dscatalog.tests.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.tests.factory.ProductFactory;


@DataJpaTest
public class ProductRepositoryTests {
	private Long existingId;
	private Long nonExistingId;
	private Long countTotalProducts;
	private Long countPCGamerProducts;
	private Long countCategoryId3;
	private Long countCategoryId1and2;
	private PageRequest pageRequest;
	
	@BeforeEach
	void setup() throws Exception{
		existingId=1L;
		nonExistingId=-1L;
		countTotalProducts =25l;
		countPCGamerProducts=21L;
		pageRequest =PageRequest.of(0, 10);
		countCategoryId3=23L;
		countCategoryId1and2=3L;
	}
	
	@Autowired
	private ProductRepository repository;
	
	@Test
	public void deleteShouldDeleteObjectWhenIdExists() {
		repository.deleteById(existingId);
		Optional<Product> result = repository.findById(existingId);
		Assertions.assertFalse(result.isPresent());
	}
	
	@Test
	public void deleteShouldThrowEmptyResultDataAccessExceptionWhenIdDoesNotExists() {
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(nonExistingId);
		});
	}
	
	@Test
	public void saveShouldPersistWithAutoIncrementWhenIdIsNull() {
		Product product = ProductFactory.createproduct();
		product.setId(null);
		product=repository.save(product);
		Optional<Product> result = repository.findById(product.getId());
		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts+1, product.getId());
	}
	
	@Test
	public void findShouldReturnProductsWhenNameExists() {
		String name ="PC Gamer";
		Page<Product> result = repository.find(null, name, pageRequest);
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts,result.getTotalElements());
	}
	@Test
	public void findShouldReturnProductsWhenNameExistsIgnoringCase() {
		String name ="pC GAmEr";
		Page<Product> result = repository.find(null, name, pageRequest);
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts,result.getTotalElements());
	}
	@Test
	public void findShouldReturnProductsWhenNameIsBlank() {
		String name ="";
		Page<Product> result = repository.find(null, name, pageRequest);
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts,result.getTotalElements());
	}
	@Test
	public void findShouldReturnProductsWhenIdCategoryIs3() {
		String name ="";
		List<Category> list = new ArrayList<>();
		list.add(new Category(3L,""));
		Page<Product> result = repository.find(list, name, pageRequest);
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countCategoryId3,result.getTotalElements());
	}
	@Test
	public void findShouldReturnProductsWhenIdCategoryIs1and2() {
		String name ="";
		List<Category> list = new ArrayList<>();
		list.add(new Category(1L,""));
		list.add(new Category(2L,""));
		Page<Product> result = repository.find(list, name, pageRequest);
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countCategoryId1and2,result.getTotalElements());
	}
	
	
	
	
}
