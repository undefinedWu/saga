import { types, createEffectObject, sagaAction } from "../effectHelper";
export function put(action) {
    return createEffectObject(types.PUT, {
        action: { ...action, [sagaAction]: true }
    });
}

/**
 *
 * @param {global} env 全局都是可以进行使用的函数
 * @param {sagaObject} callSagaObject call指令对应的effect对象
 * @param {Function} next 当前指令处理完成后需要做什么
 */
export function runPut(env, sagaObject, next) {
    const action = sagaObject.payload.action;
    // 此时就是就是需要一个遵循某种表示的函数
    // ...
    env.store.dispatch(action);
    next(action);
}
