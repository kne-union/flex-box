
# flex-box


### 描述

通过外部容器尺寸来确定内部容器的列


### 安装

```shell
npm i --save @kne/flex-box
```

### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _FlexBox(@kne/current-lib_flex-box),antd(antd)

```jsx
const {default:FlexBox} = _FlexBox;
const { Card } = antd;

const BaseExample = () => {
    return (
        <FlexBox
            dataSource={[
                {
                    title: "Title 1",
                },
                {
                    title: "Title 2",
                },
                {
                    title: "Title 3",
                },
                {
                    title: "Title 4",
                },
                {
                    title: "Title 5",
                },
                {
                    title: "Title 6",
                },
            ]}
            renderItem={(item) => (
                <FlexBox.Item>
                    <Card title={item.title}>Card content</Card>
                </FlexBox.Item>
            )}
        />
    );
};

render(<BaseExample />);


```

- 这里填写示例标题
- 这里填写示例说明
- _FlexBox(@kne/current-lib_flex-box),antd(antd)

```jsx
const {FlexBoxFetch} = _FlexBox;
const {Card, Button} = antd;
const {useRef} = React;
const BaseExample = () => {
    const ref = useRef();
    return (<div>
        <FlexBoxFetch
            ref={ref}
            getFetchApi={({size}) => {
                return {
                    data: {
                        pageSize: size,
                    }, loader: ({data}) => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve({
                                    pageData: Array.from({length: data.pageSize}).map((item, index) => {
                                        return {
                                            key: index, title: `第${index}项`,
                                        };
                                    }),
                                });
                            }, 1000);
                        });
                    },
                };
            }}
            renderItem={(item) => (<FlexBoxFetch.Item>
                <Card title={item.title}>Card content</Card>
            </FlexBoxFetch.Item>)}
        />
        <Button
            onClick={() => {
                console.log(ref.current);
            }}
        >
            获取FetchApi
        </Button>
    </div>);
};

render(<BaseExample/>);

```


### API

| 属性名 | 说明 | 类型 | 默认值 |
|-----|----|----|-----|
|     |    |    |     |

