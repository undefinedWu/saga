import { types, createEffectObject } from "../effectHelper";
/**
 * 创建delay的saga对象
 * 实际上就是利用了call方法可以去调用一个函数
 * @param {number} duration 表示延迟的时间
 * @param {any} value 表示当前指令完成的时候 调用next的时候 传递的值
 */
export function delay(duration, value = true) {
    return createEffectObject(types.CALL, {
        context: null,
        fn: delayPromise,
        args: [duration, value]
    });
}

/**
 * 创建delay所使用的函数 然后利用所使用函数
 * @param {*} duration
 * @param {*} value
 * @returns {PromiseFulfilledResult} 返回一个resolved的promise
 */
function delayPromise(duration, value) {
    return new Promise(resolve => {
        setTimeout(resolve, duration, value);
    });
}
