package com.ems.dto;

import java.util.Map;

import lombok.Data;

@Data
public class ErrorResponse {
	
	
	private String message;
    private Map<String, String> errors;
    
    public ErrorResponse(String message) {
		this.message = message;
	}

    public ErrorResponse(String message, Map<String, String> errors) {
        this.message = message;
        this.errors = errors;
    }

}
