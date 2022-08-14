package com.project.angularspringproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.angularspringproject.dao.InstructorDAO;
import com.project.angularspringproject.entity.Course;
import com.project.angularspringproject.entity.Instructor;
import com.project.angularspringproject.entity.Student;

@Service
public class InstructorServiceImpl implements InstructorService {

	private InstructorDAO instructorDAO;
	
	private PasswordEncoder passwordEncoder;

	@Autowired
	public InstructorServiceImpl(InstructorDAO instructorDAO) {
		super();
		this.instructorDAO = instructorDAO;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}

	@Override
	@Transactional
	public List<Instructor> findAll() {
		return instructorDAO.findAll();
	}
	
	@Override
	@Transactional
	public List<Course> findAllCoursesForInstructor(int instructorId) {
		return instructorDAO.findAllCoursesForInstructor(instructorId);

	}
	
	@Override
	@Transactional
	public List<Student> findAllStudentForCourseForInstructor(int courseId) {
		return instructorDAO.findAllStudentForCourseForInstructor(courseId);

	}

	@Override
	@Transactional
	public Instructor findById(int id) {
		return instructorDAO.findById(id);
	}

	@Override
	@Transactional
	public void save(Instructor instructor) {
		String encodedPassword = this.passwordEncoder.encode(instructor.getPassword());
		instructor.setPassword(encodedPassword);
		instructorDAO.save(instructor);

	}

	@Override
	@Transactional
	public void deleteById(int id) {
		instructorDAO.deleteById(id);
	}

	

}
