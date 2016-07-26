import { Component, Input, ViewChild, AfterViewInit, Pipe, PipeTransform, ChangeDetectorRef } from "@angular/core";
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from "ng-semantic";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Loan } from "./loan";
import {DateUtils} from "../../dateutils"
import 'rxjs/add/operator/map'

declare var jQuery;

@Component({
	directives: [SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES],
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
    //rateField 		= 6;
	_rate			= 6;
	payField 		= 1000;
	borrowField		= 10000;
    datePicker		= DateUtils.getCurrentDate();
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

	effectiveRate(): number {
		if (this.currentLoan) {
			return this.currentLoan.effectiveRate * 100;
		} else {
			return 0;
		}
	}

    constructor(public http: Http, public cdRef: ChangeDetectorRef) {
		let date = DateUtils.getCurrentDate();
		date.setFullYear(date.getFullYear() - 1);
		this.currentLoan = new Loan(0, "Ipsum Loan", 100000, 6, new Date(date.getTime()));

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
		jQuery('#datetimepicker1').datetimepicker();
		this.datePicker = new Date();
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
