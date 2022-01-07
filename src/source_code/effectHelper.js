/**
 * 本文件中的函数就是辅助于我们对effect对象的判断
 */

/** 存储所有的saga指令名称 */
export const types = {
    CALL: 'CALL',
}

// 当前字段用于表示是不是saga指令对象
const flag = '@@redux-saga/IO'

/**
 * 根据传递的类型创建一个saga对象
 * @param {any} type 类型
 * @param {Payload} payload
 * args 调用函数的参数
 * context 表示调用函数的上下文对象
 * fn 表示需要调用的函数
 * @returns {object}
 * type: 表示Effect的类型
 * flag: 用于判断是不是effect对象
 * payload: 就是使用当前指令的时候所调用的函数
 */
export function createEffectObject(type, payload = { args: [], context: null, fn: null }) {
    if (!isValidSagaType(type)) {
        throw new Error('请传递一个有效的sagaType')
    }
    return {
        type,
        [flag]: true,
        payload,
    }
}

/**
 * 判断当前类型是不是一个有效saga指令名称
 * @param {string} type
 * @returns {boolean}
 */
export function isValidSagaType(type) {
    return Object.values(types).includes(type)
}
/**
 * 判断一个对象是不是saga对象
 * @param {any} obj 需要判断的数据
 * @returns {boolean}
 */

export function isSagaObject(obj) {
    return obj && obj[flag]
}
