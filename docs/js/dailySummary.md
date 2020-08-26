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
	<p class="con clip" id="tips">************。</p>
	<p class="open open">
	<span>展开</span><img src="assets/img/open.png" alt="">
	</p>
	<p class="close close">
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
// 功能主治;  判断行数是否需要显示展开按钮（为了适应不同手机的宽） 三行的高度是90;
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