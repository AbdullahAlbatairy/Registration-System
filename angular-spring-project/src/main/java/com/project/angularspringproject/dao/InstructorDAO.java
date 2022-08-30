package com.project.angularspringproject.dao;

import java.util.List;



import com.project.angularspringproject.entity.Course;
import com.project.angularspringproject.entity.Instructor;
import com.project.angularspringproject.entity.Student;

public interface InstructorDAO {
	public List<Instructor> findAll();

	public Instructor findById(int id);

	public void save(Instructor instructor);

	public void deleteById(int id);

	public List<Course> findAllCoursesForInstructor(int instructorId);

	public List<Student> findAllStudentForCourseForInstructor(int courseId);

}
