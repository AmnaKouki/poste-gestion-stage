package com.poste.tn.payload.response;

public class MessageResponse {
	private String message;
	private Boolean status;

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public MessageResponse(String message, Boolean status) {
	    this.message = message; this.status = status;
	  }

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
