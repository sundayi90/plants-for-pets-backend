
export class VerifyUtil {
  static isEng = (str: string) => {
    const regExp = /^[a-zA-Z]+$/; // 알파벳
    return regExp.test(str);
  }
}