package com.project.angularspringproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.angularspringproject.dao.StudentDAO;
import com.project.angularspringproject.entity.Course;
import com.project.angularspringproject.entity.Student;

@Service
public class StudentServiceImpl implements StudentService {

	private StudentDAO studentDAO;
	
	private PasswordEncoder passwordEncoder;

	@Autowired
	public StudentServiceImpl(StudentDAO studentDAO) {
		super();
		this.studentDAO = studentDAO;
		this.passwordEncoder = new BCryptPasswordEncoder();
	}
	

	@Override
	@Transactional
	public List<Student> findAll() {
		return studentDAO.findAll();
	}
	
	@Override
	@Transactional
	public List<Course> findAllCoursesRegistered(int studentId) {
		return this.studentDAO.findAllCoursesRegistered(studentId);
	}
	
	@Override
	public List<Course> findAllCoursesAvailable(int studentId) {
		return this.studentDAO.findAllCoursesAvailable(studentId);

	}

	@Override
	@Transactional
	public Student findById(int id) {
		return studentDAO.findById(id);
	}

	@Override
	@Transactional
	public void save(Student student) {
		String encodedPassword = this.passwordEncoder.encode(student.getPassword());
		student.setPassword(encodedPassword);
		studentDAO.save(student);

	}
	
	@Override
	@Transactional
	public void update(Student student) {
		studentDAO.save(student);		
	}
	
	@Override
	@Transactional
	public void saveCourseToStudnet(int studentId, Course course) {
		studentDAO.saveCourseToStudnet(studentId,course);

	}

	@Override
	@Transactional
	public void deleteById(int id) {
		studentDAO.deleteById(id);
	}


	

	

	

	

}
