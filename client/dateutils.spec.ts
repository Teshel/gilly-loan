import { DateUtils } from './dateutils';

describe('DateUtils.periodBetween()', () => {
    it('calculates months correctly (1)', () => {
        let start = new Date(2015, 1, 10);
        let end = new Date(2015, 2, 1);
        let months = DateUtils.periodBetween(start, end, 'months');
        expect(months).toEqual(0);
    });

    it('calculates months correctly (2)', () => {
        let start = new Date(2015, 1, 10);
        let end = new Date(2015, 3, 1);
        let months = DateUtils.periodBetween(start, end, 'months');
        expect(months).toEqual(1);
    });

    it('calculates months correctly (3)', () => {
        let start = new Date(2015, 1, 1);
        let end = new Date(2015, 2, 1);
        let months = DateUtils.periodBetween(start, end, 'months');
        expect(months).toEqual(1);
    });

    it('calculates months correctly (4)', () => {
        let start = new Date(2015, 3, 10);
        let end = new Date(2016, 1, 1);
        let months = DateUtils.periodBetween(start, end, 'months');
        expect(months).toEqual(9);
    });

    it('calculates months correctly (5)', () => {
        let start = new Date(2015, 5, 10);
        let end = new Date(2015, 1, 1);
        let months = DateUtils.periodBetween(start, end, 'months');
        expect(months).toEqual(-4);
    });
});
