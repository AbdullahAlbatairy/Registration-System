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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.project.angularspringproject.service.CourseService;
import com.project.angularspringproject.entity.Course;
import com.project.angularspringproject.entity.Instructor;
import com.project.angularspringproject.entity.Student;

@RestController
@RequestMapping("/course")
@CrossOrigin
public class CourseRestController {
	private CourseService courseService;

	@Autowired
	public CourseRestController(CourseService courseService) {
		super();
		this.courseService = courseService;
	}

	@GetMapping("/courses-list")
	public List<Course> findAll() {

		return courseService.findAll();
	}
	
	@GetMapping("/instructors-for-course-list-available/{courseId}")
	public List<Instructor> findAllInstructorsAvailable(@PathVariable int courseId) {

		return courseService.findAllInstructorsAvailable(courseId);
	}
	
	
	@GetMapping("/students-for-course-list-available/{courseId}")
	public List<Student> findAllStudentsAvailable(@PathVariable int courseId) {

		return courseService.findAllStudentsAvailable(courseId);
	}
	
	
	@GetMapping("/instructors-for-course-list-register/{courseId}")
	public List<Instructor> findAllInstructorsRegistered(@PathVariable int courseId) {

		return courseService.findAllInstructorsRegistered(courseId);
	}
	
	
	@GetMapping("/students-for-course-list-register/{courseId}")
	public List<Student> findAllStudentsRegistered(@PathVariable int courseId) {

		return courseService.findAllStudentsRegistered(courseId);
	}
	
	@PostMapping("/course-add")
	public void save(@RequestBody Course course) {
		this.courseService.save(course);
	}
	
	@PutMapping("/course-add-instructor")
	public void saveInstructorToCourse(@RequestParam(name = "courseId") int courseId, @RequestParam(name = "instructorId") int instructorId) {
		this.courseService.saveInstructorToCourse(courseId, instructorId);
	}
	
	
	@PutMapping("/course-add-student")
	public void saveStudentToCourse(@RequestParam(name = "courseId") int courseId, @RequestParam(name = "studentId") int studentId) {
		this.courseService.saveStudentToCourse(courseId, studentId);
	}
	
	
	
	@PutMapping("/course-edit")
	public void update(@RequestBody Course course) {
		this.courseService.save(course);
	}

	@DeleteMapping("/course-delete/{id}")
	public void deleteById(@PathVariable int id) {
		this.courseService.deleteById(id);
	}
	
	@DeleteMapping("/course-delete-instructor")
	public void deleteInstructorToCourse(@RequestParam(name = "courseId") int courseId, @RequestParam(name = "instructorId") int instructorId) {
		this.courseService.deleteInstructorToCourse(courseId, instructorId);
	}
	
	
	
	@DeleteMapping("/course-delete-student")
	public void deleteStudentFromCourse(@RequestParam(name = "courseId") int courseId, @RequestParam(name = "studentId") int studentId) {
		this.courseService.deleteStudentFromCourse(courseId, studentId);
	}

}
