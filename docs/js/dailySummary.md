# 一些日常总结
## 动态获取浏览器宽高；
```
mounted() {
	// 动态获取浏览器宽;
	window.onresize = () => {
		return (() => {
			this.clientWidth = document.body.clientWidth;
			this.computedScreenWidth();
		})();
	};
},
computedScreenWidth() {
	if (this.clientWidth < 1280) {
		this.clientWidth = 1280;
	}
	// 会中布局16:9;
	this.clientLeftWidth = this.clientWidth * (16 / 21.4);
	this.clientLeftHeight = (9 * this.clientLeftWidth) / 16;
	this.clientRightHeight = this.clientLeftHeight / 3;
	this.clientRightWidth = this.clientRightHeight * (16 / 9);
},
```

## vue之中DOM渲染完成后操作DOM；
```
	// DOM渲染完成后拿到要操作的DOM;
	this.$nextTick(() => {
		var lastVideoElementNum = document.getElementsByClassName('h26').length;
		if (lastVideoElementNum > 0) {
		var lastVideoElement = document.getElementsByClassName('h26')[lastVideoElementNum - 1];
		lastVideoElement.style.borderBottom = '1px solid #fff';
		}
	})
```

## 浏览器添加全局的提醒框；
```
	if(window.Notification) {
		var notification = new Notification('你有一条新信息', {
			body: "显示的信息",
		});
		setTimeout(function() { notification.close(); }, 多少毫秒之后消失);
	}
```

## 实现展开折叠;

因开发需要写几个页面，药品说明书页面，因为文案篇幅较长，所以添加了展开折叠功能。百度许久网上的帖子真的是一言难尽那，还好最后自己想到了一招。因为是几个静态页面，为了方便操DOM所以引进来了jq，虽然它很老，但是我不否认写原生页面操作DOM它简直是牛逼的一批。好了，不扯闲话了。上代码。  
```
html: 
<div class="normalName">
	<p class="title">孕妇提醒</p>
	<p class="con clip" id="tips">假装这是一段很长需要折叠的代码。</p>
	<p class="open">
	<span>展开</span><img src="assets/img/open.png" alt="">
	</p>
	<p class="close">
	<span>收起</span><img src="assets/img/close.png" alt="">
	</p>
</div>

css: 
.normalName .con {
    font-size: 0.15rem;
    font-weight: 500;
    color: rgba(41, 47, 56, 1);
    line-height: 0.3rem;
    padding-left: .1rem;
    -webkit-box-orient: vertical;
}

.normalName .clip {
    overflow: hidden;  // 超出部分隐藏;
    text-overflow: ellipsis; // 显示三个点;
    display: -webkit-box;
    -webkit-line-clamp: 3;  // 显示几行;
}

js: 
// 判断行数是否需要显示展开按钮（为了适应不同手机的宽） 三行的高度是90;
// 如果考虑到resize也可以单独写在一个方法里，监听resize事件调用即可很简单不赘述;（但是移动端一般不会有resize事件）
if ($("#tips").removeClass("clip").height() <= 90) {
	$(".close").hide();
	$(".open").hide();
} else {
	$(".close").hide();
	$("#tips").addClass("clip")
	$(".open").click(() => {
		$("#tips").removeClass("clip");
		$(".open").hide();
		$(".close").show();
	})
	$(".close").click(() => {
		$("#tips").addClass("clip");
		$(".close").hide();
		$(".open").show();
	})
}

```
是的，聪明人看代码就已经知道了实现方案==。  
思路：  
判断是否需要动态添加.clip 即是否显示隐藏而出现三个点。如果行高大于90，我们则去显示展开按钮并且添加clip的class，点击展开则移除掉.clip正常显示，并显示收起按钮；若行高小于等于90，则我们展开收起按钮都无需显示。  

