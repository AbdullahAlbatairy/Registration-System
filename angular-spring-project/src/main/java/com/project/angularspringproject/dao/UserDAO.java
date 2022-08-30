package com.project.angularspringproject.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.angularspringproject.entity.User;

@Repository
public interface UserDAO extends JpaRepository<User, Integer>{
	
	@Query("from User where email =:email")
	public User findUser(@Param("email") String email);
	
	


	
}
