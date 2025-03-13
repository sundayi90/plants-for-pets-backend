import * as moment from 'moment'

export class DateUtil {
  static getNow = (dateOb: Date) => {
    const year = dateOb.getFullYear();
    const month = ("0" + (dateOb.getMonth() + 1)).slice(-2);
    const date = ("0" + dateOb.getDate()).slice(-2);
    const h = ("0" + dateOb.getHours()).slice(-2);
    const m = ("0" + dateOb.getMinutes()).slice(-2);
    const s = ("0" + dateOb.getSeconds()).slice(-2);
    const ms = dateOb.getMilliseconds();

    return {year, month, date, h, m, s, ms};
  };

  static getKTime = (date: any, format?: string) => {
    return moment(new Date(date))
      .format(format ?? 'YYYY-MM-DD')
  };
}