## window.open父子传值：
父页面：
```
<p><input type="text" name="test1" id="usr" value="******"/></p>
<p><input type="text" name="test2" id="pwd" value="**********"/></p>
<button onclick="openWindow()">打开子页面</button>

function openWindow() {
	window.open("./2.html",'newwindow', 'height=100, width=400, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
}
```

子页面：
```
<body>
    父窗口带过来的用户名：<p id="son1"></p>
    父窗口带过来的密码：<p id="son2"></p>
</body>

document.getElementById("son1").textContent = opener.document.getElementById("usr").value
document.getElementById("son2").textContent = opener.document.getElementById("pwd").value
```

## 不知道的js系列之上篇；  

### 1. 关于作用域：  
- 作用域是一套规则，用于确定在何处以及何时查找变量（标识符）。  
- 如果查找的目的是对变量进行赋值，则会使用LHS查询/如果目的是为了获取变量的值，则会进行RHS查询。  
- 赋值操作会导致LHS查询  
- 不成功的RHS引用会导致抛出ReferenceError异常，不成功的LHS引用会导致自动隐式的创建一个全局变量（非严格模式），严格模式下抛出ReferenceError异常 
- 词法作用域以为这作用域是由书写代码时函数声明的位置来决定的。编译的词法分析阶段基本能够知道全部标识符在哪里以及是如何声明的，从而能够预测在执行过程中如何对他们进行查找。
- eval(...) 可以对一段包含一个或者多个声明的“代码”字符串进行演算，并借此来修改已经存在的词法作用域（在运行时）。
- with 本质上是通过将一个对象的引用当作作用域来处理，将对象的属性当作作用域中的标识符来处理，从而创建了一个新的词法作用域（也是在运行时）。
- 以上两个机制的副作用是引擎无法在编译时对作用域查找进行优化。因为引擎只能谨慎的认为这样的优化是无效的。使用这俩中的任何一个都会使得代码运行变慢！！！
### 2. 函数作用域：
- 最小授权/最小暴露原则：私有化，学会函数封装;
- 规避冲突：1. 全局命名空间 2. 模块管理；
- 函数声明和函数表达式最重要的区别是他们的名称标识符将会绑定在何处；

## 关于两大module；

### 1. ES6 module：  
- 简称为ESM 使用关键字为export import；
- 若在&lt;script&gt;标签中，则需要声明 type="module" 代表是加载ES6模块 默认启用defer属性（代表全部加载完DOM后再执行此模块，另一个属性为async 表示若模块加载完立即执行 不用等DOM渲染完成 可能会中途阻止DOM渲染）；
- 导出的是值的引用，内部的变化会引起引用的值的变化；
- 自动采用严格模式，不管有没有声明 use strict；
- 模块之中，顶层的this返回undefined，不会指向window，所以顶层的this是无意义的（感觉是个闭包的亚子）；
- 同一个模块若加载多次，只执行一次。
### 2. CommonJS：
- 简称为CJS，使用关键字为require() module export()...;
- 导出的是一个值的拷贝，内部变化不影响引用的值；
### 3. 代码解释什么叫值的拷贝和引用：
CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个模块文件lib.js的例子。
```
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```
上面代码输出内部变量counter和改写这个变量的内部方法incCounter。然后，在main.js里面加载这个模块。
```
// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```
上面代码说明，lib.js模块加载以后，它的内部变化就影响不到输出的mod.counter了。这是因为mod.counter是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。
```
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};
```
上面代码中，输出的counter属性实际上是一个取值器函数。现在再执行main.js，就可以正确读取内部变量counter的变动了。
```
$ node main.js
3
4
```
ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

还是举上面的例子。
```
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```
上面代码说明，ES6 模块输入的变量counter是活的，完全反应其所在模块lib.js内部的变化。

再举一个出现在export一节中的例子。
```
// m1.js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);

// m2.js
import {foo} from './m1.js';
console.log(foo);
setTimeout(() => console.log(foo), 500);
```
上面代码中，m1.js的变量foo，在刚加载时等于bar，过了 500 毫秒，又变为等于baz。

