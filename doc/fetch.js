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
