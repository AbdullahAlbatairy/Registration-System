package com.project.angularspringproject.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.angularspringproject.dao.AdminDAO;
import com.project.angularspringproject.entity.Admin;
import com.project.angularspringproject.service.AdminService;

@RestController
@RequestMapping("/home")
public class AdminRestController {

	private AdminService adminService;

	@Autowired
	public AdminRestController(AdminService adminService) {
		super();
		this.adminService = adminService;
	}

	@GetMapping("/admins")
	public List<Admin> findAll() {
		return adminService.findAll();
	}

}
