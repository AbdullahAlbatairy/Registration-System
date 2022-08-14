package com.project.angularspringproject.dao;

import java.util.List;

import com.project.angularspringproject.entity.Course;
import com.project.angularspringproject.entity.Student;

public interface StudentDAO {
	public List<Student> findAll();

	public Student findById(int id);

	public void save(Student student);

	public void deleteById(int id);

	public List<Course> findAllCoursesRegistered(int studentId);

	public List<Course> findAllCoursesAvailable(int studentId);

	public void saveCourseToStudnet(int studentId, Course course);

}
