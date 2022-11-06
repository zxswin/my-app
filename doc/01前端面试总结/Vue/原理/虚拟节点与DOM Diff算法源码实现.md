## 虚拟节点与 DOM Diff 算法源码实现

- 什么是虚拟 dom

```html
<ul id="list">
  <li class="item">item1</li>
</ul>
```

```ts
/**
 * vdom可以看作是一个使用javascript模拟了DOM结构的树形结构，这个树结构包含整个DOM结构的信息
 */
const vdom = {
  tag: 'ul',
  attrs: {
    id: 'list',
  },
  children: [
    {
      tag: 'li',
      attrs: {
        className: 'item',
      },
      children: ['item1'],
    },
  ],
};
```
