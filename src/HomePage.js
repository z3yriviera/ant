import { useEffect, useState } from "react";
import { Table, Button, Layout, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const { Header, Content } = Layout;

function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (completed) => (completed ? "✅" : "❌"),
    },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <Layout>
      <Header className="header">
        <Typography.Title level={3} className="headerTitle">
          Home Page
        </Typography.Title>
        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      </Header>

      <Content style={{ padding: "20px" }}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{ pageSize: 20 }}
        />
      </Content>
    </Layout>
  );
}

export default HomePage;
