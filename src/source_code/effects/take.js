import { createEffectObject, types } from "../effectHelper";
export function take(actionType) {
    return createEffectObject(types.TAKE, {
        actionType
    });
}

/**
 *
 * @param {global} env 全局都是可以进行使用的函数
 * @param {sagaObject} callSagaObject call指令对应的effect对象
 * @param {Function} next 当前指令处理完成后需要做什么
 */
export function runTake(env, sagaObject, next) {
    const type = sagaObject.payload.actionType;
    // 添加一个订阅 并不着急往后进行执行
    // 待到分发action的时候 去检查是否存在当前订阅 如果存在就是直接进行执行
    env.channel.take(type, next);
}
