+ useState 不能存在于条件判断中
+ useEffect 代替 react 的生命周期函数，它是异步的，不能马上更新页面
+ useEffect 的使用
```
function List () {
    useEffect(()=>{
        console.log(`List 页面`)
        return () =>{
            console.log("离开了List页面")
        }
    },[]) // 第二个参数表示什么变量发生变化了就会触发return，为[]表示只有不使用List时才会触发离开状态
    return (<div>List</div>)
}
```

+ useContext 父子组件的传值
```
// 引入
import { createContext, useContext } from "react"

// 创建要传值的context
let CountContext = createContext()

// 在父组件中使用 CountContext, value 绑定的值就是要传递的值
<CountContext.Provider value={count}>
    <Counter />
<CountContext.Provider>

// 子组件接收值
function Counter () {
    let count = useContext(CountContext);
    return (<p>{count}</p>)
}
```

+ useReducer (redux状态管理)
```
// 引用
import {useReducer} from "react"

//使用
const [count, dispatch] = useReducer((state, action) => {
    switch(action) {
        case "xxx": 
            return state + 1;
        default:
            return state
    }
})
<div>{count}</div>
<button onClick={()=>{dispatch('xxx')}}>xxx</button>
```
+ 使用 useReducer 来代替 redux
详见 Example3 案例

+ useMemo (解决子组件重复执行的问题)
案例见 Example4

+ useRef 获取 DOM 和保存变量
案例见 Example5






