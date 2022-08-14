package com.project.angularspringproject.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "admin")
@Getter
@Setter
public class Admin extends User{
	@Column(name = "privilage_level")
	private int privilageLevel;

	public int getPrivilageLevel() {
		return privilageLevel;
	}

	public void setPrivilageLevel(int privilageLevel) {
		this.privilageLevel = privilageLevel;
	}

	
	
	

}
