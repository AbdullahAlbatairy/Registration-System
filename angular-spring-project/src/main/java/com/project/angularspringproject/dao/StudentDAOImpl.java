package com.project.angularspringproject.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.angularspringproject.entity.Course;
import com.project.angularspringproject.entity.Instructor;
import com.project.angularspringproject.entity.Student;

@Repository
public class StudentDAOImpl implements StudentDAO {

	private EntityManager entityManager;

	@Autowired
	public StudentDAOImpl(EntityManager entityManager) {
		super();
		this.entityManager = entityManager;
	}

	@Override

	public List<Student> findAll() {

		Session currentSeeion = entityManager.unwrap(Session.class);

		Query<Student> theQuery = currentSeeion.createQuery("from Student", Student.class);

		List<Student> students = theQuery.getResultList();

		return students;
	}

	@Override
	public List<Course> findAllCoursesRegistered(int studentId) {
		Session currentSeeion = entityManager.unwrap(Session.class);

		Query<Student> theQuery = currentSeeion.createQuery("from Student where id=:studentId", Student.class);
		theQuery.setParameter("studentId", studentId);
		Student student = theQuery.getSingleResult();

		return student.getCourses();

	}

	@Override
	public List<Course> findAllCoursesAvailable(int studentId) {
		Session currentSeeion = entityManager.unwrap(Session.class);

		Query<Student> theQuery = currentSeeion.createQuery("from Student where id=:studentId", Student.class);
		theQuery.setParameter("studentId", studentId);
		Student student = theQuery.getSingleResult();

		Query<Course> courseQuery = currentSeeion.createQuery("from Course", Course.class);
		List<Course> courses = courseQuery.getResultList();

		courses.removeAll(student.getCourses());

		return courses;

	}

	@Override
	public Student findById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);

		Student student = currentSession.get(Student.class, id);

		return student;
	}

	@Override
	public void save(Student student) {
		Session currentSession = entityManager.unwrap(Session.class);
		currentSession.saveOrUpdate(student);
	}

	@Override
	public void saveCourseToStudnet(int studentId, Course course) {
		Session currentSeeion = entityManager.unwrap(Session.class);

		Query<Student> theQuery = currentSeeion.createQuery("from Student where id=:studentId", Student.class);
		theQuery.setParameter("studentId", studentId);
		Student student = theQuery.getSingleResult();
		
		student.getCourses().add(course);
		
		currentSeeion.saveOrUpdate(student);

	}

	@Override
	public void deleteById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Student> theQuery = currentSession.createQuery("delete from Student where id =:studentId");

		theQuery.setParameter("studentId", id);

		theQuery.executeUpdate();
	}

}
