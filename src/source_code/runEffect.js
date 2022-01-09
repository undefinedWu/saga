// 本文件就是根据对应的saga类型调用runSagaEffect函数
import { types } from "./effectHelper";
import { runCall } from "./effects/call";
import { runSelect } from "./effects/select";
import { runPut } from "./effects/put";
import { runTake } from "./effects/take";
import { runFork } from "./effects/fork";
import { runCancel } from "./effects/cancel";
import { runTakeEvery } from "./effects/takeEvery";
import { runAll } from "./effects/all";
/**
 * @param {any} env 表示全局环境 因为不同的指令可能使用全局对象中的数据
 * @param {sagaObject} sagaObject 表示一个saga对象
 * @param {Function} next 表示当前指令处理完成之后下一步需要做什么
 */
export default function runEffect(env, sagaObject, next) {
    console.log(sagaObject.type);
    switch (sagaObject.type) {
        case types.CALL:
            runCall(env, sagaObject, next);
            break;
        case types.SELECT:
            runSelect(env, sagaObject, next);
            break;
        case types.PUT:
            runPut(env, sagaObject, next);
            break;
        case types.TAKE:
            runTake(env, sagaObject, next);
            break;
        case types.FORK:
            runFork(env, sagaObject, next);
            break;
        case types.CANCEL:
            runCancel(env, sagaObject, next);
            break;
        case types.TAKEEVERY:
            runTakeEvery(env, sagaObject, next);
            break;
        case types.ALL:
            runAll(env, sagaObject, next);
            break;
        default:
            throw new Error(`传递的saga对象类型${sagaObject.type}有误`);
    }
}
