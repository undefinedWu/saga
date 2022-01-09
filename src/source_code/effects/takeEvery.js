import { createEffectObject, types } from "../effectHelper";
import { fork } from "./fork";
import { take } from "./take";
import run from "../run";
/**
 * takeEvery指令 只有分发了对应的actionType的action 才会触发后面的函数自执行
 * @param {any} actionType 监听的actiontype
 * @param {GeneratorFunc} fn 监听到了类型此时执行的函数
 */
export function takeEvery(actionType, fn, ...args) {
    return createEffectObject(types.TAKEEVERY, {
        actionType,
        fn,
        args
    });
}

/**
 * 本质就是利用fork+take来进行实现
 * @param {global} env 全局都是可以进行使用的函数
 * @param {sagaObject} callSagaObject call指令对应的effect对象
 * @param {Function} next 当前指令处理完成后需要做什么
 */
export function runTakeEvery(env, sagaObject, next) {
    const { actionType, fn, args } = sagaObject.payload;

    const task = run(
        env,
        function* (...args) {
            while (true) {
                yield take(actionType);
                // 返回阻塞take的监听
                yield fork(fn, ...args);
            }
        },
        ...args
    );
    next(task);
}
