package com.project.angularspringproject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.angularspringproject.dao.UserDAO;

import com.project.angularspringproject.entity.User;

@Service
public class UserServiceImpl implements UserService {

	private UserDAO userDAO;
	private PasswordEncoder passwordEncoder;

	@Autowired
	public UserServiceImpl(UserDAO userDAO) {
		super();
		this.userDAO = userDAO;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}

	@Override
	@Transactional
	public List<User> findAll() {
		return userDAO.findAll();
	}

	@Override
	@Transactional
	public Optional<User> findById(int id) {
		return userDAO.findById(id);
	}

	@Override
	@Transactional
	public User findUser(String email, String password) {

		User user = this.userDAO.findUser(email);

		boolean isPasswordMatched = passwordEncoder.matches(password, user.getPassword());
		if (isPasswordMatched) {
			return user;
		} else {
			return new User();
		}
	}

	@Override
	@Transactional
	public void deleteById(int id) {
		userDAO.deleteById(id);
	}

}
