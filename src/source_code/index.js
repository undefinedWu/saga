import run from "./run";
import { Channel } from "./channel";
export default function createSagaMiddleware() {
    return function sagaMiddleware(store) {
        const env = {
            store,
            channel: new Channel()
        };
        // 利用bind的柯理化和返回一个新的函数
        sagaMiddleware.run = run.bind(null, env);
        return function (next) {
            return function (action) {
                console.log("分发action");
                // 直接往后进行移交 并把后面中间件返回的数据直接进行返回
                // return next(action);
                const result = next(action);
                // 发布订阅 将所所分发的action传递过去
                env.channel.put(action.type, action);
                return result;
            };
        };
    };
}
