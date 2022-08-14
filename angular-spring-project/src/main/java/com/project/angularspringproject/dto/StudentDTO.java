package com.project.angularspringproject.dto;

import java.util.List;

import com.project.angularspringproject.entity.Course;
import com.project.angularspringproject.entity.Student;

public class StudentDTO extends UserDTO {
	private Student student;
	private List<Course> courses;
	private int userType;

	public StudentDTO(Student student, List<Course> courses, int userType) {
		this.student = student;
		this.student.setPassword(null);
		this.setCourses(courses);
		this.userType = userType;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public int getUserType() {
		return userType;
	}

	public void setUserType(int userType) {
		this.userType = userType;
	}

	public List<Course> getCourses() {
		return courses;
	}

	public void setCourses(List<Course> courses) {
		this.courses = courses;
	}

}
