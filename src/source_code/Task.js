export default class Task {
    // 表示当前时一个task对象
    "@@redux-saga/TASK": true;
    // 标识当前是否时主线程
    isRoot = undefined;
    // 将当前promise转换成promise是存储 然后决定当前task是否结束了
    resolve = undefined;
    constructor(next, taskObject, isRoot) {
        // 标识对应任务后续步骤方法
        this.next = next;
        this.isRoot = isRoot;
        this.taskObject = taskObject;
        this.taskObject.cb = () => {
            this.resolve && this.resolve();
        };
    }

    cancel() {
        this.next && this.next(undefined, undefined, true);
    }

    toPromise() {
        return new Promise(resolve => {
            this.resolve = resolve;
        });
    }
}
