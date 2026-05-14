package com.ems.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record EmployeeDto(@NotBlank(message = "Name is required") String name,

		@Email(message = "Invalid email format") @Column(unique = true, nullable = false) String email,

		String department,

		@Min(value = 1, message = "Salary must be greater than 0") Double salary) {

}
