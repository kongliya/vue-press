# 网络协议一些东西

- 今天早上去面试 有点尴尬 博客最近一次提交在去年九月... 怎么说呢（尬笑的表情包自行脑补吧..） 就想着 今天一定要做一次提交 就当是 2020年第一发吧！ 疫情慢慢也要过去了 一切都在变好。 孔小朋友也要加油鸭！！  --- 2020.07.14 星期二 记

- 这个目录的初衷是 看了http/tcp的几本书以后 想做个总结所以建立的。 但是因为懒一直都没做总结 虽然书看完了 但是也忘的差不多了.... （惭愧三秒钟...）  --- 好了 废话截止;

## 关于http

首先上个人理解吧：http是请求/响应状态的 有请求必有响应 一次链接以后立马断开 绝不墨迹；所有有了返回的状态码一系列！  
1xx： 请求发送过程中 收没收到 不知道；  
2xx： 请求发送了 服务器收到了 这就是正常状态；  
3xx： 重定向； 301永久重定向/302临时重定向/304 not modified走浏览器缓存；  
4xx： 一般是客户端错误； 400参数有误/403没有权限拒绝访问/404路径问题未找到；  
5xx： 服务端错误；

## 关于TCP/IP

TCP是管杀管埋的 就是比较稳妥 处理的比较干净 
- 三次握手： 
  A发送SYN包告诉B 我要跟你建立连接   
  B收到后回一个SYN/ACK表示 啊我知道你要跟我连接了   
  A就说啊我知道了那咱俩连起来吧 ------握手结束；  

- 四次挥手：   
  A发送FIN包跟B讲 啊我要断开了   
  B收到收个包 我知道你要跟我断开了    
  B再发个包给A 我也要跟你断开了   
  A收到后回我知道了 断了吧   ------挥手完毕 bye～  

keep-alive 保持连接 可以建立长链接（如何保持呢？发心跳包..）  

你看 这就是 你那行不行的 我心里有个底。

## 关于UDP

为啥上边那么夸人TCP呢，就是因为这玩意儿只管杀不管埋...  
请求发出去 发出去呗 收不收得到的 你甭想知道 大概就是这样...  

肯定也是有优点的：  
速度！

-- 一些缓存或者请求的header头部信息过会再总结吧，先忙一会...