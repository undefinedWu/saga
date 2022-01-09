// 维护一个对象 进行发布订阅
export class Channel {
    channelCenter = {};
    // 表示添加一个订阅 对于同一个 可以订阅多次
    take(type, handler) {
        if (!this.channelCenter[type]) {
            this.channelCenter[type] = [];
        }
        this.channelCenter[type].push(handler);
        console.log(this.channelCenter);
    }
    // 分发一个订阅 先保存数据 然后删除订阅 再去执行订阅函数
    // 为什么要是上面的顺序
    // 用户分发一个action的时候 就是会执行当前函数
    // this.channelCenter[type] 存储的就是next函数 先执行next的时候 是可能添加相同的订阅的
    // 如果最后删除的话 就1将 之前订阅的也被删除
    put(type, ...args) {
        if (this.channelCenter[type]) {
            const data = this.channelCenter[type];
            delete this.channelCenter[type];
            // 此时就是执行对应的next方法
            data.forEach(it => it(...args));
            // console.log("所有的函数执行完成", this.channelCenter);

            // this.channelCenter[type].forEach(it => it(...args));
            // console.log("所有订阅函数执行完成", this.channelCenter[type]);
            // delete this.channelCenter[type];
        }
    }
}
