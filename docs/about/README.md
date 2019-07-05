### 一些小东西

> 首先说说自己搭建vuepress踩到的一些坑吧。
>
> 基本的教程随便一搜都会有 所以 这儿说几个细节就可以。
>
> > 1.  github.io库的前边的username必须是你的用户名，否则，每次发布都会出错。
> > 2. vue-press的库Source必须选择第二个选项 master branch/docs folder
> > 3. vue-press github.io的库必须对应两个源 第二个库对应的远程（或者线上的仓库）是dist文件夹。
> > 4. favicon刚开始设置的时候，可能会不显示，怎么刷新都没用，重启服务也没有用。正确的做法就是静置一天，第二天刷新自己就好了。
>



```bash

git status

git add .

git commit -m'change'

git push -f git@github.com:kongliya/kl.github.io.git master
```



> 为了防止自己又忘了，blog再次长草，发布流程做以下记录：
>
> ![1562295207356](C:\Users\kl71611\AppData\Roaming\Typora\typora-user-images\1562295234547.png)