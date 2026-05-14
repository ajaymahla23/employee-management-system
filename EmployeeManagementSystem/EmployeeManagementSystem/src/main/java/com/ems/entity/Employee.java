package com.ems.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email format")
    @Column(unique = true, nullable = false)
    private String email;

    private String department;

    @Min(value = 1, message = "Salary must be greater than 0")
    private Double salary;
}
