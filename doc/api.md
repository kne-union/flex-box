### useFlexBox

const {ref, column} = useFlexBox(props);

注意：返回的 ref 必须传给一个 dom 的 ref

继承了[Ant Design List props](https://ant.design/components/list-cn#list)的参数，同时也新增了两个参数：

| 属性名      | 说明                   | 类型                     | 默认值              |
|----------|----------------------|------------------------|------------------|
| columns  | 实际用于 `List` 的 `grid` | `columnProps[]`        | `defaultColumns` |
| onChange | 设置 `column`          | (column) => onChange() | -                |

#### columnProps

默认值：

| 属性名   | 说明                    | 类型     | 默认值 |
|-------|-----------------------|--------|-----|
| width | 视口宽度                  | number | -   |
| col   | 列数                    | number | -   |
| size  | 根据 `col` 列数填每页数据加载多少条 | number | -   |

```text
  defaultColumns = [
    {width: 576, col: 1, size: 15},
    {width: 768, col: 2, size: 12},
    {width: 1200, col: 4, size: 12},
    {width: 1600, col: 5, size: 15}
  ]
```

### FlexBox

同 `useFlexBox` 参数

| 属性名            | 说明                         | 类型     | 默认值 |
|----------------|----------------------------|--------|-----|
| outerClassName | `FlexBox` 父元素的 `className` | string | -   |
| gutter         | 栅格间隔                       | number | 16  |


#### FlexBox.Item

同 [Ant Design List.Item](https://ant.design/components/list-cn#listitem)