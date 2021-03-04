package com.devsuperior.dscatalog.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devsuperior.dscatalog.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	/*@Query(" SELECT obj User obj "
		+  " WHERE ( LOWER(obj.firstName) LIKE LOWER(CONCAT('%',:firstName,'%')) )")
		Page<User> find(String firstName,Pageable pageable);
	*/
	
	Page<User> findByFirstNameLikeIgnoreCase(String firstName,Pageable pageable);
	User findByEmail(String email);
	
	
	
}
