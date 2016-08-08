export module DateUtils {
    export function differenceInDays(start: Date, end: Date): number {
        return Math.round((end.getTime() - start.getTime()) / 86400000);
    }

    export function getCurrentDate(): Date {
        let local = new Date();
        local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
        return local;
    }

    export function format(date: Date): string {
	       return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
	}

    export function isLinear(start: Date, end: Date): boolean {
        return end.getTime() >= start.getTime();
    }

    export function periodBetween(start: Date, end: Date, period: string): number {
        // If start is actually after end, I think we need
        // to swap them and then return a negative value.
        let negate = 1;
        if (DateUtils.isLinear(end, start)) {
            negate = -1;

            let tmp = start;
            start = end;
            end = tmp;
        }
        let result = 0;

        switch(period) {
            case 'daily':
                result = differenceInDays(start, end);
                break;
            case 'monthly':
                let startMonths = start.getMonth() + (start.getFullYear() * 12);
                let endMonths = end.getMonth() + (end.getFullYear() * 12);
                result = endMonths - startMonths - (start.getDate() <= end.getDate() ? 0 : 1);

                // from 7/3 to 8/2 should be 0 months
                // 8 - 7 - (1) = 0 correct!
                // from 7/1 to 9/1 should be 2 months
                // 9 - 7 - (0) = 2 correct!
                // but what to do with negative values?
                // just use the swap

                // other test cases:
                // from 3/1/2015 to 1/5/2016
                // should be -1
                break;
            case 'annually':
                let startMonth = start.getMonth();
                let endMonth = end.getMonth();
                result = end.getFullYear() - start.getFullYear() - ((startMonth < endMonth || (startMonth == endMonth && start.getDate() < end.getDate())) ? 0 : 1);
                break;
        }
        return result * negate;
    }
}
