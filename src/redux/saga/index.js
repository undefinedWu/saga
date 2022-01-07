import { call, delay, take, put } from 'redux-saga/effects'
import { numTypes, addNum } from '../reducer/numReducer'
function test() {
    return new Promise((resolve, reject) => {
        const time = Math.random * 4000 + 1000
        if (Math.random() > 0.5) {
            setTimeout(resolve, time, 'resolve')
        } else {
            setTimeout(reject, time, 'reject')
        }
    })
}

// 当前的参数就是在run的时候进行传递的
export default function* rootSaga(...args) {
    // 但抛出错误的时候
    // try {
    //     let data = yield new Promise(resolve => setTimeout(resolve, 3000, 'resolve'))
    //     console.log(data)
    // } catch (err) {
    //     console.log(err)
    //     yield test()
    // }
    yield call(function () {
        console.log(11111)
    })
    console.log(call([null, function () {}, 2]))
    // yield call(test)
    // console.log(call(test))
    // yield delay(200)
    // console.log(delay(200))
    // const data = yield 1
    // console.log(data)
    // 此时就会监听 并进行阻塞
    // yield take(numTypes.ASYNC_ADD_NUM)
    // yield put(addNum())

    // 测试普通数据
    // const data = yield function () {
    //     console.log(1111)
    // }
    // console.log(data)
    // const dat = yield {
    //     chen: test(),
    // }
    // console.log(dat)
}
