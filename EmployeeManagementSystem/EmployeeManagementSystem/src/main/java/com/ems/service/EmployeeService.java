package com.ems.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ems.dto.EmployeeDto;
import com.ems.entity.Employee;
import com.ems.repository.EmployeeRepository;

import jakarta.validation.Valid;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

	public Employee updateSalary(Long id, Double newSalary) {
		  Employee emp = employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Not Found"));
	        emp.setSalary(newSalary);
	        return employeeRepository.save(emp);
	}

	public Employee createEmployee(EmployeeDto dto) {
		if(employeeRepository.existsByEmail(dto.email())) {
            throw new RuntimeException("Email already exists!");
        }
		
		Employee e=new Employee();
		e.setDepartment(dto.department());
		e.setEmail(dto.email());
		e.setName(dto.name());
		e.setSalary(dto.salary());
		return employeeRepository.save(e);
	}
	
	 public Page<Employee> getAllEmployees(String dept, Pageable pageable) {
	        if (dept != null && !dept.isEmpty()) {
	            return employeeRepository.findByDepartmentContaining(dept, pageable);
	        }
	        return employeeRepository.findAll(pageable);
	    }

}
