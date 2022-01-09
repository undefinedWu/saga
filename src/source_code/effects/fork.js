import { createEffectObject, types } from "../effectHelper";
import run from "../run";
/**
 * fork(fn) 此时就是会自动执行内部的函数 不会阻塞后面的执行
 * 类似于新开了一个线程 去监听当前
 * 此时传递的函数 可以时一个普通函数 也是会被立即执行 这里主要考虑传递过来的时一个生成器
 */
export function fork(fn, ...args) {
    return createEffectObject(types.FORK, {
        fn,
        args
    });
}

export function runFork(env, sagaObject, next) {
    const { fn, args } = sagaObject.payload;
    const task = run(env, fn, ...args);
    // 此时主要就是保障下一个调用的时候 所传递的参数
    next(task);
}
