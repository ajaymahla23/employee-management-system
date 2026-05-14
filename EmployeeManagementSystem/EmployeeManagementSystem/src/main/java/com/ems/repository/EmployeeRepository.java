package com.ems.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

	boolean existsByEmail(String email);

	Page<Employee> findByDepartmentContaining(String dept, Pageable pageable);

}
