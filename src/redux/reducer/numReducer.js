import { createActions, handleActions, combineActions } from 'redux-actions'

// 表示基本的type类型
export const numTypes = {
    ADD_NUM: 'ADD_NUM',
    DECREASE_NUM: 'DECREASE_NUM',
    ASYNC_ADD_NUM: 'ASYNC_ADD_NUM',
    ASYN_DECREASE_NUM: 'ASYNC_DECREASE_NUM',
    SET_NUM: 'SET_NUM',
}

// actionCreator
export const { addNum, decreaseNum, asyncAddNum, asyncDecreaseNum, setNum } = createActions({
    [numTypes.ADD_NUM]: () => 1,
    [numTypes.DECREASE_NUM]: () => -1,
    [numTypes.SET_NUM]: num => num,
    [numTypes.ASYNC_ADD_NUM]: null,
    [numTypes.ASYN_DECREASE_NUM]: null,
})

// 创建saga函数

export const numReducer = handleActions(
    {
        [combineActions(addNum, decreaseNum)]: (state, { payload }) => state + payload,
        [setNum]: (_, { payload }) => payload,
    },
    10,
)
