package com.project.angularspringproject.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.project.angularspringproject.entity.Admin;

@Repository
public class AdminDAOImpl implements AdminDAO {

	private EntityManager entityManager;

	@Autowired
	public AdminDAOImpl(EntityManager entityManager) {
		super();
		this.entityManager = entityManager;
	}

	@Override
	public List<Admin> findAll() {

		Session currentSession = entityManager.unwrap(Session.class);

		Query<Admin> theQuery = currentSession.createQuery("from Admin", Admin.class);

		List<Admin> admins = theQuery.getResultList();

		return admins;
	}

	@Override
	public Admin findById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);

		Admin admin = currentSession.get(Admin.class, id);

		return admin;
	}

	@Override
	public void save(Admin admin) {
		Session currentSession = entityManager.unwrap(Session.class);

		currentSession.saveOrUpdate(admin);
	}

	@Override
	public void deleteById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);

		Query<Admin> theQuery = currentSession.createQuery("delete from Admin where id =:adminId", Admin.class);

		theQuery.setParameter("adminId", id);

		theQuery.executeUpdate();
	}

}
