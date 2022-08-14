package com.project.angularspringproject.dto;

import com.project.angularspringproject.entity.Admin;

public class AdminDTO extends UserDTO {
	Admin admin;
	int userType;

	public AdminDTO(Admin admin, int userType) {
		super();
		this.admin = admin;
		this.userType = userType;
	}

	public Admin getAdmin() {
		return admin;
	}

	public void setAdmin(Admin admin) {
		this.admin = admin;
	}

	public int getUserType() {
		return userType;
	}

	public void setUserType(int userType) {
		this.userType = userType;
	}

}
