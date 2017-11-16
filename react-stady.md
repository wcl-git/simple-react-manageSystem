#### JSX 只是为 React.createElement(Component, props, ...children)方法提供语法糖
```
<MyButton color="blue", shaowSize={2}>
Click Me
</MyButton>
```
等价于：
```
React.createElement(MyButton, {color: 'blue', shaowSize: 2}, 'Click Me')
```
可以使用 JSX 的点表示法引用React组件。你可以方便地从一个模块中导出许多React组件。

首字母大写
可以传递任何 {} 包裹的 js 表达式作为一个属性值。
props.children 直接能拿到 JSX 标签内的内容

Ref 改变 。ref属性接受一个回调函数，回调接受DOM元素作为参数。

```
foucus(){
  this.textInput.focus()
}
<input
  type="text"
  ref={(input) => {this.textInput = input;}}
/>
```

React 性能优化：使用生产版本，避免重复渲染，shouldComponentUpdate来提升速度
数据机构稳定

高阶组件： 就是一个函数，接受一个组件作为参数，并返回一个新组件