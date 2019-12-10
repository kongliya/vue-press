# 动态获取浏览器宽高；
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

# vue之中DOM渲染完成后操作DOM；
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

# 浏览器添加全局的提醒框；
```
	if(window.Notification) {
		var notification = new Notification('你有一条新信息', {
			body: "显示的信息",
		});
		setTimeout(function() { notification.close(); }, 多少毫秒之后消失);
	}
```