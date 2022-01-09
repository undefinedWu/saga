// import {
//     call,
//     delay,
//     take,
//     put,
//     select,
//     fork,
//     cancel
// } from "redux-saga/effects";
import {
    call,
    delay,
    select,
    put,
    take,
    fork,
    cancel,
    takeEvery,
    all
} from "../../source_code/effects";
import { numTypes, addNum } from "../reducer/numReducer";

// console.log("delay -->", delay(2000, "尼玛", "chen"));
function test() {
    return new Promise((resolve, reject) => {
        const time = 3000;
        if (Math.random() > 0.5) {
            setTimeout(resolve, time, "resolve");
        } else {
            setTimeout(reject, time, "reject");
        }
    });
}
function* AddNum() {
    yield take(numTypes.DECREASE_NUM);
    console.log("addNum结束");
}
function* AsyncAddNum() {
    const task = yield fork(function* () {
        while (true) {
            yield take(numTypes.ASYNC_ADD_NUM);
            yield fork(function* () {
                yield put(addNum());
                console.log("天佳");
            });
        }
    });
    yield delay(10000);
    yield cancel(task);
    console.log("异步添加结束2");
}
// 当前的参数就是在run的时候进行传递的
export default function* rootSaga(...args) {
    yield all([AddNum(), AsyncAddNum()]);
    console.log("saga任务结束");
    // 但抛出错误的时候
    // try {
    //     let data = yield new Promise(resolve => setTimeout(resolve, 3000, 'resolve'))
    //     console.log(data)
    // } catch (err) {
    //     console.log(err)
    //     yield test()
    // }
    // const task = yield fork(function* () {
    //     while (true) {
    //         yield take(numTypes.ADD_NUM);
    //         // eslint-disable-next-line require-yield
    //         yield fork(function* () {
    //             console.log("异步添加");
    //         });
    //     }
    // }, 123);
    // eslint-disable-next-line require-yield
    // const task = yield takeEvery(numTypes.ADD_NUM, function* () {
    //     console.log("异步添加");
    // });
    // 直接取消对应任务
    // yield delay(8000);
    // const data = yield cancel(task);
    // console.log(data);
    // console.log("saga任务结束", task);
    // try {
    //     yield call(
    //         // function () {
    //         //     console.log(11111);
    //         //     throw new Error("参数有误");
    //         // },
    //         test,
    //         111,
    //         222
    //     );
    // } catch (err) {
    //     console.log(err);
    // }
    // const value = yield delay(2000, "尼玛", "chen");
    // const data = yield select();
    // console.log(data);
    // const putDta = yield put(addNum());
    // console.log(putDta);
    // const action1 = yield take(numTypes.ASYNC_ADD_NUM);
    // const action2 = yield take(numTypes.ADD_NUM);
    // console.log("saga任务结束", action1, action2);
    // console.log(call([null, function () {}, 2]));
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
