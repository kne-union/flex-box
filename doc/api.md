根据容器宽度自动计算列数，并用 antd 6 [`Grid`](https://ant.design/components/grid) 的 `Row` / `Col` 排布列表。同一行卡片会拉齐高度。

导出：`FlexBox`（默认）、`FlexBoxFetch`、`useFlexBox`。

### useFlexBox

监听容器宽度，返回应对应绑到 DOM 上的 `ref`，以及当前命中的 `column`。

```js
const { ref, column } = useFlexBox({ columns, onChange });
```

`ref` 必须传给真实 DOM（或 `forwardRef` 到 DOM）。`column` 在首次量到宽度前为 `null`。

#### 参数

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| columns | `columnProps[]` | 见下方默认值 | 按 `width` 升序排列的断点。取**第一个** `width >= 容器宽度` 的项；都大于容器时用最后一项 |
| onChange | `(column) => void` | - | 列配置变化时回调。首次量宽不会触发，之后每次切换才会调用 |

#### 返回值

| 名称 | 类型 | 说明 |
|------|------|------|
| ref | Ref | 绑到被测量的容器 DOM |
| column | `columnProps` \| `null` | 当前断点；尚未量到宽度时为 `null` |

#### columnProps

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| width | number | - | 容器宽度上限（px）。容器宽度小于等于该值时可以命中本项 |
| col | number | - | 栅格列数，传给 `Col` 的宽度百分比 `100 / col` |
| size | number | - | 建议的每页条数，给 `FlexBoxFetch` 的 `getFetchApi` 使用 |

默认 `columns`：

```js
[
  { width: 576, col: 1, size: 15 },
  { width: 768, col: 2, size: 12 },
  { width: 1200, col: 4, size: 12 },
  { width: 1600, col: 5, size: 15 }
]
```

---

### FlexBox

静态数据源的响应式卡片栅格。内部调用 `useFlexBox`，量到宽度后再渲染 `Row`。

#### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| columns | `columnProps[]` | 同 `useFlexBox` | 列断点 |
| onChange | `(column) => void` | - | 列配置变化回调，行为同 `useFlexBox` |
| dataSource | array | `[]` | 列表数据 |
| renderItem | `(item, index) => ReactNode` | - | 渲染每一项，建议返回 `FlexBox.Item` |
| rowKey | string \| `(item) => string \| number` | `item.key`，否则用 `index` | 行 key。传字符串时取 `item[rowKey]` |
| gutter | number \| array | `16` | 栅格间隔。数字时横纵都用该值；数组同 antd `Row.gutter` |
| outerClassName | string | - | 最外层测量容器的 `className` |
| className | string | - | 栅格 `Row` 的 `className` |
| children | ReactNode | - | 额外插入 `Row` 的节点（需自行保证是合法的栅格子项） |

#### FlexBox.Item

铺满当前格子高度的卡片容器。请把 `Card` 或自定义卡片包在里面。格子用 grid 拉齐子节点，不要求子组件转发 `style`。

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| className | string | - | 容器 class |
| style | CSSProperties | - | 与内置铺满样式合并，后传入的会覆盖 |
| children | ReactNode | - | 卡片内容 |

---

### FlexBoxFetch

在 `FlexBox` 之上用 `@kne/react-fetch` 拉数。`getFetchApi` 会收到当前 `column`（含 `size`），便于按列数调整 `pageSize`。

`ref` 指向 Fetch 实例，不是测量容器。

#### 属性

除 `dataSource` 由接口返回外，其余同 `FlexBox`（`columns`、`onChange`、`renderItem`、`rowKey`、`gutter`、`outerClassName`、`className`、`children`）。另增：

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| api | object | - | 直接传给 `@kne/react-fetch` 的请求配置。与 `getFetchApi` 二选一 |
| getFetchApi | `(column) => object` | - | 按当前列配置生成 Fetch `api`。`column` 未就绪时不请求 |
| dataFormat | `(data) => array` | `data => data.pageData` | 把接口结果转成 `dataSource` |
| pagination | boolean \| object | - | `false`/`undefined` 不分页。`true` 或对象时按客户端切片分页 |

#### pagination

在 antd 6 [`Pagination`](https://ant.design/components/pagination) 的属性之外，额外支持：

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| position | `'top'` \| `'bottom'` \| `'both'` | `'bottom'` | 分页器位置 |
| align | `'start'` \| `'center'` \| `'end'` | `'end'` | 分页器对齐，传给 antd `Pagination.align` |
| defaultCurrent | number | `1` | 默认页码 |
| defaultPageSize | number | `10` | 默认每页条数 |
| current | number | - | 受控页码 |
| pageSize | number | - | 受控每页条数 |
| total | number | `dataSource.length` | 总数，不传则用格式化后的列表长度 |
| onChange | `(page, pageSize) => void` | - | 页码或 pageSize 变化 |

其余字段会展开到 `Pagination`。

加载中会在 `Row` 上加上 `loading-container is-loading`，可与业务里的全局 loading 样式配合。
