import Task from "./Task";
import isGenerator from "is-generator";
import isPromise from "is-promise";
import { isSagaObject } from "./effectHelper";
import runEffect from "./runEffect";

// 返回task对象是存在一个属性 标识是否时主线程
let isRoot = true;
/**
 * 启动saga任务
 * @param {object} env 就是全局环境的数据 这个无需我们进行传递
 * @param {GeneratorFunction} generator 启动任务的时，所传递的saga函数
 * @param {any[]} args 其他参数
 */
export default function run(env, generator, ...args) {
    let iterator;
    // 判断是不是一个GeneratorFunc
    if (isGenerator.fn(generator)) {
        iterator = generator(...args);
    } else {
        throw new Error("saga任务函数必须是一个Generator函数");
    }
    return proc(iterator, env);
}
/**
 *
 * @param {IterableIterator} iterator 自动执行的iterator
 * @param {object} 全局环境
 * @returns {Function} 自动执行当前传递的迭代器
 */
export function proc(iterator, env) {
    // 采用引用的形式
    const taskObject = {
        cb: null
    };
    const task = new Task(next, taskObject, isRoot);
    isRoot = undefined;
    next();
    // 自动执行当前迭代器
    function next(data, err, isOver) {
        let ans;
        if (isOver) {
            // 此时当前任务会结束
            ans = iterator.return();
            taskObject.cb && taskObject.cb();
        } else if (err) {
            ans = iterator.throw(err);
        } else {
            ans = iterator.next(data);
        }
        const { done, value } = ans;
        // 此时当前任务会结束
        if (done) {
            taskObject.cb && taskObject.cb();
            return;
        }
        if (isSagaObject(value)) {
            console.log("isSagaObject --->", value);
            // 此时就是需要针对不同的saga类型进行不同的处理
            runEffect(env, value, next);
        } else if (isPromise(value)) {
            value.then(next).catch(err => next(undefined, err));
        } else {
            // 就是一个普通数据
            next(value);
        }
    }
    return task;
}

// onFullFilled();
/**
 *
 * @param {any} data 就是yield关键字后面的数据
 * 数据可能情况:
 * effect对象
 * promise
 * 正常的数据
 */
// function onFullFilled(data) {
//     let ans;
//     try {
//         ans = iterator.next(data);
//     } catch (err) {
//         ans = iterator.throw(err);
//     }
//     next(ans);
// }
// function onRejected(err) {
//     let ans;
//     try {
//         ans = iterator.throw(err);
//     } catch (e) {
//         ans = iterator.throw(e);
//     }
//     next(ans);
// }

// function next(data) {
//     const { done, value } = data;
//     // 此时就是结束了
//     if (done) {
//         return;
//     }
//     if (isSagaObject(data)) {
//         // 此时就是需要针对不同的saga类型进行不同的处理
//         runEffect(env, data, next);
//     } else if (isPromise(value)) {
//         value.then(onFullFilled).catch(onRejected);
//     } else {
//         // 就是一个普通数据
//         onFullFilled(value);
//     }
// }
