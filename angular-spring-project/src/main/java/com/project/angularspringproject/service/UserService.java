package com.project.angularspringproject.service;

import java.util.List;

import com.project.angularspringproject.entity.User;

public interface UserService {
	public List<User> findAll();

	public User findById(int id);

	public void deleteById(int id);

	public User findUser(String email, String password);

}
