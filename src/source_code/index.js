import run from './run'
export default function createSagaMiddleware() {
    return function sagaMiddleware(store) {
        const env = {
            store,
        }
        // 利用bind的柯理化和返回一个新的函数
        sagaMiddleware.run = run.bind(null, env)
        return function (next) {
            return function (action) {
                // 直接往后进行移交 并把后面中间件返回的数据直接进行返回
                return next(action)
            }
        }
    }
}
