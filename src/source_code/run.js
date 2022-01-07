import Task from './Task'
import isGenerator from 'is-generator'
import isPromise from 'is-promise'
import { isSagaObject } from './effectHelper'
/**
 * 启动saga任务
 * @param {object} env 就是全局环境的数据 这个无需我们进行传递
 * @param {GeneratorFunction} generator 启动任务的时，所传递的saga函数
 * @param {any[]} args 其他参数
 */
export default function run(env, generator, ...args) {
    // 判断是不是一个GeneratorFunc
    if (!isGenerator.fn(generator)) {
        throw new Error('saga任务函数必须是一个Generator函数')
    }
    // 返回一个迭代器
    const iterator = generator(...args)
    onFullFilled()
    // 只执行当前迭代器
    /**
     *
     * @param {any} data 就是yield关键字后面的数据
     * 数据可能情况:
     * effect对象
     * promise
     * 正常的数据
     */
    function onFullFilled(data) {
        let ans
        try {
            ans = iterator.next(data)
        } catch (err) {
            ans = iterator.throw(err)
        }
        next(ans)
    }
    function onRejected(err) {
        let ans
        try {
            ans = iterator.throw(err)
        } catch (e) {
            ans = iterator.throw(e)
        }
        next(ans)
    }
    function next(data) {
        const { done, value } = data
        console.log(done, value)
        // 此时就是结束了
        if (done) {
            return
        }
        if (isSagaObject(data)) {
            // 此时就是需要针对不同的saga类型进行不同的处理
        } else if (isPromise(value)) {
            value.then(onFullFilled).catch(onRejected)
        } else {
            // 就是一个普通数据
            onFullFilled(value)
        }
    }

    return new Task()
}
