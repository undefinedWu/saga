import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
// import createSagaMiddleware from './source_code'
import rootReducer from './redux/reducer'
import rootSaga from './redux/saga'
import { addNum, decreaseNum, setNum, asyncAddNum } from './redux/reducer/numReducer'
// 创建sagamiddleware
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger))

const task = sagaMiddleware.run(rootSaga, 1, 2, 3)
console.log(task)

store.dispatch(asyncAddNum())
