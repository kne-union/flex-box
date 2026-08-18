const { FlexBoxFetch } = _FlexBox;
const { Flex, Card, Tag, Typography, Button, Space } = antd;
const { useRef, useState } = React;
const { Text, Title, Paragraph } = Typography;

const statusList = [
  { color: 'default', text: '未开始' },
  { color: 'processing', text: '进行中' },
  { color: 'success', text: '已完成' },
  { color: 'error', text: '待复核' }
];

const mockPage = ({ pageSize, keyword }) => {
  return Array.from({ length: pageSize }).map((_, index) => {
    const status = statusList[index % statusList.length];
    const seq = index + 1;
    return {
      id: `invite-${seq}`,
      code: `EC${String(8900 + seq).padStart(4, '0')}`,
      name: `候选人 ${seq}`,
      email: `user${seq}@leapin.io`,
      phone: `+86 1380000${String(seq).padStart(4, '0')}`,
      status,
      invitedAt: `2026-06-${String((seq % 28) + 1).padStart(2, '0')} 10:00`,
      remark: index % 3 === 1 ? `${keyword || '面试'}进展说明：当前题目较多，卡片会被拉高，同一行其它卡片应对齐。` : ''
    };
  });
};

const InviteCard = ({ item }) => {
  return (
    <Card size="small" title={item.code} extra={<Tag color={item.status.color}>{item.status.text}</Tag>}>
      <Flex vertical gap={8}>
        <Text strong>{item.name}</Text>
        <Text type="secondary">{item.email}</Text>
        <Text type="secondary">{item.phone}</Text>
        <Text type="secondary">邀请时间 {item.invitedAt}</Text>
        {item.remark ? <Paragraph type="secondary" style={{ marginBottom: 0 }}>{item.remark}</Paragraph> : null}
      </Flex>
    </Card>
  );
};

const BaseFetchExample = () => {
  const fetchRef = useRef(null);
  return (
    <Flex vertical gap={8}>
      <Space>
        <Text type="secondary">getFetchApi 使用 column.size 作为 pageSize；底部分页、居中对齐</Text>
        <Button
          onClick={() => {
            console.log(fetchRef.current);
          }}>
          打印 Fetch 实例
        </Button>
      </Space>
      <FlexBoxFetch
        ref={fetchRef}
        rowKey="id"
        gutter={12}
        columns={[
          { width: 480, col: 1, size: 8 },
          { width: 800, col: 2, size: 10 },
          { width: 1100, col: 3, size: 12 },
          { width: 1600, col: 4, size: 12 }
        ]}
        pagination={{ position: 'bottom', align: 'center' }}
        getFetchApi={({ size }) => {
          return {
            data: { pageSize: size, keyword: '面试' },
            loader: ({ data }) => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve({
                    pageData: mockPage(data)
                  });
                }, 400);
              });
            }
          };
        }}
        renderItem={item => (
          <FlexBoxFetch.Item>
            <InviteCard item={item} />
          </FlexBoxFetch.Item>
        )}
      />
    </Flex>
  );
};

const FormatAndPaginationExample = () => {
  const [position, setPosition] = useState('both');
  return (
    <Flex vertical gap={8}>
      <Space wrap>
        <Text type="secondary">dataFormat 从 list 取值；分页位置</Text>
        <Button type={position === 'top' ? 'primary' : 'default'} onClick={() => setPosition('top')}>
          top
        </Button>
        <Button type={position === 'bottom' ? 'primary' : 'default'} onClick={() => setPosition('bottom')}>
          bottom
        </Button>
        <Button type={position === 'both' ? 'primary' : 'default'} onClick={() => setPosition('both')}>
          both
        </Button>
      </Space>
      <FlexBoxFetch
        rowKey="id"
        gutter={12}
        columns={[
          { width: 480, col: 1, size: 8 },
          { width: 800, col: 2, size: 10 },
          { width: 1100, col: 3, size: 12 },
          { width: 1600, col: 4, size: 12 }
        ]}
        pagination={{ position, align: 'end', defaultPageSize: 6 }}
        dataFormat={data => data.list}
        getFetchApi={({ size }) => {
          return {
            data: { pageSize: size },
            loader: ({ data }) => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve({
                    list: mockPage({ pageSize: data.pageSize, keyword: '复核' })
                  });
                }, 300);
              });
            }
          };
        }}
        renderItem={item => (
          <FlexBoxFetch.Item>
            <InviteCard item={item} />
          </FlexBoxFetch.Item>
        )}
      />
    </Flex>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={32}>
      <div>
        <Title level={4}>按列数请求</Title>
        <Paragraph>缩小示例容器或窗口，列数变化后会用新的 size 重新请求。ref 指向 Fetch 实例。</Paragraph>
        <BaseFetchExample />
      </div>
      <div>
        <Title level={4}>dataFormat 与分页位置</Title>
        <FormatAndPaginationExample />
      </div>
    </Flex>
  );
};

render(<BaseExample />);
