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

import com.project.angularspringproject.dao.StudentDAO;
import com.project.angularspringproject.entity.Course;
import com.project.angularspringproject.entity.Student;
import com.project.angularspringproject.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentRestController {

	private StudentService studentService;

	@Autowired
	public StudentRestController(StudentService studentService) {
		super();
		this.studentService = studentService;
	}

	@GetMapping("/students-list")
	public List<Student> findAll() {
		return studentService.findAll();
	}
	
	@GetMapping("courses-registered-list/{studentId}")
	public List<Course> findAllCoursesRegistered(@PathVariable int studentId){
		return studentService.findAllCoursesRegistered(studentId);
	} 
	
	@GetMapping("courses-available-list/{studentId}")
	public List<Course> findAllCoursesAvailable(@PathVariable int studentId){
		return studentService.findAllCoursesAvailable(studentId);
	} 
	
	@PostMapping("/student-add")
	public void save(@RequestBody Student student) {
		this.studentService.save(student);
	}
	
	@PostMapping("/course-add/{studentId}")
	public void saveCourseToStudnet(@PathVariable int studentId, @RequestBody Course course) {
		this.studentService.saveCourseToStudnet(studentId, course);

	}
	
	@PutMapping("/student-edit")
	public void update(@RequestBody Student student) {
		this.studentService.update(student);
	}
	@DeleteMapping("/student-delete/{id}")
	public void deleteById(@PathVariable int id) {
		this.studentService.deleteById(id);
	}

}
