package com.dnet.cptuVisualizationMap.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity()
public class Tender {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String ministry;
	private String division;
	private String district;
	private String organization;
	@Autowired
	@OneToOne
	private ProcurementEntity pe;
	private int divCode;
	private int distCode;
	private double amount;
	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss a")
	private Date awardDate;

	public Tender() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMinistry() {
		return ministry;
	}

	public void setMinistry(String ministry) {
		this.ministry = ministry;
	}

	public String getDivision() {
		return division;
	}

	public void setDivision(String division) {
		this.division = division;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getOrganization() {
		return organization;
	}

	public void setOrganization(String organization) {
		this.organization = organization;
	}

	public ProcurementEntity getPe() {
		return pe;
	}

	public void setPe(ProcurementEntity pe) {
		this.pe = pe;
	}

	public int getDivCode() {
		return divCode;
	}

	public void setDivCode(int divCode) {
		this.divCode = divCode;
	}

	public int getDistCode() {
		return distCode;
	}

	public void setDistCode(int distCode) {
		this.distCode = distCode;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public Date getAwardDate() {
		return awardDate;
	}

	public void setAwardDate(Date awardDate) {
		this.awardDate = awardDate;
	}
}
