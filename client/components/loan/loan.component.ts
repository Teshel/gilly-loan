import { Component, Input, ViewChild, AfterViewInit, Pipe, PipeTransform, ChangeDetectorRef } from "@angular/core";
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from "ng-semantic";
import { Http, Headers, RequestOptions } from "@angular/http";

import 'ng2-datetime/src/vendor/bootstrap-datepicker/bootstrap-datepicker.min.js';
import 'ng2-datetime/src/vendor/bootstrap-timepicker/bootstrap-timepicker.min.js';
import { NKDatetime } from '../nkdatetime/nkdatetime.component';
//import { NKDatetime } from "ng2-datetime/ng2-datetime";

import { Loan } from "./loan";
import { DateUtils } from "../../dateutils"
import 'rxjs/add/operator/map'

import 'jquery';
declare var jQuery;
var $ = jQuery;

@Component({
	directives: [SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES, NKDatetime],
	selector: "loan",
	templateUrl: `client/components/loan/loan.component.html`,
	styleUrls: ["client/components/loan/loan.component.css"]
})
export class LoanComponent implements AfterViewInit {
    loans: Loan[] = [];
    currentLoan: Loan = null;

    nameField 		= "Loan";
    idField 		= 1;
    principleField 	= 10000;
	_rate			= 3.99;
	payField 		= 1000;
	borrowField		= 10000;
    datePicker		= DateUtils.getCurrentDate();
	controlDatePicker = DateUtils.getCurrentDate();
	period			= "";

	showCreatePanel: boolean = true;
	showControlPanel: boolean = false;

	@ViewChild('startingDate') startingDate;

	/*
	 * Getters and setters that hook into the currently selected loan.
	 */
	get rateField(): number {
		//return this._rate;
		if (this.currentLoan) {
			return this._rate;
		} else {
			return 0;
		}
	}

	set rateField(value: number) {
		// this._rate = value;
		// this.rate = (this._rate / 100) + 1;
		if (this.currentLoan) {
			this._rate = value;
			this.currentLoan.rate = value;
		}
	}

	get periodSelector(): string {
		if (this.currentLoan) {
			return this.currentLoan.period;
		} else {
			return "daily";
		}
	}

	set periodSelector(value: string) {
		if (this.currentLoan) {
			this.currentLoan.period = value;
		}
	}

	// Functions that calculate something to be displayed in the view
	effectiveRate(): number {
		if (this.currentLoan) {
			return this.currentLoan.effectiveRate * 100;
		} else {
			return 0;
		}
	}

	interestPerMonth(): number {
		return this.principleField * this.currentLoan.fractionPerPeriod;
	}

    constructor(public http: Http, public cdRef: ChangeDetectorRef) {
		let date = DateUtils.getCurrentDate();
		date.setFullYear(date.getFullYear() - 1);
		this.currentLoan = new Loan(0, "Ipsum Loan", 100000, this._rate, new Date(date.getTime()));

		let payment1 = Math.round(Math.random() * 1000);
		let payment2 = Math.round(Math.random() * 1000);

		for (let i=0; i<4; i++) {
			date.setMonth(date.getMonth() + 1);
			let localdate = new Date(date.getTime());
			this.currentLoan.pay(payment1, localdate);
		}
		for (let i=0; i<5; i++) {
			date.setMonth(date.getMonth() + 1);
			let localdate = new Date(date.getTime());
			this.currentLoan.pay(payment2, localdate);
		}
	}

	ngAfterViewInit() {
		//jQuery('#select').dropdown();
		// $('#datetimepicker1').datetimepicker({
		// 	defaultDate: DateUtils.getCurrentDate(),
		// 	format: "MM/DD/YYYY"
		// });
		// jQuery('#datetimepicker1').click();
		// jQuery('#datetimepicker2').datetimepicker({
		// 	defaultDate: DateUtils.getCurrentDate(),
		// 	format: "MM/DD/YYYY"
		// });
		//this.datePicker = DateUtils.getCurrentDate();
		//this.controlDatetimePicker = DateUtils.getCurrentDate();
		//jQuery('#periodSelect').dropdown();
		this.rateFieldChange();
		this.cdRef.detectChanges();
	}

	toggleCreateControl() {
		this.showCreatePanel = false;
		this.showControlPanel = true;
	}

	payLoan() {
		this.currentLoan.pay(this.payField, DateUtils.getCurrentDate());
	}

	borrowMore() {
		this.currentLoan.borrow(this.borrowField, DateUtils.getCurrentDate());
	}

	rateFieldChange() {
		//console.log("Foobar");
		// this.rate = (this.rateField / 100) + 1;
		// this.ratePerPeriod = this.rate / 365;
		// console.log(this.ratePerPeriod);
		//this.currentLoan.changeRate(this.rate);

		//this.cdRef.detectChanges();
	}

    createLoan() {
        let loan = new Loan(this.idField, this.nameField, this.principleField, this.rateField, DateUtils.getCurrentDate());
        this.loans.push(loan);
        this.currentLoan = loan;
		this.toggleCreateControl();
		//this._appRef.tick();
    }

	format(date: Date): string {
		return DateUtils.format(date);
	}
}
