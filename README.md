# SUPER-VUE-SEAMLESS-SCROLL


### 关于github上面的md文档图片不显示的问题，请参照：https://www.wenchangstreet.com/2024/02/28/%E5%9F%BA%E4%BA%8E%E8%99%9A%E6%8B%9F%E5%88%97%E8%A1%A8%E7%9A%84%E8%B6%85%E7%BA%A7%E6%BB%9A%E5%8A%A8%E7%9A%84scroll


## 超级滚动列表

### 说明

目前在大屏开发之中，我们经常会使用vue-seamless-scroll组件

- vue2版本使用的是 vue-seamless-scroll
- vue3版本使用的是 vue3-seamless-scroll

但是这个组件普遍存在一个**问题，就是在针对大数据量渲染的时候，页面会非常的卡顿**

卡顿的原因在于，vue-seamless-scroll组件的实现原理，在内部的实现原理是使用的两个同样的dom界面，在位移变换的时候实现无缝滚动的效果，下图可以展示，下图使用的是vue2的vue-seamless-scroll源码

![image-20240227162835849](C:\Users\yuzho\AppData\Roaming\Typora\typora-user-images\image-20240227162835849.png)

这种模式就会导致永远是双倍的数据量/dom节点在渲染，所以当有大数据量是会产生卡顿的现象

### 解决方案

目前针对大数据量处理的问题主要有3种

- web worker 无法操作dom
- 切片渲染 requestAnimationFrame 但是无法解决渲染过多的问题
- 虚拟列表 最好的方案



本案例采取的是虚拟列表方案，目前市面上的虚拟列表主要是针对select选择组件实现的，virtual-list，它只能是手动的滚动，而无法自动的滚动，本案例专门是针对大屏项目开发的可以支持**大数据量滚动的虚拟列表实现**



在实测之中支持10万条数据轻而易举，而且在浏览器的性能选项之中，较vue-seamless-scroll表现相当出色，看下图，可以在代码之中调试data.js的循环次数来调试测试

![image-20240227163518761](C:\Users\yuzho\AppData\Roaming\Typora\typora-user-images\image-20240227163518761.png)



















