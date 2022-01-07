# redux-saga的源码分析

## 基本的细节

1. 正常情况下，我们都是创建`sagaMiddleware`,然后创建`store`，再启动一个saga任务(*此时可以传递参数 最终会被rootSaga所接收到*)，传递`rootSaga`
