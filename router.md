掘金社区看前端路由面试文章笔记
+ from：https://juejin.im/post/5e85cb8151882573c66cf63f
前端路由：
1、hash
用hash的方案实现路由切换
<ul>
    <li><a href="#luyou1">路由1</a></li>
    <li><a href="#luyou2">路由2</a></li>
    <li><a href="#luyou3">路由3</a></li>
</ul>
<div id="luyouid"></div>
<script>
    class router {
        hashStr: String;
        constructor(has: String){
            this.hashStr = hash;
            this.watchHash();
            this.watch = this.watchHash.bind(this);
            window.addEventListener("hashchange", this.watch);
        }
        watchHash () {
            let hash: String = window.location.hash.slice(1);
            this.hashStr = hash;
            switch(this.hashStr){
                case 'router1': 
                document.querySelector('#router').innerHTML = 'router1';
                break;
                case 'router2': 
                document.querySelector('#router').innerHTML = 'router2';
                break;
                case 'router3': 
                document.querySelector('#router').innerHTML = 'router3';
                break;
            }
        }
    }
</script>

2、history Api
history.pushState()：
+ window.history.pushState(state, title, url)
+ state: 需要保存的数据，这个数据在触发popState事件时，可以在event.state中获取
+ title：标题，一般传null
+ url：设定新的历史记录的url，新的url与当前的url的origin必须是一样的，否则会抛出错误，url可以是绝对路径，也可以是相对路径

history.replaceState()
history.back();
history.forward();
history.go(1);
window.history.length: 查看当前历史堆栈中页面的数量

<script>
    // 对pushState和replaceState实现监听
    var fn = function (type) {
        var orign = history[type];
        return function () {
            var rv = origin.apply(this, arguments);
            var e = new Event(type);
            e.arguments = arguments;
            window.dispatchEvent(e);
            return rv;
        };
    };
    history.pushState = fn('pushState');
    history.replaceState = fn('replaceState');

    // 监听
    window.addEventListener('pushState', (e) => {
        console.log(e);
    });
    window.addEventListener('replaceState', (e) => {
        console.log(e);
    });
</script>

