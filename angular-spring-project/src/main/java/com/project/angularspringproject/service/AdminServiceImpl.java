package com.project.angularspringproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.angularspringproject.dao.AdminDAO;
import com.project.angularspringproject.entity.Admin;

@Service
public class AdminServiceImpl implements AdminService {
	
	private AdminDAO adminDao;
	
	
	@Autowired
	public AdminServiceImpl(AdminDAO adminDao) {
		super();
		this.adminDao = adminDao;
	}

	@Override
	@Transactional
	public List<Admin> findAll() {
		return adminDao.findAll();
	}

	@Override
	@Transactional
	public Admin findById(int id) {
	
		return adminDao.findById(id);
	}

	@Override
	@Transactional
	public void save(Admin admin) {
		adminDao.save(admin);

	}

	@Override
	@Transactional
	public void deleteById(int id) {
		adminDao.deleteById(id);
	}

}
