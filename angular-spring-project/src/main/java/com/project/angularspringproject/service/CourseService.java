package com.project.angularspringproject.service;

import java.util.List;

import com.project.angularspringproject.entity.Course;
import com.project.angularspringproject.entity.Instructor;
import com.project.angularspringproject.entity.Student;

public interface CourseService {
	
	public List<Course> findAll();
	
	public Course findById(int id);

	public void save(Course course);
	
	public void deleteById(int id);

	public List<Instructor> findAllInstructorsAvailable(int course);

	public void saveInstructorToCourse(int courseId, int instructorId);

	public List<Instructor> findAllInstructorsRegistered(int courseId);

	public void deleteInstructorToCourse(int courseId, int instructorId);

	public List<Student> findAllStudentsAvailable(int courseId);

	public void saveStudentToCourse(int courseId, int studentId);

	public List<Student> findAllStudentsRegistered(int courseId);

	public void deleteStudentFromCourse(int courseId, int studentId);

	


}
