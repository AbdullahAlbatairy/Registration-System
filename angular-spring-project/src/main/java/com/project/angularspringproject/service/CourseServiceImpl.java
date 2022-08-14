package com.project.angularspringproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.angularspringproject.dao.CourseDAO;
import com.project.angularspringproject.entity.Course;
import com.project.angularspringproject.entity.Instructor;
import com.project.angularspringproject.entity.Student;


@Service
public class CourseServiceImpl implements CourseService {
	private CourseDAO courseDAO;

	@Autowired
	public CourseServiceImpl(CourseDAO courseDAO) {
		super();
		this.courseDAO = courseDAO;
	}

	@Override
	@Transactional
	public List<Course> findAll() {
		return courseDAO.findAll();
	}
	
	@Override
	@Transactional
	public List<Instructor> findAllInstructorsAvailable(int courseId) {
		
		return courseDAO.findAllInstructorsAvailable(courseId);
	}
	
	@Override
	@Transactional
	public List<Student> findAllStudentsAvailable(int courseId) {
		return courseDAO.findAllStudentsAvailable(courseId);

	}
	
	@Override
	@Transactional
	public List<Instructor> findAllInstructorsRegistered(int courseId) {
		return courseDAO.findAllInstructorsRegistered(courseId);

	}
	
	@Override
	@Transactional
	public List<Student> findAllStudentsRegistered(int courseId) {
		return courseDAO.findAllStudentsRegistered(courseId);

	}

	@Override
	@Transactional
	public Course findById(int id) {
		return courseDAO.findById(id);
	}

	@Override
	@Transactional
	public void save(Course course) {
		courseDAO.save(course);
	}
	
	@Override
	@Transactional
	public void saveInstructorToCourse(int courseId, int instructorId) {
		courseDAO.saveInstructorToCourse(courseId, instructorId);
		
	}
	
	@Override
	@Transactional
	public void saveStudentToCourse(int courseId, int studentId) {
		courseDAO.saveStudentToCourse(courseId, studentId);
		
	}

	@Override
	@Transactional
	public void deleteById(int id) {
		courseDAO.deleteById(id);
	}

	@Override
	@Transactional
	public void deleteInstructorToCourse(int courseId, int instructorId) {
		courseDAO.deleteInstructorToCourse(courseId, instructorId);
		
	}

	@Override
	@Transactional
	public void deleteStudentFromCourse(int courseId, int studentId) {
		courseDAO.deleteStudentFromCourse(courseId, studentId);
		
	}

	

	

	

	

	

	

}
