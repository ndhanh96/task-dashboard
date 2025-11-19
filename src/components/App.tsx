"use client";
import React from "react";
import { Typography, Space, Row, Col, Card } from "antd";
import TaskTable from "@/components/TaskTable";
import NewTaskModal from "@/components/NewTaskModal";
import { Task } from "@/lib/tasks";
import "@ant-design/v5-patch-for-react-19";

const { Title } = Typography;

function App({ myTasks }: { myTasks: Task[] }) {
  return (
    <main className="container">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Row align="middle" justify="space-between" className="header">
          <Col xs={24} sm={12}>
            <Title level={2} style={{ margin: 0 }}>
              My Tasks
            </Title>
          </Col>
          <Col className="actionsCol">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <NewTaskModal />
            </div>
          </Col>
        </Row>

        <Card styles={{ body: { padding: "0.5rem" } }}>
          <TaskTable tasks={myTasks} />
        </Card>
      </Space>
    </main>
  );
}

export default App;
