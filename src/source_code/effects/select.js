import { types, createEffectObject } from "../effectHelper";
export function select(fn) {
    return createEffectObject(types.SELECT, { func: fn || (state => state) });
}

/**
 *
 * @param {global} env 全局都是可以进行使用的函数
 * @param {sagaObject} callSagaObject call指令对应的effect对象
 * @param {Function} next 当前指令处理完成后需要做什么
 */
export function runSelect(env, sagaObject, next) {
    const fn = sagaObject.payload.func;
    // 没有传递函数的时候 此时就是直接返回仓库中的数据
    const state = env.store.getState();
    if (typeof fn !== "function") {
        next(state);
    } else {
        // 调用函数返回的结果
        next(fn(state));
    }
}
