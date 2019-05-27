package com.dnet.cptuVisualizationMap.entities;

import java.io.Serializable;

public class TenderDTO implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 5729597040393289632L;
	private Integer distCode;
	private String district;
	private Long count;
	
	public TenderDTO(Integer distCode, String district, Long count) {
		
		this.distCode = distCode;
		this.district = district;
		this.count = count;
	}

	public Integer getDistCode() {
		return distCode;
	}

	public void setDistCode(Integer distCode) {
		this.distCode = distCode;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}
	
	
	
	
	
	

}
