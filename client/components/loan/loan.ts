import { DateUtils } from '../../dateutils';

export class Loan {
    records: LoanRecord[] = [];

    rate: number;
    ratePerPeriod: number;

    period: string;

    constructor(
        public id: number,
        public name: string,
        public principle: number,
        public interest: number,
        public currentDate: Date
    ) { }

    getBalance(): number {
        return this.principle + this.interest;
    }

    pay(payment: number, date: Date): LoanRecord {
        let interest = 0;
        let id = this.records.length + 1;

        let accruedInterest = this.accrue(date);

        if (this.interest >= payment) {
            this.interest -= payment;
        } else {
            let pd_on_prc = payment - this.interest;
            this.principle -= pd_on_prc;
            this.interest = 0;
        }

        let record = new LoanRecord(id, payment, date, this.rate);
        this.records.push(record);
        return record;
    }

    accrue(to: Date): number {
        let periodInDays = DateUtils.differenceInDays(this.currentDate, to);
        let coefficient = Math.pow(this.ratePerPeriod, periodInDays);

        let interest = this.getBalance() * coefficient;
        this.interest += interest;

        return interest;
    }

    borrow(amount: number, date: Date) {

    }
}

export class LoanRecord {
    constructor(
        public id: number,
        public payment: number,
        public date: Date,
        public rate: number
    ) {}
}
