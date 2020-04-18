# 安装vuex
+ 首先需要先架构好一个vue项目框架，先安装vue-cli
cnpm install vue-cli -g

+ 下载依赖包
cnpm install

+ 安装vuex 
cnpm install vuex --save   // --save表示生产环境上也依赖

+ 初始化项目 (使用webpack)
vue init webpack myProjectName  // myProjectName为你建立的项目的名称
然后一系列的enter
tips：后续的命名中不能有大写字母

# 使用
+ 在 src 文件夹下新建一个 vuex 文件夹，在 vuex 文件夹下新建一个 store.js 文件
+ 在 store.js 文件中引入如下代码
```
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);
    // 相当于实例中的computed属性
    const state = {
        count: 1
    };
    // getter相当于state中的参数的过滤器
    const getters = {
        count (state) {
            return state.count++;
        }
    };
    // 相当于实例中的methods属性（同步操作）
    const mutations = {
        add (state, n) {
            state.count += n;
        },
        reduce (state) {
            state.count--;
        }
    };
    // 异步操作，主要使用commit进行提交mutations中的方法
    const actions = {
        addActions (context) {
            context.commit('add', 10);
        },
        reduceActions ({commit}) {
            commit('reduce');
        }
    };

    export default new Vuex.Store({
        state,
        getters,
        mutations,
        actions
    });
```

# 在vue实例中使用
+ 首先从文件夹中引入store.js
import store from '@/vuex/store';
+ 在实例中引入store
```
    export default {
        data () {
            return {

            }
        },
        store
    }
```

state中的参数的三种使用方式
+ 直接在模板中使用 {{ $store.state.count }}
+ 在实例的computed中写入count参数，在模板中直接使用 {{ count }}
这里有两种方式写入count
```
    computed: {
        count () {
            return this.$store.state.count;
        }
    }
```
或者 首先需要先引入 mapState 
```
    import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
    computed: mapState({
        count: state => state.count
    });

    // 或者
    computed: mapState(['count'])

    // 或者使用es6的扩展运算符
    computed: {
        ...mapState(['count'])
    }
```
tips: 除了有 mapState 还有 mapMutations、mapActions、mapGetters

+ getters 过滤器也是在 computed 中使用，用于将参数再次进行改变
+ mutations 和 actions 都是在 methods 中使用，用于方法的调用
```
    computed: {
        ...mapState(['count']),
        ...mapGetters(['count'])
    },
    methods: {
        ...mapMutations(['add', 'reduce']),
        ...mapActions(['addActions', 'reduceActions'])
    }
```