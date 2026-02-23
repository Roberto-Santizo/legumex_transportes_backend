export class Dates {
    static getCurrentDate(): string {
        const now = new Date();

        const gtString = now.toLocaleString("en-CA", {
            timeZone: "America/Guatemala",
            hour12: false
        });

        const gtDate = new Date(gtString);

        const yyyy = gtDate.getFullYear();
        const mm = String(gtDate.getMonth() + 1).padStart(2, '0');
        const dd = String(gtDate.getDate()).padStart(2, '0');
        const hh = String(gtDate.getHours()).padStart(2, '0');
        const min = String(gtDate.getMinutes()).padStart(2, '0');
        const ss = String(gtDate.getSeconds()).padStart(2, '0');

        const micro = String(now.getMilliseconds()).padStart(3, "0") + "000";

        return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}.${micro}`;
    }

    static getCurrentDatePlus(hours: number): string {
        const now = new Date();

        const gtString = now.toLocaleString("en-CA", {
            timeZone: "America/Guatemala",
            hour12: false
        });

        const gtDate = new Date(gtString);
        gtDate.setHours(gtDate.getHours() + hours);

        const yyyy = gtDate.getFullYear();
        const mm = String(gtDate.getMonth() + 1).padStart(2, '0');
        const dd = String(gtDate.getDate()).padStart(2, '0');
        const hh = String(gtDate.getHours()).padStart(2, '0');
        const min = String(gtDate.getMinutes()).padStart(2, '0');
        const ss = String(gtDate.getSeconds()).padStart(2, '0');

        const micro = String(gtDate.getMilliseconds()).padStart(3, "0") + "000";

        return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}.${micro}`;
    }
}