package com.ems.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ems.dto.EmployeeDto;
import com.ems.entity.Employee;
import com.ems.service.EmployeeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController {

	@Autowired
	private EmployeeService service;

	@PostMapping
	public ResponseEntity<Employee> create(@Valid @RequestBody EmployeeDto emp) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.createEmployee(emp));
	}

	@GetMapping
	public ResponseEntity<Page<Employee>> getAll(
			@RequestParam(value = "department", required = false) String department,
			@RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "size", defaultValue = "10") int size,
			@RequestParam(value = "sort", defaultValue = "id,asc") String sort) { // String banaya array nahi

		// "name,asc" string ko split karenge
		String[] sortParts = sort.split(",");
		String sortColumn = sortParts[0];
		String sortDirection = sortParts.length > 1 ? sortParts[1] : "asc";
		Sort.Direction direction = Sort.Direction.fromString(sortDirection);
		Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortColumn));
		Page<Employee> list = service.getAllEmployees(department, pageable);
		return ResponseEntity.ok(list);
	}

	@PutMapping("/{id}/salary")
	public ResponseEntity<Employee> updateSalary(@PathVariable("id") Long id,
			@RequestBody Map<String, Double> payload) {
		return ResponseEntity.ok(service.updateSalary(id, payload.get("salary")));
	}
}
