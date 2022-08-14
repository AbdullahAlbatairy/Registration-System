package com.project.angularspringproject.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.angularspringproject.dao.UserDAO;
import com.project.angularspringproject.dto.AdminDTO;
import com.project.angularspringproject.dto.InstructorDTO;
import com.project.angularspringproject.dto.StudentDTO;
import com.project.angularspringproject.dto.UserDTO;
import com.project.angularspringproject.entity.Admin;
import com.project.angularspringproject.entity.Instructor;
import com.project.angularspringproject.entity.Student;
import com.project.angularspringproject.entity.User;
import com.project.angularspringproject.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserRestController {

	private UserService userService;

	@Autowired
	public UserRestController(UserService userService) {
		super();
		this.userService = userService;
	}

	@GetMapping("/users-list")
	public List<User> findAll() {
		return userService.findAll();
	}

	@GetMapping("/login")
	public UserDTO findUser(@RequestParam(name = "email") String email,
			@RequestParam(name = "password") String password) {

		User user = this.userService.findUser(email, password);

		Admin admin;
		Instructor instructor;
		Student student;

		// UserDTO userDTO = null;
		StudentDTO studentDTO;
		InstructorDTO instructorDTO;
		AdminDTO adminDTO;

		if (user.getClass().getSimpleName().equals("Admin")) {
			admin = (Admin) user;
			adminDTO = new AdminDTO(admin, 1);
			return adminDTO;

		} else if (user.getClass().getSimpleName().equals("Instructor")) {
			instructor = (Instructor) user;
			instructorDTO = new InstructorDTO(instructor, instructor.getCourses(), 2);
			return instructorDTO;

		} else if (user.getClass().getSimpleName().equals("Student")) {
			student = (Student) user;
			studentDTO = new StudentDTO(student, student.getCourses(), 3);
			return studentDTO;
		} else {
			user = new User();
			return new UserDTO(user, 4);
		}

	}

}
