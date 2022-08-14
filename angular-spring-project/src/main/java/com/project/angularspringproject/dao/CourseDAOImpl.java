package com.project.angularspringproject.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.project.angularspringproject.entity.Admin;
import com.project.angularspringproject.entity.Course;
import com.project.angularspringproject.entity.Instructor;
import com.project.angularspringproject.entity.Student;

@Repository
public class CourseDAOImpl implements CourseDAO {

	private EntityManager entityManager;

	@Autowired
	public CourseDAOImpl(EntityManager entityManager) {
		super();
		this.entityManager = entityManager;
	}

	@Override
	public List<Course> findAll() {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Course> theQuery = currentSession.createQuery("from Course", Course.class);

		List<Course> courses = theQuery.getResultList();

		return courses;
	}

	@Override
	public List<Instructor> findAllInstructorsAvailable(int courseId) {
		Session currentSession = entityManager.unwrap(Session.class);

		// First get all instructor

		// then get instructors for the course

		// then delete the instructors that exist in the course and return the rest

		Query<Instructor> instructorQuery = currentSession.createQuery("from Instructor", Instructor.class);

		List<Instructor> instructors = instructorQuery.getResultList();

		Query<Course> courseQuery = currentSession.createQuery("from Course where id =:courseId", Course.class);

		courseQuery.setParameter("courseId", courseId);

		Course course = courseQuery.getSingleResult();

		instructors.removeAll(course.getInstrcutors());

		return instructors;
	}

	@Override
	public List<Student> findAllStudentsAvailable(int courseId) {
		Session currentSession = entityManager.unwrap(Session.class);

		// First get all students

		// then get students for the course

		// then delete the students that exist in the course and return the rest

		Query<Student> studentQuery = currentSession.createQuery("from Student", Student.class);

		List<Student> students = studentQuery.getResultList();

		Query<Course> courseQuery = currentSession.createQuery("from Course where id =:courseId", Course.class);

		courseQuery.setParameter("courseId", courseId);

		Course course = courseQuery.getSingleResult();

		students.removeAll(course.getStudents());

		return students;
	}

	@Override
	public List<Instructor> findAllInstructorsRegistered(int courseId) {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Course> courseQuery = currentSession.createQuery("from Course where id =:courseId", Course.class);

		courseQuery.setParameter("courseId", courseId);

		Course course = courseQuery.getSingleResult();

		return course.getInstrcutors();
	}

	@Override
	public List<Student> findAllStudentsRegistered(int courseId) {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Course> courseQuery = currentSession.createQuery("from Course where id =:courseId", Course.class);

		courseQuery.setParameter("courseId", courseId);

		Course course = courseQuery.getSingleResult();

		return course.getStudents();
	}

	@Override
	public Course findById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);

		Course course = currentSession.get(Course.class, id);

		return course;
	}

	@Override
	public void save(Course course) {
		Session currentSession = entityManager.unwrap(Session.class);

		currentSession.saveOrUpdate(course);

	}

	@Override
	public void saveInstructorToCourse(int courseId, int instructorId) {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Instructor> instructorQuery = currentSession.createQuery("from Instructor where id =:instructorId",
				Instructor.class);
		instructorQuery.setParameter("instructorId", instructorId);

		Instructor instructor = instructorQuery.getSingleResult();

		Query<Course> courseQuery = currentSession.createQuery("from Course where id =:courseId", Course.class);

		courseQuery.setParameter("courseId", courseId);

		Course course = courseQuery.getSingleResult();

		course.getInstrcutors().add(instructor);

		currentSession.saveOrUpdate(course);

	}

	@Override
	public void saveStudentToCourse(int courseId, int studentId) {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Student> studentQuery = currentSession.createQuery("from Student where id =:studentId", Student.class);
		studentQuery.setParameter("studentId", studentId);

		Student student = studentQuery.getSingleResult();

		Query<Course> courseQuery = currentSession.createQuery("from Course where id =:courseId", Course.class);

		courseQuery.setParameter("courseId", courseId);

		Course course = courseQuery.getSingleResult();

		course.getStudents().add(student);

		currentSession.saveOrUpdate(course);
	}

	@Override
	public void deleteById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);

		@SuppressWarnings("unchecked")
		Query<Course> theQuery = currentSession.createQuery("delete from Course where id =:courseId");

		theQuery.setParameter("courseId", id);

		theQuery.executeUpdate();
	}

	@Override
	public void deleteInstructorToCourse(int courseId, int instructorId) {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Instructor> instructorQuery = currentSession.createQuery("from Instructor where id =:instructorId",
				Instructor.class);
		instructorQuery.setParameter("instructorId", instructorId);

		Instructor instructor = instructorQuery.getSingleResult();

		Query<Course> courseQuery = currentSession.createQuery("from Course where id =:courseId", Course.class);

		courseQuery.setParameter("courseId", courseId);

		Course course = courseQuery.getSingleResult();

		course.getInstrcutors().remove(instructor);

		currentSession.saveOrUpdate(course);

	}

	@Override
	public void deleteStudentFromCourse(int courseId, int studentId) {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Student> studentQuery = currentSession.createQuery("from Student where id =:studentId", Student.class);
		studentQuery.setParameter("studentId", studentId);

		Student student = studentQuery.getSingleResult();

		Query<Course> courseQuery = currentSession.createQuery("from Course where id =:courseId", Course.class);

		courseQuery.setParameter("courseId", courseId);

		Course course = courseQuery.getSingleResult();

		course.getStudents().remove(student);

		currentSession.saveOrUpdate(course);

	}

}