让我们看看，m2.js能否正确读取这个变化。
```
$ babel-node m2.js

bar
baz
```
上面代码表明，ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。

由于 ES6 输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。
```
// lib.js
export let obj = {};

// main.js
import { obj } from './lib';

obj.prop = 123; // OK
obj = {}; // TypeError
``` 
上面代码中，main.js从lib.js输入变量obj，可以对obj添加属性，但是重新赋值就会报错。因为变量obj指向的地址是只读的，不能重新赋值，这就好比main.js创造了一个名为obj的const变量。

最后，export通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例。
``` 
// mod.js
function C() {
  this.sum = 0;
  this.add = function () {
    this.sum += 1;
  };
  this.show = function () {
    console.log(this.sum);
  };
}

export let c = new C();
```
上面的脚本mod.js，输出的是一个C的实例。不同的脚本加载这个模块，得到的都是同一个实例。
```
// x.js
import {c} from './mod';
c.add();

// y.js
import {c} from './mod';
c.show();

// main.js
import './x';
import './y';
```
现在执行main.js，输出的是1。
```
$ babel-node main.js
1
```
这就证明了x.js和y.js加载的都是C的同一个实例。

## JavaScript 侦测手机浏览器的五种方法；
### 一、navigator.userAgent
最简单的方法就是分析浏览器的 user agent 字符串，它包含了设备信息。

JS 通过navigator.userAgent属性拿到这个字符串，只要里面包含mobi、android、iphone等关键字，就可以认定是移动设备。

```
if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
  // 当前设备是移动设备
}

// 另一种写法
if (
  navigator.userAgent.match(/Mobi/i) ||
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/iPhone/i)
) {
  // 当前设备是移动设备
}
```
这种方法的优点是简单方便，缺点是不可靠，因为用户可以修改这个字符串，让手机浏览器伪装成桌面浏览器。

Chromium 系的浏览器，还有一个navigator.userAgentData属性，也是类似的作用。不同之处是它将 user agent 字符串解析为一个对象，该对象的mobile属性，返回一个布尔值，表示用户是否使用移动设备。

```
const isMobile = navigator.userAgentData.mobile; 
```
注意，苹果的 Safari 浏览器和 Firefox 浏览器都不支持这个属性，具体情况可以查看 Caniuse 网站。

此外，还有一个已经废除的navigator.platform属性，所有浏览器都支持，所以也可以用。它返回一个字符串，表示用户的操作系统。

```
if (/Android|iPhone|iPad|iPod/i.test(navigator.platform)) {
  // 当前设备是移动设备
}
```
### 二、window.screen，window.innerWidth
另一种方法是通过屏幕宽度，判断是否为手机。

window.screen对象返回用户设备的屏幕信息，该对象的width属性是屏幕宽度（单位为像素）。

```
if (window.screen.width < 500) {
  // 当前设备是移动设备 
}
```
上面示例中，如果屏幕宽度window.screen.width小于500像素，就认为是手机。

这个方法的缺点在于，如果手机横屏使用，就识别不了。

另一个属性window.innerWidth返回浏览器窗口里面的网页可见部分的宽度，比较适合指定网页在不同宽度下的样式。

```
const getBrowserWidth = function() {
  if (window.innerWidth < 768) {
    return "xs";
  } else if (window.innerWidth < 991) {
    return "sm";
  } else if (window.innerWidth < 1199) {
    return "md";
  } else {
    return "lg";
  }
};
```
### 三、window.orientation
第三种方法是侦测屏幕方向，手机屏幕可以随时改变方向（横屏或竖屏），桌面设备做不到。

window.orientation属性用于获取屏幕的当前方向，只有移动设备才有这个属性，桌面设备会返回undefined。

