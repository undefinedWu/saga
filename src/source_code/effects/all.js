import { createEffectObject, types } from "../effectHelper";
import { proc } from "../run";
/**
 * all会形成阻塞 会等到内部所有的任务 都结束 才算结束
 * 传递一个可迭代的数据 此时每一个可迭代的对象都是需要自动执行的
 * @param {IterableIterator[]} iterators
 */
export function all(iterators) {
    return createEffectObject(types.ALL, {
        funcs: iterators
    });
}

/**
 *
 * @param {global} env 全局都是可以进行使用的函数
 * @param {sagaObject} callSagaObject call指令对应的effect对象
 * @param {Function} next 当前指令处理完成后需要做什么
 */
export function runAll(env, sagaObject, next) {
    const { funcs } = sagaObject.payload;
    // 执行每一个迭代器
    const tasks = funcs.map(it => proc(it, env));
    // 等待所有的saga任务都是执行完成 才会后面的任务
    // 将所有的task转换成promise
    const promises = tasks.map(t => t.toPromise());
    // 当所有promise都是变成已决 才继续往后执行
    Promise.all(promises)
        .then(() => next())
        .catch(err => next(undefined, err));
}
