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
}
