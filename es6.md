# 第10章 Symbol
+ 防止属性名冲突，是es6引入类型Symbol的原因
+ Symbol数据类型表示独一无二的值，是JavaScript的第7种语言类型
+ Symbol提供Symbol函数生成，对象的属性名现在可以有两种类型: 字符串、Symbol类型
```
    let s = Symbol();
    typeof s === "symbol";
```
+ Symbol函数不能使用new命令，否则会报错，这是因为生产的Symbol是一个原始类型的值，不是对象，也就是说，Symbol值不是对象，不能添加属性，基本上，它是一种类似于字符串的数据类型。

+ Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述
+ tips: Symbol函数的参数只是对当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的。

+ Symbol值不能与其他类型的值进行运算
+ Symbol值可以显示转换为字符串
+ Symbol值可以转为布尔值，但不能转为数值

## 作为属性名的Symbol
```
    var mySymbol = Symbol();
    // 第一种写法
    var a = {};
    a[mySymbol] = 'hello';
    // 第二种写法
    var a = {
        [mySymbol]: 'hello'
    };
    // 第三种写法
    var a = {};
    Object.defineProperty(a, mySymbol, {value: 'hello'});
```
* tips: Symbol值作为对象属性名时不能使用点运算符。

+ Object.getOwnpropertySymbols()方法返回一个数组，成员是当前对象的所有用作属性名的Symbol值
+ Reflect.ownKeys()方法可以返回所有类型的键名

+ Symbol.for(): 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值，如果有，就返回这个Symbol值，否则就新建一个以该字符串为名称的Symbol值
+ Symbol.keyFor()方法返回一个已登记的Symbol类型值得key
```
    var s = Symbol.for('foo')
    Symbol.keyFor(s)  // 'foo'
```

## 内置Symbol值
+ Symbol.hasInStance属性指向一个内部方法，对象使用instanceof运算符时会调用这个方法，判断该对象是否为某个构造函数的实例。
+ foo instanceof Foo 实际上调用的是Foo[Symbol.hasInstance](foo)
+ Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象使用Array.prototype.concat时是否可以展开。
+ Symbol.species属性指向当前的构造函数，创造实例时默认会调用这个方法，即使用这个属性返回的函数当做构造函数来创造新的实例对象
+ Symbol.match()属性指向一个函数，当执行str.match(myObject)时，如果该
属性存在 会调用它返回该方法的返回值。
+ Symbol.replace 属性指向一个方法 当对象被 String prototype replace
方法调用时会返回该方法的返回值。
+ Symbol search 属性指向 个方法，当对象被 String.prototype search
方法调用时会返回该方法的返回值。
+ Symbo l.split 属性指向 个方法，当对象被 String.prototype.split 方法，调用时会返回该方法的返回值。
+ Symbol.iterator 属性指向该对象的默认遍历器方法。
+ 对象的 Symbol.toPrimitive 属性指向 个方法，对象被转为原始类型的值时会调用这个方法，返回该对象对应的原始类型值。
+ Symbol.toStringTag 属性指向一个方法，在对象上调用 Object
prototype toString 方法时，如果这个属性存在，其返回值会出现在 toString 方法返回的字符串中，表示对象的类型。也就是说，这个属性可用于定制［ object Object ］或［ object Array ］中 object 后面的字符串。
+ Symbo l. unscopables 属性指向一个对象，指定了使用 with 关键字时哪些属性会被 with 环境排除。



* * *


# 第11章 Set和Map数据结构
+ es6提供了新的数据结构：Set。它类似于数组，但是成员的值都是唯一的，没有重复。可以使用Set进行数组去重
`var array2 = [...new Set(array)]`
+ tips：向Set加入智时不会发生类型转换，但在Set中NaN等于自身

