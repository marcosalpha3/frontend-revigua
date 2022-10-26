export class DateUtils {
    public static setMyDatePickerDate(myDate: any): Object {
        let pickerDate = new Date(myDate);
        return { date: { year: pickerDate.getFullYear(), month: pickerDate.getMonth() + 1, day: pickerDate.getDate() } };
    }

    public static getMyDatePickerDate(myDate: any): String {
        return `${myDate.date.year}-${myDate.date.month}-${myDate.date.day}`;
    }    
}