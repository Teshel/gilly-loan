import { Component } from "@angular/core";
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from "ng-semantic";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Loan } from "./loan";
import {DateUtils} from "../../dateutils"
import 'rxjs/add/operator/map'

@Component({
	directives: [SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES],
	selector: "loan",
	templateUrl: `client/components/loan/loan.component.html`
})
export class LoanComponent {
    loans: Loan[] = [];
	loanIpsum: Loan;
    currentLoan: Loan = null;

    nameField: string = "Loan";
    idField: number = 1;
    principleField: number = 10000;
    rateField: number = 6;
    datePicker: Date = new Date();

    constructor(public http: Http) {
		let date = DateUtils.getCurrentDate();
		date.setFullYear(date.getFullYear() - 1);
		this.loanIpsum = new Loan(0, "Loan Ipsum", 100000, 6, date);


		for (let i=0; i<10; i++) {
			date.setMonth(date.getMonth() + 1);
			this.loanIpsum.pay(Math.random() * 1000, date);
		}

		//this.currentLoan = this.loanIpsum;
	}

    createLoan() {
        let loan = new Loan(this.idField, this.nameField, this.principleField, this.rateField, DateUtils.getCurrentDate());
        this.loans.push(loan);
        this.currentLoan = loan;
    }

	format(date: Date): string {
		return DateUtils.format(date);
	}
}
