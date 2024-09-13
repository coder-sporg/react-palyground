# React Playground

## 核心功能

- 用 @monaco-editor/react 实现了网页版 typescript 编辑器，并且实现了自动类型导入
- 通过 @babel/standalone 实现了文件编译，并且写了一个 babel 插件实现了 import 的 source 的修改
- 通过 blob url 来内联引入其他模块的代码，通过 import maps 来引入 react、react-dom 等第三方包的代码
- 通过 iframe 实现了预览功能，并且通过 postMessage 和父窗口通信来显示代码运行时的错误
- 基于 css 变量 + context 实现了主题切换功能
- 通过 fflate + btoa 实现了文件内容的编码、解码，可以通过链接分享代码
- 通过 Performance 分析性能问题，并通过 Web Worker 拆分编译逻辑到 worker 线程来进行性能优化，消除了 long task
