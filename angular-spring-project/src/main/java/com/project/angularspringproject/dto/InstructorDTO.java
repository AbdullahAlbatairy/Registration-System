package com.project.angularspringproject.dto;

import java.util.List;

import com.project.angularspringproject.entity.Course;
import com.project.angularspringproject.entity.Instructor;

public class InstructorDTO extends UserDTO {
	Instructor instructor;
	private List<Course> courses;
	int userType;
	
	
	public InstructorDTO(Instructor instructor, List<Course> courses ,int userType) {
		super();
		this.instructor = instructor;
		this.setCourses(courses);
		this.instructor.setPassword(null);
		this.userType = userType;
	}
	public Instructor getInstructor() {
		return instructor;
	}
	public void setInstructor(Instructor instructor) {
		this.instructor = instructor;
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