```
if (typeof window.orientation !== 'undefined') {
  // 当前设备是移动设备 
}
```
注意，iPhone 的 Safari 浏览器不支持该属性。
### 四、touch 事件
第四种方法是，手机浏览器的 DOM 元素可以通过ontouchstart属性，为touch事件指定监听函数。桌面设备没有这个属性。

```
function isMobile() { 
  return ('ontouchstart' in document.documentElement); 
}

// 另一种写法
function isMobile() {
  try {
    document.createEvent("TouchEvent"); return true;
  } catch(e) {
    return false; 
  }
}
```
### 五、window.matchMedia()
最后一种方法是结合 CSS 来判断。

CSS 通过 media query（媒介查询）为网页指定响应式样式。如果某个针对手机的 media query 语句生效了，就可以认为当前设备是移动设备。

window.matchMedia()方法接受一个 CSS 的 media query 语句作为参数，判断这个语句是否生效。

```
let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
```
上面示例中，window.matchMedia()的参数是一个 CSS 查询语句，表示只对屏幕宽度不超过 700 像素的设备生效。它返回一个对象，该对象的matches属性是一个布尔值。如果是true，就表示查询生效，当前设备是手机。

除了通过屏幕宽度判断，还可以通过指针的精确性判断。

```
let isMobile = window.matchMedia("(pointer:coarse)").matches;
```
上面示例中，CSS 语句pointer:coarse表示当前设备的指针是不精确的。由于手机不支持鼠标，只支持触摸，所以符合这个条件。

有些设备支持多种指针，比如同时支持鼠标和触摸。pointer:coarse只用来判断主指针，此外还有一个any-pointer命令判断所有指针。

```
let isMobile = window.matchMedia("(any-pointer:coarse)").matches;
```
上面示例中，any-pointer:coarse表示所有指针里面，只要有一个指针是不精确的，就符合查询条件。
### 六、工具包

除了上面这些方法，也可以使用别人写好的工具包。这里推荐 react-device-detect，它支持多种粒度的设备侦测。

```
import {isMobile} from 'react-device-detect';

if (isMobile) {
  // 当前设备是移动设备
}
```

## 导出导入文件代码实例
```
// ==== 导出相关;
// get接口导出;
export const ApiParamExport = (id: number): Promise<Response> =>
  api.get(`xxx/xxx/xxx/${id}`, {
    responseType: "blob",
  });
// post接口导出; 
export const ApiMedicineExport = (params: any): Promise<Response> =>
  api.post("xxx/export", params, { responseType: "blob" });

// 返回文件流后对文件流进行处理下载;
ApiParamExport(this.questionnaireId).then((res) => {
  const datetime = moment(new Date().getTime()).format("YYYY-MM-DD");
  const objUrl = URL.createObjectURL(res);
  const a = document.createElement("a");
  a.href = objUrl;
  a.download = "paramsData_" + datetime + ".xlsx";
  document.body.appendChild(a);
  a.click();
  a.remove();
  this.exportLoading = false; // 导出按钮避免重复点击添加loading...
  this.$message.success("导出成功！");
});
```
```
// ==== 导入相关;
// post接口导入; 
export const ApiMedicineImport = (params: any): Promise<Response> =>
  api.post("xxxx/import", params, {
    headers: { "Content-Type": "multipart/form-data" },
  });
//导入ele示例;
<el-upload
  class="upload-demo"
  action=""
  :http-request="importMedicineOrder"
  :on-success="handleSuccess"
  :file-list="fileList"
  :show-file-list="false"
  accept=".xls, .xlsx"
>
  <el-button type="primary">导 入</el-button>
</el-upload>
// 导入接口调用;
importMedicineOrder(file: any) {
  // 导入;
  const formData = new FormData();
  formData.append("excel", file.file);
  ApiMedicineImport(formData).then((res) => {
    this.fileList = [];
    this.expressInfoLists = res.data;
    // 其他业务逻辑处理;
  });
}

```






