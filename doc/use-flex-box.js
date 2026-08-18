const { useFlexBox } = _FlexBox;
const { Flex, Card, Tag, Typography, Button, Space } = antd;
const { useState } = React;
const { Text, Title, Paragraph } = Typography;

const columns = [
  { width: 360, col: 1, size: 6 },
  { width: 640, col: 2, size: 8 },
  { width: 960, col: 3, size: 12 },
  { width: 1280, col: 4, size: 16 }
];

const Demo = () => {
  const [history, setHistory] = useState([]);
  const { ref, column } = useFlexBox({
    columns,
    onChange: next => {
      setHistory(list => [`col=${next.col}, size=${next.size}`, ...list].slice(0, 6));
    }
  });

  return (
    <Flex vertical gap={12}>
      <Text type="secondary">拖动下方卡片右下角，或点按钮改宽度。column 来自容器 clientWidth，不是窗口宽度。</Text>
      <Space wrap>
        {column ? (
          <Tag color="blue">
            当前 col={column.col}，size={column.size}，width≤{column.width}
          </Tag>
        ) : (
          <Tag>尚未量到宽度</Tag>
        )}
      </Space>
      <div
        ref={ref}
        style={{
          width: '100%',
          maxWidth: 960,
          minWidth: 240,
          resize: 'horizontal',
          overflow: 'auto',
          padding: 12,
          border: '1px dashed #d9d9d9',
          borderRadius: 8,
          background: '#fafafa'
        }}>
        <Card size="small" title="被测量的容器">
          <Paragraph style={{ marginBottom: 8 }}>把 useFlexBox 返回的 ref 绑在这一层。内部可以用 column.col 自己做布局。</Paragraph>
          <Flex gap={8} wrap>
            {Array.from({ length: column?.col || 1 }).map((_, index) => (
              <Card key={index} size="small" style={{ flex: '1 1 80px' }}>
                列 {index + 1}/{column?.col || '-'}
              </Card>
            ))}
          </Flex>
        </Card>
      </div>
      <Space wrap>
        <Text type="secondary">onChange 记录（不含首次量宽）</Text>
        {history.length === 0 ? <Text type="secondary">尚无切换</Text> : history.map((item, index) => <Tag key={`${item}-${index}`}>{item}</Tag>)}
      </Space>
    </Flex>
  );
};

const PresetWidthExample = () => {
  const [width, setWidth] = useState(720);
  const { ref, column } = useFlexBox({ columns });
  return (
    <Flex vertical gap={8}>
      <Space wrap>
        <Button type={width === 320 ? 'primary' : 'default'} onClick={() => setWidth(320)}>
          320（1 列）
        </Button>
        <Button type={width === 500 ? 'primary' : 'default'} onClick={() => setWidth(500)}>
          500（2 列）
        </Button>
        <Button type={width === 720 ? 'primary' : 'default'} onClick={() => setWidth(720)}>
          720（3 列）
        </Button>
        <Button type={width === 1100 ? 'primary' : 'default'} onClick={() => setWidth(1100)}>
          1100（4 列）
        </Button>
        {column ? <Tag color="blue">col={column.col}</Tag> : null}
      </Space>
      <div ref={ref} style={{ width, maxWidth: '100%', padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
        <Text>
          容器 {width}px → {column ? `${column.col} 列 / 每页 ${column.size} 条` : '测量中'}
        </Text>
      </div>
    </Flex>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={32}>
      <div>
        <Title level={4}>绑定 ref</Title>
        <Paragraph>不要把 ref 丢在组件实例上，必须是 DOM。列配置取第一个 width ≥ 容器宽度的项。</Paragraph>
        <Demo />
      </div>
      <div>
        <Title level={4}>指定容器宽度</Title>
        <PresetWidthExample />
      </div>
    </Flex>
  );
};

render(<BaseExample />);
