package com.ga.volunteer.dao;

import org.springframework.data.repository.CrudRepository;

import com.ga.volunteer.model.Comments;

public interface CommentsDao extends CrudRepository<Comments, Integer> {
	public Comments findById(int id);
	
}