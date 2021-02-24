package com.devsuperior.dscatalog.tests.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.services.ProductService;
import com.devsuperior.dscatalog.services.exceptions.DatabaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;
import com.devsuperior.dscatalog.tests.factory.ProductFactory;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {
	@InjectMocks
	private ProductService service;
	@Mock
	private ProductRepository repository;
	@Mock
	private CategoryRepository categoryRepository;
	
	private Long existingId;
	private Long nonExistingId;
	private Long dependentId;
	private Product product;
	private ProductDTO productDTO;
	private PageImpl<Product> page;
	private Category category;
	
	
	@BeforeEach
	void setup() throws Exception{
		existingId=1L;
		nonExistingId=-1L;
		dependentId=2L;
		product = ProductFactory.createproduct();
		productDTO = ProductFactory.createproductDTO();
		page= new PageImpl<>(List.of(product));
		
		Mockito.doNothing().when(repository).deleteById(existingId);
		Mockito.doThrow(ResourceNotFoundException.class).when(repository).deleteById(nonExistingId);
		Mockito.doThrow(DatabaseException.class).when(repository).deleteById(dependentId);
		
		Mockito.when(repository.getOne(existingId)).thenReturn(product);
		Mockito.doThrow(EntityNotFoundException.class).when(repository).getOne(nonExistingId);
		
		Mockito.when(categoryRepository.getOne(ArgumentMatchers.any())).thenReturn(category);
		
		Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(product));
		Mockito.when(repository.findById(nonExistingId)).thenReturn(Optional.empty());
		
		Mockito.when(repository.find(ArgumentMatchers.any(),ArgumentMatchers.anyString(), ArgumentMatchers.any())).thenReturn(page);
		
		Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(product);
		
	}
	@Test
	public void findAllPagedShouldReturnPage() {
		PageRequest pageRequest = PageRequest.of(0, 10);
		Page<ProductDTO> result =	service.findAllPaged(0L, "", pageRequest);
		Assertions.assertNotNull(result);
		Assertions.assertFalse(result.isEmpty());
		Mockito.verify(repository).find(null, "",pageRequest);
	}
	@Test
	public void updateShouldIdExists() {
		ProductDTO result  = service.update(existingId,productDTO);
		Assertions.assertNotNull(result);
		Mockito.verify(repository).save(product);
	}
	@Test
	public void updateShouldIdNonExists() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.update(nonExistingId,productDTO);
		});
		
	}
	
	@Test
	public void findByIdShouldIdExists() {
		ProductDTO product = service.findById(existingId);
		Assertions.assertNotNull(product);
		Mockito.verify(repository).findById(existingId);
	}
	@Test
	public void findByIdShouldIdNonExists() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.findById(nonExistingId);
		});
		Mockito.verify(repository).findById(nonExistingId);
	}
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		Assertions.assertDoesNotThrow(() -> {
			service.delete(existingId);
		});
		Mockito.verify(repository).deleteById(existingId);
	}
	@Test
	public void deleteShouldDoNothingWhenIdNonExists() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});
		Mockito.verify(repository).deleteById(nonExistingId);
	}
	@Test
	public void deleteShouldDoNothingWhenIdDependent() {
		Assertions.assertThrows(DatabaseException.class, () -> {
			service.delete(dependentId);
		});
		Mockito.verify(repository).deleteById(dependentId);
	}
	
	
	
	
}
