package com.ga.volunteer.controller;

import java.util.HashMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.ga.volunteer.model.*;
import com.ga.volunteer.config.JwtUtil;
import com.ga.volunteer.dao.UserDao;

@RestController
public class UserController {
	@Autowired
	private Environment env;
	@Autowired
	private UserDao dao;
	@Autowired
	HttpServletRequest request;
	// Routes 

	// To post the registration form هنا عشان اليوزر يسجل 
	 @PostMapping("/user/registration")
	 public HashMap<String, String> registration(@RequestBody User user) { //1requestbody 
		

		 HashMap<String, String> response = new HashMap<String, String>();
		 
		 
		 // i cheak if the user here
		 var it = dao.findAll();
		 for(User dbUser : it) {
			 if(dbUser.getEmailAddress().equals(user.getEmailAddress())) {
  
				 
				 response.put("message", "User already exists");
				 return response;
			 }
		 }
		 if (!(user.getPassword().equals(user.getConfirmPassword()))) {
			 
			 response.put("message","the password not match" );
			 return response;
		 }
		 // Password Encryption اشوف اليوزر اذا الباسورد بعد ما يدخل
		 BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();
		 String newPassword = bCrypt.encode(user.getPassword());//
		 user.setPassword(newPassword);
		 
		 
		 // Password Encryption
			
			
//		 String conPassword = bCrypt.encode(user.getConfirmPassword());
//		  user.setConfirmPassword(conPassword);
		  
		  dao.save(user);//

		 
		 response.put("message", "User registered successfully");
		 return response;
		 
	 }
	 
	 @Autowired
	 AuthenticationManager authenticationManager;
	 @Autowired
	 JwtUtil jwtUtil;
	 @Autowired
	 UserDetailsService userDetailsService;
	 @PostMapping("/user/authenticate")
	 public ResponseEntity<?> authenticate(@RequestBody User user) {
		 try {
			 authenticationManager.authenticate(
					 new UsernamePasswordAuthenticationToken(user.getEmailAddress(), user.getPassword())
					 );
		 }
		 catch(BadCredentialsException e) {
			 String res = "Incorrect username or password";
			 return ResponseEntity.ok(res);
		 }
		// Conitnue
		UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmailAddress());
		String jwtToken = jwtUtil.generateToken(userDetails);
		System.out.println(jwtToken);
		return ResponseEntity.ok(new JwtResponse(jwtToken));
	 }
	 
	 
	 
	 
	 
	 @PutMapping("/user/changePassword")
	 public HashMap<String, String> changePassword(@RequestBody User user) { //??
		 
		 
		 HashMap<String, String> change = new HashMap<String, String>();
			System.out.println("dbuser id "+user.getId());

		 // cheack
		 User dbuser = dao.findByEmailAddress(user.getEmailAddress());
		 System.out.println("dbuser id "+dbuser.getId());
		 
		 
		 
			BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();
			
			String oldPass = user.getOldPassword();
//			System.out.println("old dbuser"+oldPass);
//			System.out.println("pass dbuser"+dbuser.getPassword());
//			System.out.println("getpass dbuser"+dbuser.getOldPassword());
			

			if (bCrypt.matches(oldPass, dbuser.getPassword())) { //matches
				System.out.println("insude if ");
				String newPassword = bCrypt.encode(user.getPassword());
				user.setPassword(newPassword);
				user.setOldPassword(oldPass);
			
				dao.save(user);
				 change.put("you change the password successfully", newPassword);
			}

			else {
				change.put("your  password doesn't match the old password", oldPass);
			}
			return change; 
	 }
			
		//profile 	
//	 @PutMapping("/user/profile")
//		public User editUser(@RequestBody User user) {
//			dao.save(user);
//			return user;
//			
//		}
	 
	 @GetMapping("/user/profile")
		public User editUser(@RequestParam String email) {
			User user =	dao.findByEmailAddress(email);
					return user;
		}
	 
	 
	 
	 
//	// To load change password
//		@PostMapping("/user/changePassword")
//		
//		 public HashMap<String, String> ChangePassword (@RequestParam int id) {
//			User user = dao.findById(id);
//			 HashMap<String, String> response = new HashMap<String, String>();
//			BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();
//			
//			
//		}
//
//		// post changePassword form
//		@PostMapping("/user/changePassword")
//		public ModelAndView changePassword(User user) {
//			System.out.println("change password ");
//			
//
//			System.out.println(user.getId());
//			
//			
//			User dbuser = dao.findById(user.getId());
//			BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();
//			String oldPass = user.getOldPass();
//
//			if (bCrypt.matches(oldPass, dbuser.getPassword())) {
//				String newPassword = bCrypt.encode(user.getPassword());
//				user.setPassword(newPassword);
//			
//				dao.save(user);
//				mv.addObject("you change the password successfully");
//			}
//
//			else {
//				mv.addObject("your  password doesnot match the old password");
//			}
//
//			System.out.println(dbuser.getId());
//			System.out.println(user.getOldPass());
//			System.out.println(user.getPassword());
//
//
//			return mv;
		
}//end class
	

