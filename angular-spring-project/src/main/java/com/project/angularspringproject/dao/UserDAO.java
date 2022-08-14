package com.project.angularspringproject.dao;

import java.util.List;

import com.project.angularspringproject.entity.Admin;
import com.project.angularspringproject.entity.Instructor;
import com.project.angularspringproject.entity.Student;
import com.project.angularspringproject.entity.User;

public interface UserDAO{
	public List<User> findAll();
	
	public User findById(int id);
	
	public void deleteById(int id);

	public User findUser(String email, String password);


	
}
