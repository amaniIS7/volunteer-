package com.ga.volunteer.dao;

import org.springframework.data.repository.CrudRepository;

import com.ga.volunteer.model.User;





public interface UserDao extends CrudRepository<User, Integer> {
	public User findByEmailAddress(String emailAddress);
	public User findById(int id);
}
