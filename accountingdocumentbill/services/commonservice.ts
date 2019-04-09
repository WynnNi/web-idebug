import { Injectable } from '@angular/core';
import { MessagerService } from '@farris/ui';
import { FormLoadingService } from '@farris/command-services';
import { Observable } from 'rxjs';


@Injectable()
export class CommonService {
    constructor(
        public formMessageService: MessagerService,
        public loadingService: FormLoadingService,) {
    }


    /* //捕获异常 */
    catchError(res: any) {
        switch (res.status) {
            case 500:
                this.formMessageService.error(res.error.Message);
                this.loadingService.hide();
                break;
            case 404:
                this.formMessageService.error('找不到该请求的URL！');
                this.loadingService.hide();
                break;
            case 502:
                this.formMessageService.error('网络异常！');
                break;
            default:
                break;
        }
        return Observable.throw(res);
    }


    //格式化日期8位字符串
    factoryDateTo8(date): string {
        const dateyear = date.getFullYear();
        let datemonth = (date.getMonth() + 1).toString();
        if (Number(datemonth) < 10) {
            datemonth = '0' + datemonth;
            }
        let dateday = date.getDate();
        if (Number(dateday) < 10) {
            dateday = '0' + dateday;
        }
        const bizDate = dateyear + datemonth + dateday;
        return bizDate;
    }


    //日期十位转八位
    dateTo8(datestring: string) {
        const dateyear = datestring.substr(0, 4);
        const datemonth = datestring.substr(5, 2);
        const dateday = datestring.substr(8, 2);
        const date = dateyear + datemonth + dateday;
        return date;
    }
    //日期八位转十位
    dateTo10(datestring: string) {
        const dateyear = datestring.substr(0, 4);
        const datemonth = datestring.substr(4, 2);
        const dateday = datestring.substr(6, 2);
        const date = dateyear + '-' + datemonth + '-' + dateday;
        return date;
    }


    /***金额转大写 */
    money2Amount(numOrString: any) {
        let currencyDigits = numOrString.toString().replace('￥', ''); //替换掉可能出现的￥字符
        //最大值
        const MAXIMUM_NUMBER = 99999999999.99; //九百九十九亿九千九百九十九万九千九百九十九元九角九分
        //定义中文字符
        const CN_ZERO = '零';
        const CN_ONE = '壹';
        const CN_TWO = '贰';
        const CN_THREE = '叁';
        const CN_FOUR = '肆';
        const CN_FIVE = '伍';
        const CN_SIX = '陆';
        const CN_SEVEN = '柒';
        const CN_EIGHT = '捌';
        const CN_NINE = '玖';
        const CN_TEN = '拾';
        const CN_HUNDRED = '佰';
        const CN_THOUSAND = '仟';
        const CN_TEN_THOUSAND = '万';
        const CN_HUNDRED_MILLION = '亿';
        const CN_DOLLAR = '元';
        const CN_TEN_CENT = '角';
        const CN_CENT = '分';
        const CN_INTEGER = '整';

        //私有变量
        let integral; //整数部分
        let decimal; // 小数部分
        let outputCharacters; // 返回值
        let parts;
        let digits, radices, bigRadices, decimals;
        let zeroCount;
        let i, p, d;
        let quotient, modulus;

        //判断空值
        if (currencyDigits === '') {
            return '';
        }
        //判断是否有非法字符
        if (currencyDigits.match(/[^,.\d]/) != null) {
            this.formMessageService.error('存在非法字符');
            return '';
        }
        //判断是否符合格式，全数字或.三位分割
        if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
            this.formMessageService.error('不符合要求的格式');
            return '';
        }

        //标准化
        currencyDigits = currencyDigits.replace(/,/g, ''); // 去，分隔符
        currencyDigits = currencyDigits.replace(/^0+/, ''); // 去开始处的0

        //判断是否超过最大值
        if (Number(currencyDigits) > MAXIMUM_NUMBER) {
            this.formMessageService.error('超出能转换的最大值99999999999.99');
            return '';
        }

        //分割整数和小数
        parts = currencyDigits.split('.');
        if (parts.length > 1) {
            integral = parts[0];
            decimal = parts[1];
            //取两位小数
            decimal = decimal.substr(0, 2);
        } else {
            integral = parts[0];
            decimal = '';
        }

        digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
        radices = new Array('', CN_TEN, CN_HUNDRED, CN_THOUSAND);
        bigRadices = new Array('', CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
        decimals = new Array(CN_TEN_CENT, CN_CENT);

        outputCharacters = '';
        //替换整数部分
        if (Number(integral) > 0) {
            zeroCount = 0;
            for (i = 0; i < integral.length; i++) {
                p = integral.length - i - 1;
                d = integral.substr(i, 1);
                quotient = p / 4;
                modulus = p % 4;
                if (d === '0') {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        outputCharacters += digits[0];
                    }
                    zeroCount = 0;
                    outputCharacters += digits[Number(d)] + radices[modulus];
                }
                if (modulus === 0 && zeroCount < 4) {
                    outputCharacters += bigRadices[quotient];
                }
            }
            outputCharacters += CN_DOLLAR;
        }
        //替换小数部分
        if (decimal !== '') {
            for (i = 0; i < decimal.length; i++) {
                d = decimal.substr(i, 1);
                if (d !== '0') {
                    outputCharacters += digits[Number(d)] + decimals[i];
                } else {
                    if (i === 0) {  // 1.03 改为 壹元零叁分 2017/07/24 lucas
                        outputCharacters += CN_ZERO;
                    }
                }
            }
        }
        //若是空字符串，则返回0
        if (outputCharacters == '') {
            outputCharacters = CN_ZERO + CN_DOLLAR;
        }
        //若小数部分为空
        if (decimal === '') {
            outputCharacters += CN_INTEGER;
        }
        return outputCharacters;
    }

    //加法
    plus(arg1: number, arg2: number) {
        let r1, r2, m;
		try { r1 = arg1.toString().split('.')[1].length; } catch (e) { r1 = 0; }
		try { r2 = arg2.toString().split('.')[1].length; } catch (e) { r2 = 0; }
		m = Math.pow(10, Math.max(r1, r2));
		const s1 = Math.round(arg1 * m);
		const s2 = Math.round(arg2 * m);
		return (s1 + s2) / m;
    }

    /* 千分位 */
    thousand(amount: string) {
        let result = '';
        if (Number(amount) < 0) {
            amount = amount.substring(1, amount.length);
            result = '-';
        }
        const amountInt = amount.split('.')[0];
        const amountDeciaml = amount.split('.')[1];
        let str = ''; //字符串累加
        for (let i = amountInt.length - 1, j = 1; i >= 0; i--, j++) {
            if (j % 3 === 0 && i !== 0) {//每隔三位加逗号，过滤正好在第一个数字的情况
                str += amountInt[i] + ','; //加千分位逗号
                continue;
            }
            str += amountInt[i]; //倒着累加数字
        }
        result = result + str.split('').reverse().join('') + '.' + amountDeciaml; //字符串=>数组=>反转=>字符串
        return result;
    }
}
