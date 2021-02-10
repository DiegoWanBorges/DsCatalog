package com.devsuperior.dscatalog.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.springframework.validation.annotation.Validated;

import com.devsuperior.dscatalog.entities.User;

public class UserDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	@NotBlank(message = "Campo nome obrigatorio")	
	private String firstName;
	private String lastName;
	
	@Email(message = "Formato de e-mail invalido")
	private String email;
		
	private List<RoleDTO> roles = new ArrayList<>();
	
	public UserDTO() {
		
	}

	public UserDTO(Long id, String firstName, String lastName, String email) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		
	}
	public UserDTO(User entity) {
		this.id = entity.getId();
		this.firstName = entity.getFirstName();
		this.lastName = entity.getLastName();
		this.email = entity.getEmail();
		entity.getRoles().forEach(rol -> this.roles.add(new RoleDTO(rol)));
	}
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}



	public List<RoleDTO> getRoles() {
		return roles;
	}

	

	
	
	
	
}