## Set实例的属性和方法
### Set 结构的实例有以下属性。
+ Set. prototype. constructor 构造函数，默认就是 Set 函数。
+ Set . prototype . size ：返回 Set 例的成员总数
### 操作方法
+ add (value ）：添加某个值，返回 Set 结构本身。
+ delete(value ）：删除某个值，返回一个布尔值，表示删除是否成功。
+ has (va lue ）：返回 个布尔值，表示参数是否为 Se 的成员。
+ clear （）： 清除所有成员，没有返回值。
### 遍历方法
+ keys 返回键名的遍历器。
+ va lues （）：返回键值的遍历器
+ entries （）：返回键值对的遍历器
+ forEach （）：使用回调函数遍历每个成员

## WeakSet 
WeakSet 结构与 Set 类似，也是不重复的值的集合
+ WeakSet 的成员只能是对象，而不能是其他类型的值
+ ES6 规定 WeakSet 不可遍历 （弱引用）

### WeakSet结构有以下3个方法。
+ WeakSet.prototype.add(value)：向WeakSet实例添加一个新成员。
+ WeakSet.prototype.delete(value)：清除 WeakSet 实例 指定成员。
+ WeakSet.prototype.has(value)： 返回一个布尔值，表示某个值是否在WeakSet实例中。

## Map
+ ES6提供了Map数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

+ 只有对同一个对象的引用， Map结构才将其视为同一个键

+ Map的键实际上是和内存地址绑定的，只要内存地址不一样，就视为两个键。

+ 如果Map的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map就将其视为一个键，包括0和-0 。另外，虽然NaN不严格等于自身，但 Map 将其视为同一个键。

### 实例的属性和操作方法
+ size：返回 Map 结构的成员总数。
+ set(key, value)：set方法设置key所对应的键值，然后返回整个Map结构。如果key己经有值，则键值会被更新，否则就新生成该键。
+ get(key)：get方法读取key对应的键值，如果找不到key，则返回undefined
+ has(key)：has方法返回一个布尔值，表示某个键是否在Map数据结构中
+ delete(key)：delete方法删除某个键,返回true,如果删除失败,则返回 false
+ clear()：clear方法清除所有成员，没有返回值。

### 遍历方法
Map原生提供了3个遍历器生成函数和1个遍历方法
+ keys()：返回键名的遍历器
+ values()：返回键值的遍历器
+ entries()：返回所有成员的遍历器。
+ forEach()：遍历Map的所有成员

## WeakMap 
+ WeakMap结构与Map结构类似，也用于生成键值对的集合。
+ WeakMap 只接受对象作为键名（ null 除外），不接受其他类型的值作为键名。
+ WeakMap 的键名所指向的对象不计入垃圾回收机制。
+ WeakMap 的专用场景就是它的键所对应的对象可能会在将来消失的场景。
+ WeakMap结构有助于防止内存泄漏。
+ WeakMap弱引用的只是键名而不是键值 键值依然是正常引用的
+ get()、 set()、 has()
+ 注册监听事件的listener对象很适合用weakMap来实现。
```
    const listener = new WeakMap();
    listener.set(el, handler1)
    el.addEventListener('click', listener.get(el), false);
```


***


# 第12章 Proxy 
Proxy可以理解成在目标对象前架设 个“拦截”层 ，外界对该对象的访问都必须先通过这层拦截，因此提供了一种机制可以对外界的访问进行过滤和改写。 Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”
`var proxy = new Proxy(target, handler);`

+ Proxy 实例也可以作为其他对象的原型对象。
```
    var proxy = new Proxy({}, {
        get (target, property) {
            return 35;
        }
    });
    let obj = Object.create(proxy);
    obj.time // 35
```

## 实例方法
+ get(target, propKey, eceiver)
+ set(target, propKey, value, receiver) 
+ apply(): apply方法拦截函数的调用、call、apply 操作。
+ has()：has 方法用来拦截 HasProperty 操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是 in 运算符。
+ has 拦截只对 in 循环生效，对 for...in 循环不生效。
+ construct()：construct 方法用于拦截 new 命令，construct 方法返回的必须是一个对象，否则会报错。
+ construct()：construct 方法用于拦截 new 命令，construct 方法返回的必须是一个对象，否则会报错。
+ deleteProperty(): deleteProperty 方法用于拦截 delete 操作 （configurable为true或undefined） ，如果这个方法抛出错误或者返回 false,当前属性就无法被delete命令删除。
+ construct()：construct 方法用于拦截 new 命令，construct 方法返回的必须是一个对象，否则会报错。
defineProperty()：defineProperty方法拦截了Object.defineProperty操作。
+ construct()：construct 方法用于拦截 new 命令，construct 方法返回的必须是一个对象，否则会报错。
+ getOwnPropertyDescriptor(): 拦截 Object.getOwnPropertyDescriptor (),返回一个属性描述对象或者undefined
+ construct()：construct 方法用于拦截 new 命令，construct 方法返回的必须是一个对象，否则会报错。
getPrototypeOf(): getPrototypeOf方法主要用来拦截获取对象原型
+ construct()：construct 方法用于拦截 new 命令，construct 方法返回的必须是一个对象，否则会报错。
isExtensible(): 拦截 Object.isExtensib()操作。
+ construct()：construct 方法用于拦截 new 命令，construct 方法返回的必须是一个对象，否则会报错。
ownKeys(): 用来拦截对象自身属性的读取操作
+ construct()：construct 方法用于拦截 new 命令，construct 方法返回的必须是一个对象，否则会报错。
preventExtensions():拦截 Object.preventExtensions(),该方法必须返回一个布尔值，否则会被自动转为布尔值。
+ construct()：construct 方法用于拦截 new 命令，construct 方法返回的必须是一个对象，否则会报错。
setPrototypeOf(): 拦截Object.setPrototypeOf()方法。
+ construct()：construct 方法用于拦截 new 命令，construct 方法返回的必须是一个对象，否则会报错。
+ Proxy.revocable():Proxy.revocable()方法返回一个可取消的Proxy实例




***


# 第13章 Reflect
## Reflect的设计目的：
+ 将Object对象的某些明显属于语言内部的方法（比如Object.defineProperty)放到Reflect对象上.
+ 修改某些Object方法的返回结果，让其变得更合理。比如，Object.
defineProperty(obj, name, desc)在无法定义属性时会抛出一个错误，而
Reflect.defineProperty(obj, name, desc)则会返回false
+ 让Object操作都变成函数行为。
+ Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就使 Proxy 对象可以方便地调用对应的Reflect方法来完成默认行为，作为修改行为的基础。也就是说，无论 Proxy 怎么修改默认行为，我们总可以在 Reflect 上获取默认行为。

## Reflect 对象共有13个静态方法， 如下所示
+ Reflect.apply(target, thisArg, args)
+ Reflect.construct(target, args)
+ Reflect.get(target, name, receiver)
+ Reflect.set(target, name, value, receiver)
+ Reflect.defineProperty(target, name, desc)
+ Reflect.deleteProperty(target, name)
+ Reflect.has(target, name)
+ Reflect.ownKeys(target)
+ Reflect.isExtensible(target)
+ Reflect. preventExtensions(target)
+ Reflect.getOwnPropertyDescriptor(target, name)
+ Reflect.getPrototypeOf(target)
+ Reflect.setPrototypeOf(target, prototype) 


***


# 第14章 Promise对象
## Promise对象有以下两个特点
+ 对象的状态不受外界影响。 Promise 对象代表一个异步操作，有3种状态： Pending（进行中）、 Fulfilled（己成功）和 Rejected（己失败）。只有异步操作的结果可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
+ －旦状态改变就不会再变，任何时候都可以得到这个结果。 Promise 对象的状态改变只有两种可能：从 Pending 变为 Fulfilled 和从 Pending 变为 Rejected 。只要这两种情况发生，状态就凝固了，不会再变，而是一直保持这个结果，这时就称为 Resolved （己定型）
+ 如果调用 resolve 函数和 reject 函数时带有参数，那么这些参数会被传递给回调函数。

## Promise.prototype.then()
Promise 实例具有 then 方法，即 then 方法是定义在原型对象Promise.prototyp。它的作用是为 Promise 实例添加状态改变时的回调函数 前面说过， then 方法的第一个参数是 Resolved 态的回调函数，第二个参数（可选）是 Rejecte 状态的回调函数。

## Promise.prototype.catch() 
Promise.prototype.catch 方法是 then(null, rejection)的别名，用于指定发生错误时的回调函数。如果 Promise 状态己经变成 Resolved ，再抛出错误是无效的。Promise对象的错误具有“冒泡”性质 向后传递，直到被捕获为止。 也就是说，错误总是会被下一个catch语句捕获。

## Promise.all() 
Promise.all()方法用于将多个 Promis 实例包装成一个新的 Promise 实例。
`var p = Promise.all([p1, p2, p3])`
如果参数不是Promise实例，辉县调用Promise.resolve(),将参数转为Promise实例（Promise.all()的参数是具有Iterator接口的）
p的状态分两种情况：
+ 只有 pl、p2、p3的状态都变成Fulfilled的状态才会变成Fulfilled，此pl、p2、p3 的返回值组成一个数组，传递给p的回调函数。
+ 只要pl、p2、p3 中有一个被Rjected，p的状态就变成Rejected此时第一个被Rjected的实例的返回值会传递给p的回调函数。

## Promise.race() 
Promise.race()方法同样是将多个Promise实例包装成一个新的Promise实例。
`var p = Promise.race ([pl , p2 , p3]) ; `
只要pL、p2、p3中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值就传递给p的回调函数。

## Promise.resolve() 
有时需要将现有对象转为Promise对象，Promise.resolve()方法就起到这个作用。
```
var jsPromise = Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```
### Promise resolve()方法的参数分成以下4种情况。
+ 参数是一个 Promise 实例: 如果参数是 Promise 实例 ，那么Promise.resolve 将不做任何修改，原封不动地返回这个实例。
+ 参数是一个 thenable 对象：thenable对象指的是具有then方法的对象，Promise.resolve()方法会将这个对象转为Promise对象，然后立即执行thenable对象的then方法
+ 参数不是具有 then 方法的对象或根本不是对象：如果参数是一个原始值，或者是一个不具有 then 方法的对象，那么 Promise.resolve()方法返回一个新的Promise对象，状态为Resolved
+ 不带有任何参数： 如果希望得到Promise对象 比较方便的方法就是直接调用 Promise.resolve()方法。

## Promise.reject() 
Promise.reject(reason)方法也会返回 个新的Promise实例，状态为Rejected
```
var jsPromise = Promise.reject('出错了')
// 等价于
new Promise((resolve, reject) => reject('出错了'))
```

## down()
提供一个down方法，它总是处于回调链的尾端，保证抛出任何可能出现的错误。
done 方法可以像 then 方法那样使用，提供 Fulfilled和 Rejected 状态的回调函数，也可以不提供任何参数。但不管怎样， done 方法都会捕捉到任何可能出现的错误，并向全局抛出。

## finally()
finally 方法用于指定不管 Promise 象最后状态如何都会执行的操作。它与 done 方法的最大区别在于，它接受 个普通的回调函数作为参数，该函数不管怎样都必须执行

## Promise.try()
不知道或者不想区分函数f是同步函数还是异步操作，但是想用Promise来处理它 因为这样就可以不管f是否包含异步操作，都用then方法指定下一步流程 ，用catch方法处理f抛出的错误
下面的方法让同步函数同步执行，异步函数异步执行：
+ async函数：
```
const f = () => console.log('now);
(async () => f())();
console.log('next');
// now
// next
```
+ new Promise()
```
const f = () => console.log('now');
(
    () => new Promise( resolve => resolve(f()))
)();
console.log('next');
// now
// next
```
+ Promise.try() 提案
Promise.try()是模拟了 try 代码块
`Promise.try(fn()).then().catch()`


***

# 第 15 章 Iterator 和 for...of 循环
遍历器（ Iterator ）就是这样一种机制 。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构，只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）

## Iterator的作用
+ 为各种数据结构提供一个统的、简便的访问接口；
+ 二是使得数据结构的成员能够按某种次序排列；
+ 三是ES6创造了某种新的遍历命令————for...of循环，Iterator接口主要供 for...of 消费。

## 默认 Iterator 接口
所有部署了 Symbol.iterator 属性的数据结构都称为部署了遍历器接口。调用这个接口就会返回一个遍历器对象
原生具备 Iterator 接口的数据结构如下：
+ Array
+ Map
+ Set
+ String
+ TypedArray
+ 函数的arguments对象
+ NodeList对象

对于类似数组的对象（存在数值键名和length属性），部署Iterator接口有一个简便方法，即使用Symbol.iterator方法直接引用数组的Iterator接口
`NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]`
或者
`NodeList.prototype[Symbol.iterator] = [][Symbol.iterator]`
或者
`[...document.querySelectAll('div')]`
类似数组调用数组的Symbol.iterator方法的例子
```
let iterable = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype(Symbol.iterator)
};
for(let item of iterator){
    console.log(item);   // 'a','b','c'
}
```
+ tips: 普通对象部署数组的 Symbol.iterator 方法并无效果
+ 如果 Symbol.iterator 方法对应的不是遍历器生成函数（即会返回一个遍历器对象），解释引擎将报错。

## 调用Iterator接口的场合
+ 解构赋值
对数组和 Set 结构进行解构赋值时，会默认调用 Symbol.iterator 方法。
+ 扩展运算符
扩展运算符(...) 也会调用默认 Iterator 接口
```
    var str = 'hello';
    [...str] // ['h','e','l','l','o']
```
可以将任何部署了 Iterator 接口的数据结构转为数组就是说只要某个数据结 部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。
+ yield*
yield* 后面跟的一个可遍历的结构，它会调用该结构的遍历器接口。
+ 其他场合
由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数得场合其实都调用了遍历器接口。

## 遍历器对象的return()、throw()
遍历器对象除了具有 next 方法，具有 return 方法和 throw 方法。
return 方法的使用场合是，如果 for...of 循环提前退出（通常是因为出错，或者有break 语句或 continue 语句），就会调用 return 方法；如果某个对象在完成遍历前需要清理或释放资源，就可以部署 return 方法。
+ tips: return 方法必须返回一个对象，这是 Generator 规格决定的。
```
    function readLinesSync (file) {
        return {
            next () {
                return { done: true };
            },
            return () {
                file.close();
                return { done: true };
            },
        };
    }
    for(let line of readLinesSync(fileName)){
        console.log(line);
        break; // 调用return方法
    }
```

## for...of
+ for...of 循环内部调用的是数据结构的Symbol.iterator方法。
+ for .. . of 循环可以使用的范围包括数组、 Set和Map结构、某些类似数组的对象（比如arguments对象DOMNodeList对象）、Generat对象，以及字符串。
+ 数组原生具备iterator接口（即默认部署了Symbol.iterator属性），for...of循环本质上就是调用这个接口产生的遍历器.
+ for...of 循环可以代替数组实例的 forEach 方法。
+ for...of 循环允许遍历获得键值。
```
var arr = ['a','b','c','d'];
for(let a of arr){
    console.log(a);   // a b c d
}
```
+ for...of循环调用遍历器接口 ，数组的遍历器接口只返回具有数字索引的属性
```
var arr = [1,2,3];
arr.foo = 'hello'
for(let a of arr){
    console.log(a);   // '1' '2' '3'  不会反悔arr的foo属性
}
```
+ Set 结构遍历时返回的是一个值，而 Map结构遍历时返回的是一个数组，该数组的两个成员分别为当前Map成员的键名和键值。

+ 并不是所有类似数组的对象都具有 Iteator 接口，一个简便的解决方法就是使用Array.from 方法将其转为数组。

+ 对于普通的对象， for...of 结构不能直接使用，否则会报错，必须部署了 Iterator 接口才能使用
一种解决方法是，使用 Object keys 方法将对象的键名生成 个数组，然后遍历这个数组。
另一个方法是使用 Generator 函数将对象重新包装一下。


***

第 16 章 Generator 函数的语法
# 基本概念
对于 Generator 函数有多种理解角度 从语法上，首先可以把它理解成一个状态机，封装了多个内部状态。
执行 Generator 函数会返回 个遍历器对象 也就是说， Generator 函数除了是状态机，还是一个遍历器对象生成函数。返回的遍历器对象可以依次遍历 Generator 函数内部的每一个状态。
```
    function* helloWorldGenerator () {
        yield 'hello';
        yield 'world';
        return 'ending';
    }
    var hw = helloWorldGenerator();
    hw.next();  // { value: 'hello', done: false }
    hw.next();  // { value: 'world', done: false }
    hw.next();  // { value: 'ending', done: true }
    hw.next();  // { value: undefined, done: true }
```

## yield 表达式
+ 只有调用 next 方法且内部指针指向该语句 时才会执 yield 语句后面的表达式，因此等于为 JavaScript 提供了手动的 “惰性求值”（Lazy Evaluation ）的语法功能
+ yield 表达式如果用在另一个表达式之中，必须放在圆括号里面。
+ yield 表达式用作函数参数或放在赋值表达式的右边，可以不加括号。

## 与Iterator接口的关系
+ 由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol iterator 属性，从而使得该对象具有 Iterator 接口
+ Generator 函数执行后返回某个遍历器对象。该对象本身也具有Symbol.iterator性，执行后返回自身。
```
    function* gen () {}
    var g = gen();
    g[Symbol.iterator]() === g;  // true
```

## next方法的参数
+ yield 语句本身没有返回值，或者说总是返回 undefined。next 方法可以带有 个参数，该参数会被当作上 yield 语句的返回值
注意
+ next 方法的参数表示上一条 yield 语句的返回值 所以第一次使用 next 方法时传递参数是无效的。
如果想要在第一次调用 next 方法时就能够输入值，可以在 Generator 函数外面再包一层。

## for...of 循环
for...of 循环可以自动遍历 Generator 函数生成的 Iterator 对象，且此时不再需要调 next 方法。
+ tips: 一旦 next 方法的返回对象的done属性为true， for...of 循环就会终止，且不包含该返回对象。

## Generator.prototype.throw() 
+ Generator 函数返回的遍历器对象都有 throw 方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获
+ throw 方法可以接受一个参数，该参数会被 catch 语句接收，建议抛出 Error 对象的实例。
+ 如果 Generator 函数内部部署了 try...catch 代码块，那么遍历器的 throw 方法抛出的错误不影响下一次遍历，否则遍历直接终止。
+ throw 方法被捕获以后会附带执行下一条 yield 表达式，即附带执行一次 next 方法。

## Generator.prototype.return() 
Generator 函数返回的遍历器对象还有一个 return 方法，可以返回给定的值，并终结 Generator 函数的遍历。
+ 如果 Generator 函数内部有 try...finally 代码块，那么 return 方法会推迟到 finally 代码块执行完再执行。

## yield* 表达式
yield* 语句用来在一个 Generator 函数里面执行另一个 Generator 函数
```
    function* foo () {
        yield 'a';
        yield 'b';
    }
    function* bar () {
        yield 'x';
        yield* foo();
        yield 'y';
    }
    // 等同于
    function* bar () {
        yield 'x';
        yield 'a';
        yield 'b';
        yield 'y';
    }
```
+ yield* 后面的 Generator 函数（没有 return 语句时）不过是 for...of
的一种简写形式，完全可以用后者替代。反之，在有 return 语句时则需要用 var value = yield* iterator 的形式获取 return 语句的值
+ 如果被代理的 Generator 函数有 return 语句，那么便可以向代理它的 Generator 函数返回数据。

## 作为对象属性的 Generator 函数
```
    let obj = {
        * myGeneratorMethod () {
            // dosomething
        }
    };
    // 等价于
    let obj = {
        myGeneratorMethod: function* () {
            // dosomething
        }
    };
```


***

# 第 18 章 async 函数
+ async 函数就是 Generator 函数的语法糖
+ async内置执行器
+ async函数的返回值是Promise对象，Generator函数的返回值是Iterator对象
+ async函数可以看作由多个异步操作包装成的一个Promise对象，而await命令就是内部的then命令的语法糖
+ async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数。
+ async 函数返回的 Promise 对象必须等到内部所有 await 命令后面的 Promise 对象执行完才会发生状态改变，除非遇到 return 语句或者抛出错误。也就是说只有 async 函数内部的异步操作执行完，才会执行 then 方法指定的回调函数。
+ await 命令后面是 Promise 对象。如果不是，会被转成一个立即 resolve 的 Promise 对象。
+ 希望多个请求并发执行，可以使用 Promise.all 方法
+ for await...of 用于遍历异步的Iterator接口，for...of 循环自动
调用这个遍历器的口 next 方法会得到 Promise 对象。 await 用来处理这个 Promise 对象，resolve ，就把得到的值传入 for...of 的循环体中。如果 next 方法返回的 Promise 对象被 reject, for await...of 就会报错，要用try...catch 捕捉。它也可以用于同步遍历器。

## 异步 Generator 函数
设计目的之一是使 Generator 函数处理同步操作和异步操作时能够使用同一套接口。
同步操作：
```
    async function* gen () {
        yield 'hello';
    }
    const genObj = gen();
    genObj.next().then(x => console.log(x))
    // {value: 'hello', done: false}
```
异步操作:
```
    async function* map (iterable, func){
        const iter = iterable[Symbol.asyncIterator]();
        while(true){
            const {value, done} = await iter.next();
            if(done) break;
            yield func(value);
        }
    }
```
+ tips: 普通async函数返回的是一个Promise对象，而异步Generator函数返回的是一个Iterator对象，前者自带执行器，后者通过 for await...of 执行，或自己编写执行器

+ JavaScript 有 4 种函数形式： 普通函数、async函数、Generator函数和异步Generator函数

## yield* 语句
yield* 语句也可以与异步遍历器一起使用
```
    async function* gen1 () {
        yield 'a';
        yield 'b';
        yield '2';
    }
    async function* gen2 () {
        const res = yield* gen1();
    }
    (async function () {
        for await (const x of gen2()){
            console.log(x);
        }
    })();
    // a
    // b
    // 2
```


*** 
# 第 19 章 Class的基本语法
# 简介
+ 构造函数的 prototype 属性在ES6的“类”上继续存在。事实上，类的所有方法都定义在类的 prototype 属性上。
+ 在类的实例上调用方法，其实就是调用原型上的方法。
```
    class B {}
    let b = new B();
    b.constructor === B.prototype.constructor  // true
```
+ 类的内部定义的所有方法都是不可枚举的
+ 类的属性名可以采用表达式

# Class 表达式
与函数一样，Class也可以使用表达式的形式定义
```
    const MyClass = class Me {
        getClassName () {
            return Me.name;
        }
    };
    let inst = new MyClass();
    inst.getClassName()   // Me
```
# 不存在变量提升
类不存在变量提升

# this 的指向
类的方法内部如果含有this，它将默认指向类的实例，但如果内部方法单独使用，可能会报错。如果内部方法中有使用到this，因为单独使用this指向变成了window，会找不到一些方法。
解决方法:
+ 在构造方法中绑定this
+ 使用箭头函数
+ 使用Proxy，在获取方法的时候自动绑定this
+ 与 ES5 一样，在“类”的内部可以使用 get、set 关键字对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
+ 类相当于实例的原型，所有在类中定义的方法都会被实例继承。如果在一个方法前加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类调用，称为“静态方法”
+ 父类的静态方法可以被子类继承。
+ 静态方法也可以从 super 对象上调用。
+ ES6 明确规定， Class 内部只有静态方法，没有静态属性
+ Class 的静态属性只要在上面的实例属性写法前面加上 static 关键字就可以了。
## new.target 属性
new 是从构造函数生成实例的命令。 ES6为 new 命令引入了 new.target 属性，（在构造函数中）返回 new 命令所作用的构造函数 如果构造函数不是通过 new 命令调用的，那么 new.target 会返回 undefined ，因此这个属性可用于确定构造函数是怎么调用的

***

# 第 20 章 Class 的继承
+ ES6 的继承机制完全不同，实质是先创造父类的实例对象 this（所以必须先调用 super 方法） 然后再用子类的构造函数修改 this
+ 在子类的构造函数中，只有调用 super 之后才可以使用 this 关键字 ，否则会报错 。这是因为子类实例的构建是基于对父类实例加工，只有 super 方法才能返回父类实例。
+ super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，因此super()在这里相当于A.prototype.constructor.call(this)
+ 由于 super 指向父类的原型对象，所以定义在父类实例上的方法或属性是无法通过 super 调用的
+ ES6 规定，通过 super 调用父类的方法时， super 会绑定子类的 this
+ 如果 super 作为对象用在静态方法之中，这时 super 将指向父类，而不是父类的原型对象。
+ super 在静态方法之中指向父类，在普通方法之中指向父类的原型对象。
使用 super 的时候，必须显式指定是作为函数还是作为对象使用，否则会报错。
```
    class Parent {
        static myMethod (msg) {
            console.log('static', msg);
        }
        myMethod (msg) {
            console.log('instance', msg);
        }
    }
    class Child extends Parent {
        static myMethod (msg) {
            super.myMethod(msg);
        }
        myMethod (msg) {
            super.myMethod(msg);
        }
    }
    Child.myMethod(1);  // static 1
    var child = new Child();
    child.myMethod(2);  // instance 2
```
+ 由于对象总是继承其他对象的，所以可以在任意一个对象中使用 super 关键字。

## 类的 prototype 属性和＿proto一属性
Class 作为构造函数的语法糖，同时有 prototype 属性和＿proto__属性，因此同时存在两条继承链
+ 子类的 __proto__ 属性表示构造函数的继承，总是指向父类。
+ 子类 prototype 属性的 __proto__ 属性表示方法的继承，总是指向父类的
prototype 属性
```
    class A{}
    class B extends A {}
    console.log(B.__proto__ === A)  // true
    console.log(B.prototype.__proto__ === A.prototype) //true
```