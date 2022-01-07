import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './redux/reducer'
import rootSaga from './redux/saga'
// 创建sagamiddleware
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger))

sagaMiddleware.run(rootSaga, 1, 2, 3)
