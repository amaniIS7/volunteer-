package com.ga.volunteer.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
import org.springframework.web.servlet.ModelAndView;

import com.ga.volunteer.dao.CommentsDao;
import com.ga.volunteer.model.Comments;

@RestController // simply return the object and data written into HTTP response
// as JSON
public class CommentsController {
//CRUD OPERATIONS
// C -> Create = done
// R -> Select = done
// U -> Update = done
// D -> Delete =  done
	@Autowired
	private Environment env;
	@Autowired
	private CommentsDao dao;

// HTTP POST REQUEST - Comments Add
	@PostMapping("/comments/add")
	public Comments addComments(@RequestBody Comments comments) {
		dao.save(comments);
		return comments;
	}

// HTTP GET REQUEST - Comments Index
	@GetMapping("/comments/index")
	public Iterable<Comments> getComments() {
		var it = dao.findAll();
		return it;
	}

// HTTP GET REQUEST - Comments Detail
	@GetMapping("/comments/detail")
	public Comments commentsDetails(@RequestParam int id) {
		System.out.println(id);
		Comments comments = dao.findById(id);
		return comments;
	}

// HTTP GET REQUEST - Comments Edit
	@PutMapping("/comments/edit")
	public Comments editComments(@RequestBody Comments comments) {
		dao.save(comments);
		return comments;
	}

// HTTP GET REQUEST - Comments Delete
	@DeleteMapping("/comments/delete")
	public boolean deleteComments(@RequestParam int id) {
		Comments comments = dao.findById(id);
		dao.deleteById(id);
		return true;
	}
}