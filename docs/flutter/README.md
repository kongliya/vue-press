### flutter web端搭建环境启动第一个项目
> 1. 首先第一步，需要下载flutter的sdk;
>
> 2. 添加环境变量: 
>
>    2.1 windows系统：
>
>    ​		PUB_HOSTED_URL https://pub.flutter-io.cn
>    ​        FLUTTER_STORAGE_BASE_URL https://storage.flutter-io.cn
>
>    2.2 mac系统：
>
>    ​		export PUB_HOSTED_URL=https://pub.flutter-io.cn <br/>
>          export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
> ​         
>
> ​	同时，需要在环境变量Path变量中添加Flutter的路径，结尾处记得加';'(win7的童鞋)
>
> 3. 命令行以管理员身份打开，输入flutter doctor
>
> 4. 添加Android或者IOS SDK；
>
> 5. 添加成功后环境变量之中添加如下变量：
>
>    ​	ANDROID_HOME:  值为sdk的目录（Android的童鞋） ==> 可以解决一直no device的报错。
>
> 6. 接着flutter run 就可以（或者直接F5）===> vsCode