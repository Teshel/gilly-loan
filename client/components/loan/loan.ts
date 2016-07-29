import { DateUtils } from '../../dateutils';

export class Loan {
    records: LoanRecord[]   = [];

    interest                = 0;
    ratePerPeriod           = 0;
    fractionPerPeriod       = 0;
    startingPrinciple       = 0;
    _rate                   = 0;
    effectiveRate           = 0;

    _period                  = "daily";

    constructor(
        public id: number,
        public name: string,
        public principle: number,
        rate: number,
        public currentDate: Date
    ) {
        this.startingPrinciple = principle;
        this.interest = 0;
        this.rate = rate;
        this.records.push(new LoanRecord(1, -principle, 0, 0, currentDate, rate, this.getBalance()));
    }

    set rate(value: number) {
        this._rate = (value / 100);
        this.calculateRates();
    }

    get rate(): number {
        return this._rate;
    }

    set period(value: string) {
        this._period = value;
        this.calculateRates();
    }

    get period(): string {
        return this._period;
    }

    calculateRates() {
        this.fractionPerPeriod = this._rate / this.periodsPerYear();
        this.ratePerPeriod = this.fractionPerPeriod + 1;
        //console.log("_rate = "+this._rate + ", ratePerPeriod = "+this.ratePerPeriod);
        this.effectiveRate = Math.pow(this.ratePerPeriod, this.periodsPerYear()) - 1;
        //console.log("Setting effective rate for loan " + this.name + " to "+this.effectiveRate);
    }

    periodsPerYear(): number {
        switch (this.period) {
            case "daily":
                return 365;
            case "monthly":
                return 12;
            case "annually":
                return 1;
        }
        return 1;
    }

    getBalance(): number {
        return this.principle + this.interest;
    }

    pay(payment: number, date: Date): LoanRecord {
        //let interest = 0;
        let id = this.records.length + 1;

        let accruedInterest = this.accrue(date);
        let pd_on_prc = 0;

        if (this.interest >= payment) {
            this.interest -= payment;
        } else {
            pd_on_prc = payment - this.interest;
            this.principle -= pd_on_prc;
            this.interest = 0;
        }

        let record = new LoanRecord(id, payment, accruedInterest, pd_on_prc, date, this.rate, this.getBalance());
        this.records.push(record);
        return record;
    }

    recalculateRecords(id: number) {
        let balance = 0;
        for (var record of this.records) {

        }
    }

    accrue(to: Date): number {
        console.log("Debug: Starting Accrue");
        let periodInDays = DateUtils.differenceInDays(this.currentDate, to);
        console.log("Debug: periodInDays = "+periodInDays);
        //let coefficient = Math.pow(this.ratePerPeriod, periodInDays);
        //console.log("Debug:"+this.effectiveRate;

        let interest = this.getBalance() * this.fractionPerPeriod;
        this.interest += interest;

        this.currentDate = to;

        return interest;
    }

    borrow(amount: number, date: Date) {
        let accruedInterest = this.accrue(date);
        let id = this.records.length + 1;

        this.principle += amount;

        let record = new LoanRecord(id, -amount, accruedInterest, 0, date, this.rate, this.getBalance());

        this.records.push(record);
    }
}

export class LoanRecord {
    constructor(
        public id: number,
        public payment: number,
        public interest: number,
        public pd_on_prc: number,
        public date: Date,
        public rate: number,
        public balance: number
    ) {}
}
