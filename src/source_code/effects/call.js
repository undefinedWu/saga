import { createEffectObject, types } from "../effectHelper";
import isPromise from "is-promise";
/**
 * 用于产生调用call函数 产生对应的effect对象
 * @param {Function | [any, Function]} fn 表示传递的函数或者数组（上下文和函数）
 * @param {any[]} args 表示调用当前函数传递的参数
 */
export function call(fn, ...args) {
    // 表示上下文和调用函数的对象
    let context = null,
        func = fn;
    // 此时可能传递的是一个数组 但长度小于2的时候 就是有可能拿不到需要调用的函数
    if (Array.isArray(fn)) {
        if (fn.length < 2) {
            throw new TypeError("fn maybe null or undefined");
        } else {
            context = fn[0];
            func = fn[1];
        }
    }
    if (typeof func !== "function") {
        throw new TypeError("传递的fn必须是一个函数");
    }
    return createEffectObject(types.CALL, {
        args,
        fn: func,
        context
    });
}
/**
 * 此函数就是处理call指令的时候 说要运行的逻辑
 * 调用了此函数 因为在外层已经判断了类型 此时就是无需重新判断类型
 * @param {global} env 全局都是可以进行使用的函数
 * @param {sagaObject} callSagaObject call指令对应的effect对象
 * @param {Function} next 当前指令处理完成后需要做什么
 */
export function runCall(env, callSagaObject, next) {
    const { context, fn, args } = callSagaObject.payload;
    let result;
    // 如果指向函数出现错误 此时就是直接抛出
    try {
        result = fn.apply(context, args);
    } catch (err) {
        return next(undefined, err);
    }
    // 如果是一个promise 此时就是需要变成已决再往后进行传递
    if (isPromise(result)) {
        result.then(next).catch(err => next(undefined, err));
    } else {
        next(result);
    }
}
