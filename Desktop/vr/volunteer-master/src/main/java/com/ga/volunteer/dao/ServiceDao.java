package com.ga.volunteer.dao;

import org.springframework.data.repository.CrudRepository;

import com.ga.volunteer.model.Service;

public interface ServiceDao extends CrudRepository <Service, Integer>{

	public Service findById(int serviceId);


}
