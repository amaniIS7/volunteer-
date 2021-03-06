package com.ga.volunteer.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ga.volunteer.dao.UserDao;
import com.ga.volunteer.model.Comments;
import com.ga.volunteer.model.Service;
import com.ga.volunteer.dao.ServiceDao;

@RestController
public class ServiceController {
	
	@Autowired 
	private Environment env;
	@Autowired
	HttpServletRequest request;
	@Autowired
	private ServiceDao dao;
	
	// HTTP POST REQUEST - Service Add
	@PostMapping("/services/add")
	public Service addService(@RequestBody Service services) {
		dao.save(services);
		return services;
	}

// HTTP GET REQUEST - services Index
	@GetMapping("/services/index")
	public Iterable<Service> getServices() {
		var it = dao.findAll();
		return it;
	}

// HTTP GET REQUEST - services Detail
	@GetMapping("/services/detail")
	public Service serviceDetails(@RequestParam int id) {
		System.out.println(id);
		Service services = dao.findById(id);
		return services;
	}

// HTTP GET REQUEST - services Edit
	@PutMapping("/services/edit")
	public Service editService(@RequestBody Service services) {
		dao.save(services);
		return services;
	}

	// HTTP GET REQUEST - services Delete
		@DeleteMapping("/services/delete")
		public Service deleteService(@RequestParam int id) {
			Service services = dao.findById(id);
			dao.deleteById(id);
			return services;
		}
	
	
	

}
