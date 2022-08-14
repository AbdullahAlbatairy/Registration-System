package com.project.angularspringproject.dto;

import com.project.angularspringproject.entity.User;

public class UserDTO {
	private User user;
	private int userType;
	
	public UserDTO() {}
	
	
	public UserDTO(User user, int userType) {
		super();
		this.user = user;
		this.userType = userType;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public int getUserType() {
		return userType;
	}
	public void setUserType(int userType) {
		this.userType = userType;
	}
	

}
