package com.project.angularspringproject.entity;


import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;

import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
@Table(name = "student")
public class Student extends User {
	
	

	@ManyToMany(fetch = FetchType.LAZY,
			cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
	@JoinTable(name = "course_student", joinColumns = @JoinColumn(name = "student_id"), inverseJoinColumns = @JoinColumn(name = "course_id"))
	@JsonBackReference
	private List<Course> courses;



	public List<Course> getCourses() {
		return courses;
	}

	public void setCourses(List<Course> courses) {
		this.courses = courses;
	}

	
	
	
	
}
