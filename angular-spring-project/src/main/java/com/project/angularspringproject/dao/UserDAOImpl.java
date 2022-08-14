package com.project.angularspringproject.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.angularspringproject.entity.Admin;
import com.project.angularspringproject.entity.Course;
import com.project.angularspringproject.entity.Instructor;
import com.project.angularspringproject.entity.Student;
import com.project.angularspringproject.entity.User;

@Repository
public class UserDAOImpl implements UserDAO {

	private EntityManager entityManager;

	@Autowired
	public UserDAOImpl(EntityManager entityManager) {
		super();
		this.entityManager = entityManager;
	}

	@Override
	public List<User> findAll() {

		Session currentSeeion = entityManager.unwrap(Session.class);

		Query<User> theQuery = currentSeeion.createQuery("from User", User.class);

		List<User> users = theQuery.getResultList();

		return users;
	}

	@Override
	public User findById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);

		User user = currentSession.get(User.class, id);

		return user;
	}

	@Override
	public User findUser(String email, String password) {

		Session currentSeeion = entityManager.unwrap(Session.class);
		Query<User> theQuery = currentSeeion.createQuery("from User where email =:email",
				User.class);
		theQuery.setParameter("email", email);

		User user = theQuery.getSingleResult();
		
		

		return user;
	}



	@Override
	public void deleteById(int id) {

		Session currentSession = entityManager.unwrap(Session.class);

		Query<User> theQuery = currentSession.createQuery("delete from User where id =:userId", User.class);

		theQuery.setParameter("userId", id);

		theQuery.executeUpdate();
	}

	

}
