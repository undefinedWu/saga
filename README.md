# redux-saga的源码分析

## 细节

1. 正常情况下，我们都是创建`sagaMiddleware`,然后创建`store`，**sagaMiddleware.run(rootSaga)**(*此时可以传递参数 最终会被rootSaga所接收到*)
2. 调用当前函数
    - 如果返回的结果不是一个迭代器 此时saga任务直接结束
    - 如果是一个迭代器 此时就是会自动run当前迭代器 直至结束
3. 在run一个迭代器的时候 可能会在yield关键字后面碰到各种情况 **每次迭代的时候 都是会将上一次的数据 携带穿过去的**
    - effect对象（调用指令 此时就是返回一个effect对象） **实际上是在内部进行处理 根据对象中的type属性 调用不同的处理函数**
        - 基本构成:
            1. @@redux-saga/IO: 就是用于标志当前是不是一个Effect对象 ---> 是不是使用了指令
            2. type: 表示当前使用了那种指令
            3. payload: 就是使用当前指令的时候 传递了哪些参数
                - context: this指向问题
                - fn: 需要执行什么函数
                - args: 就是表示执行函数的时候 使用哪些参数
    - promise 此时就是会等待当前promise变成已决 如果是resolved 调用iter.next(resolvedData) 如果是rejected 调用iter.throws(rejectedErr)
    - 普通数据 直接iter.next(data) ```这个地方和co处理的方式不同 co会统一将yield关键字后面的数据都转换成promise 并等待promise到达状态```
4. **在我们分发一个action的时候，我们不难发现，分发的action都是立即向后进行传递了**，如果此时触发了saga任务的监听，再执行对应的逻辑即可
    最佳实践: 在我们需要进行异步的时候，可以分发在reducer中匹配不上的action，然后在异步中获取到数据后，分发真正的action，从而修改在仓库中的数据
5. 在调用run方法后，会返回一个Task对象（`后面会有用`）

## 代码的细节

1. 很明显在一些saga的指令中会使用到仓库中的数据(dispatch --> put, state ---> select),此时就是需要将store进行传递 ===> 我们可以利用到`bind方法的柯理化和返回一个函数`
