let callbackLists = {}
let eventHub = {
    trigger(eventName, data) { //evnetHub.trigger("chufaOne","pink")
        let callbackList = callbackLists[eventName] // [color=>{this.setState({color:'pink'})}]
        if (!callbackList) {
            return
        }
        for (let i = 0; i < callbackList.length; i++) {
            callbackList[i](data)
        }
    },
    on(eventName, callback) {  //eventHub.on("chufaOne",color=>{})
        if (!callbackLists[eventName]) {
            callbackLists[eventName] = []  
        }
        callbackLists[eventName].push(callback) //{"chufaOne":[color=>{}]}
    }
}
export default eventHub


// vue中通过event-bus 方式可以实现兄弟之间的通信
// let bus = new Vue()
// bus.on("chufaOne",color=>{})
// bus.$emit("chufaOne","pink")

