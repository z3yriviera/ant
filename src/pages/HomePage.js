import { useEffect, useState } from "react";
import { Layout, Button, Table, Typography, Spin, message, theme } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const logout = () => {
    message.success("Logged out successfully!");
    navigate("/login");
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
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
      render: (completed) =>
        completed ? (
          <span style={{ color: "green" }}>✔ Completed</span>
        ) : (
          <span style={{ color: "red" }}>✘ Pending</span>
        ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: token.colorPrimary,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Title level={3} style={{ color: "#fff", margin: 0 }}>
          Home Page
        </Typography.Title>
        <Button type="primary" danger onClick={logout}>
          Logout
        </Button>
      </Header>
      <Content style={{ padding: "20px" }}>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Table
            dataSource={data}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 20, showSizeChanger: false }}
          />
        )}
      </Content>
    </Layout>
  );
}

export default HomePage;
