package com.project.angularspringproject.dao;

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
public class InstructorDAOImpl implements InstructorDAO {

	private EntityManager entityManager;

	@Autowired
	public InstructorDAOImpl(EntityManager entityManager) {
		super();
		this.entityManager = entityManager;
	}

	@Override
	public List<Instructor> findAll() {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Instructor> theQuery = currentSession.createQuery("from Instructor", Instructor.class);

		List<Instructor> instructors = theQuery.getResultList();

		return instructors;
	}

	@Override
	public List<Course> findAllCoursesForInstructor(int instructorId) {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Instructor> instructorQuery = currentSession.createQuery("from Instructor where id =:instructorId",
				Instructor.class);
		instructorQuery.setParameter("instructorId", instructorId);

		Instructor instructor = instructorQuery.getSingleResult();
		List<Course> courses = instructor.getCourses();
		return courses;
	}

	@Override
	public List<Student> findAllStudentForCourseForInstructor(int courseId) {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Course> courseQuery = currentSession.createQuery("from Course where id =:courseId", Course.class);
		courseQuery.setParameter("courseId", courseId);

		Course course = courseQuery.getSingleResult();
		List<Student> students = course.getStudents();
		return students;
	}

	@Override
	public Instructor findById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);

		Instructor instructor = currentSession.get(Instructor.class, id);

		return instructor;
	}

	@Override
	public void save(Instructor instructor) {
		Session currentSession = entityManager.unwrap(Session.class);

		currentSession.saveOrUpdate(instructor);

	}

	@Override
	public void deleteById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Instructor> theQuery = currentSession.createQuery("delete from Instructor where id =:instructorId");

		theQuery.setParameter("instructorId", id);

		theQuery.executeUpdate();
	}

}
