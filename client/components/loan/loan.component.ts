import { Component, Input, ViewChild, AfterViewInit } from "@angular/core";
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
	loanIpsum: Loan;
    currentLoan: Loan = null;

    nameField: string = "Loan";
    idField: number = 1;
    principleField: number = 10000;
    rateField: number = 6;
    datePicker: Date = new Date();
	period: string = "";

	@ViewChild('startingDate') startingDate;

    constructor(public http: Http) {
		let date = DateUtils.getCurrentDate();
		date.setFullYear(date.getFullYear() - 1);
		this.loanIpsum = new Loan(0, "Loan Ipsum", 100000, 6, new Date(date.getTime()));


		for (let i=0; i<10; i++) {
			date.setMonth(date.getMonth() + 1);
			let localdate = new Date(date.getTime());
			this.loanIpsum.pay(Math.round(Math.random() * 1000), localdate);
		}

		this.currentLoan = this.loanIpsum;

		this.datePicker = DateUtils.getCurrentDate();

		//jQuery('#select').dropdown();
	}

	ngAfterViewInit() {
		//jQuery('#select').dropdown();
		jQuery('#datetimepicker1').datetimepicker();
		this.datePicker = new Date();
		//jQuery('#periodSelect').dropdown();
	}

    createLoan() {
        let loan = new Loan(this.idField, this.nameField, this.principleField, this.rateField, DateUtils.getCurrentDate());
        this.loans.push(loan);
        this.currentLoan = loan;
		//this._appRef.tick();
    }

	format(date: Date): string {
		return DateUtils.format(date);
	}
}
