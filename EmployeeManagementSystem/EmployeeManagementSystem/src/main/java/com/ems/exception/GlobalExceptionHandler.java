package com.ems.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ems.dto.ErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<ErrorResponse> handleRuntimeExceptions(RuntimeException ex) {
		ErrorResponse response = new ErrorResponse(ex.getMessage());
		return ResponseEntity.badRequest().body(response);

	}

	// 1. Handle Bean Validations (@NotBlank, @Min, @Email)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});
		ErrorResponse response = new ErrorResponse("Validation Failed", errors);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

}
