import { createEffectObject, types } from "../effectHelper";
/**
 * 就是根据传递的task对象 进行取消对应的监听
 * 是可以不传递task的 此时就是取消所在的任务线 就是本身的任务线
 * 传递了 就是指取消task的任务线
 * @param {Task | undefined} task 任务对象
 */
export function cancel(task) {
    return createEffectObject(types.CANCEL, {
        task
    });
}

export function runCancel(env, sagaObject, next) {
    const { task } = sagaObject.payload;
    // 此时就是没有传递对应的任务对象时 就是取消当前所在的任务线
    // next 就是标识当前所在任务线 处理当前effect后续所作的事情
    if (!task) {
        next(undefined, undefined, true);
    }
    // 取消对应的任务线
    task.cancel();
    // 继续往后执行
    next(undefined);
}
