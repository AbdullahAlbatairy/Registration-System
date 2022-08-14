package com.project.angularspringproject.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.project.angularspringproject.entity.Admin;
import com.project.angularspringproject.entity.Student;
import com.project.angularspringproject.entity.User;


public interface AdminDAO {
	public List<Admin> findAll();

	public Admin findById(int id);

	public void save(Admin admin);
	
	public void deleteById(int id);

}
