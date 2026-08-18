const { default: FlexBox } = _FlexBox;
const { Flex, Card, Tag, Typography, Button, Space } = antd;
const { useState } = React;
const { Text, Title, Paragraph } = Typography;

const candidates = [
  {
    id: '327708204249121792',
    code: 'EC8901',
    name: 'luna.zhang',
    email: 'luna.zhang@leapin.io',
    phone: '+86 17621655346',
    status: 'pending',
    invitedAt: '2026-06-23 15:14'
  },
  {
    id: '327708204249121801',
    code: 'EC8902',
    name: 'wei.chen',
    email: 'wei.chen@leapin.io',
    phone: '+86 13800138000',
    status: 'running',
    invitedAt: '2026-06-22 09:40',
    remark: '已进入面试间，当前正在回答第二题。候选人补充了项目经历，卡片内容比「未开始」状态更长。'
  },
  {
    id: '327708204249121810',
    code: 'EC8903',
    name: 'ming.li',
    email: 'ming.li@leapin.io',
    phone: '+86 13912345678',
    status: 'ended',
    invitedAt: '2026-06-20 11:02',
    score: 86
  },
  {
    id: '327708204249121819',
    code: 'EC8904',
    name: 'yan.wu',
    email: 'yan.wu@leapin.io',
    phone: '+86 18600001111',
    status: 'pending',
    invitedAt: '2026-06-19 18:20'
  },
  {
    id: '327708204249121828',
    code: 'EC8905',
    name: 'hao.zhou',
    email: 'hao.zhou@leapin.io',
    phone: '+86 15012344321',
    status: 'check',
    invitedAt: '2026-06-18 10:05',
    remark: '报告待复核：疑似切屏，需要面试官确认后再发 offer。'
  },
  {
    id: '327708204249121837',
    code: 'EC8906',
    name: 'qing.sun',
    email: 'qing.sun@leapin.io',
    phone: '+86 13188886666',
    status: 'ended',
    invitedAt: '2026-06-17 14:33',
    score: 72
  }
];

const statusMap = {
  pending: { color: 'default', text: '未开始' },
  running: { color: 'processing', text: '进行中' },
  check: { color: 'error', text: '待复核' },
  ended: { color: 'success', text: '已完成' }
};

const CandidateCard = ({ item }) => {
  const status = statusMap[item.status] || statusMap.pending;
  return (
    <Card size="small" title={item.code} extra={<Tag color={status.color}>{status.text}</Tag>}>
      <Flex vertical gap={8}>
        <Text strong>{item.name}</Text>
        <Text type="secondary">{item.email}</Text>
        <Text type="secondary">{item.phone}</Text>
        <Text type="secondary">邀请时间 {item.invitedAt}</Text>
        {item.score != null ? <Text>综合分 {item.score}</Text> : null}
        {item.remark ? <Paragraph type="secondary" style={{ marginBottom: 0 }}>{item.remark}</Paragraph> : null}
      </Flex>
    </Card>
  );
};

const BasicExample = () => {
  return (
    <Flex vertical gap={8}>
      <Text type="secondary">长短内容混排时，同一行卡片高度对齐。拖动窗口或侧栏，列数会按容器宽度变化。</Text>
      <FlexBox dataSource={candidates} rowKey="id" gutter={12} renderItem={item => (
        <FlexBox.Item>
          <CandidateCard item={item} />
        </FlexBox.Item>
      )} />
    </Flex>
  );
};

const ColumnsExample = () => {
  const [column, setColumn] = useState(null);
  return (
    <Flex vertical gap={8}>
      <Space wrap>
        <Text type="secondary">自定义断点，并用 onChange 读取当前列配置（首次量宽不回调）</Text>
        {column ? (
          <Tag color="blue">
            col={column.col} / size={column.size} / width≤{column.width}
          </Tag>
        ) : (
          <Tag>等待容器量宽</Tag>
        )}
      </Space>
      <FlexBox
        columns={[
          { width: 480, col: 1, size: 8 },
          { width: 800, col: 2, size: 10 },
          { width: 1200, col: 3, size: 12 }
        ]}
        gutter={[16, 16]}
        dataSource={candidates}
        rowKey={item => item.id}
        onChange={setColumn}
        renderItem={item => (
          <FlexBox.Item>
            <CandidateCard item={item} />
          </FlexBox.Item>
        )}
      />
    </Flex>
  );
};

const GutterExample = () => {
  const [gutter, setGutter] = useState(8);
  return (
    <Flex vertical gap={8}>
      <Space>
        <Text type="secondary">gutter 间距（同 antd Row）</Text>
        <Button type={gutter === 8 ? 'primary' : 'default'} onClick={() => setGutter(8)}>
          8
        </Button>
        <Button type={gutter === 16 ? 'primary' : 'default'} onClick={() => setGutter(16)}>
          16
        </Button>
        <Button type={gutter === 24 ? 'primary' : 'default'} onClick={() => setGutter(24)}>
          24
        </Button>
      </Space>
      <FlexBox dataSource={candidates.slice(0, 4)} rowKey="id" gutter={gutter} renderItem={item => (
        <FlexBox.Item>
          <CandidateCard item={item} />
        </FlexBox.Item>
      )} />
    </Flex>
  );
};

const BaseExample = () => {
  return (
    <Flex vertical gap={32}>
      <div>
        <Title level={4}>基础用法</Title>
        <Paragraph>默认断点：容器 ≤576 一列，≤768 两列，≤1200 四列，更宽五列。请把卡片放在 FlexBox.Item 里。</Paragraph>
        <BasicExample />
      </div>
      <div>
        <Title level={4}>自定义 columns / onChange</Title>
        <ColumnsExample />
      </div>
      <div>
        <Title level={4}>gutter</Title>
        <GutterExample />
      </div>
    </Flex>
  );
};

render(<BaseExample />);
