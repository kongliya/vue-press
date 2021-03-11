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




