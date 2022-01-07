// 本文件就是根据对应的saga类型调用runSagaEffect函数

import { types } from './effectHelper'
import { runCall } from './effects/runSagaEffect'

/**
 * @param {any} env 表示全局环境 因为不同的指令可能使用全局对象中的数据
 * @param {sagaObject} sagaObject 表示一个saga对象
 */
export default function runEffect(env, sagaObject) {
    switch (sagaObject.type) {
        case types.CALL:
            runCall()
            break
        default:
            throw new Error(`传递的saga对象类型${sagaObject.type}有误`)
    }
}
