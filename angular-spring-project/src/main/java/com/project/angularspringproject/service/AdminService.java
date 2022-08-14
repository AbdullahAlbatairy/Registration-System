package com.project.angularspringproject.service;

import java.util.List;

import com.project.angularspringproject.entity.Admin;

public interface AdminService {
	public List<Admin> findAll();

	public Admin findById(int id);

	public void save(Admin admin);
	
	public void deleteById(int id);

}
