package com.ga.volunteer.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	UserDetailsService userDetailsService;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	// Authentication
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		this.disableLocalConfigureAuthenticationBldr = true;
		auth.userDetailsService(userDetailsService);
	}
	@Autowired
	JwtRequestFilter jwtRequestFilter;
	
	// Authorization
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		// هنا عشان ما يقدر يضيف الا لمن يسجل 
			.csrf().disable()
			.authorizeRequests()
			.antMatchers("/service/add").hasAnyRole("ADMIN","USER")
			.antMatchers("service", "edit").hasAnyRole("ADMIN","USER")
			.antMatchers("service", "delete").hasAnyRole("ADMIN","USER")
			.antMatchers("comments", "add").hasRole("USER")
			.antMatchers("comments", "delete").hasAnyRole("ADMIN","USER")

			.antMatchers("/user/changePassword").hasAnyRole("ADMIN","USER")

			.antMatchers("/user/profile").hasAnyRole("ADMIN","USER")

			
			
		
		.and()
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		
		
		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
		
	}
	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}


}
