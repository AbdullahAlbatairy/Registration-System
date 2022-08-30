package com.project.angularspringproject.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.angularspringproject.entity.Course;
import com.project.angularspringproject.entity.Instructor;
import com.project.angularspringproject.entity.Student;
import com.project.angularspringproject.service.InstructorService;

@RestController
@RequestMapping("/instructor")
@CrossOrigin
public class InstructorRestController {

	private InstructorService instructorService;

	@Autowired
	public InstructorRestController(InstructorService instructorService) {
		super();
		this.instructorService = instructorService;
	}

	@GetMapping("/instructors-list")
	public List<Instructor> findAll() {
		return instructorService.findAll();
	}
	
	@GetMapping("/courses-list/{instructorId}")
	public List<Course> findAllCoursesForInstructor(@PathVariable int instructorId) {
		return instructorService.findAllCoursesForInstructor(instructorId);
	}
	
	@GetMapping("/courses-list/{courseId}/students-list")
	public List<Student> findAllStudentForCourseForInstructor(@PathVariable int courseId) {
		return instructorService.findAllStudentForCourseForInstructor(courseId);
	}
	
	

	@PostMapping("/instructor-add")
	public void save(@RequestBody Instructor instructor) {
		this.instructorService.save(instructor);
	}

	@PutMapping("/instructor-edit")
	public void update(@RequestBody Instructor instructor) {
		this.instructorService.update(instructor);
	}

	@DeleteMapping("/instructor-delete/{id}")
	public void deleteById(@PathVariable int id) {
		this.instructorService.deleteById(id);
	}

}
