import React, { FunctionComponent } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import { Task } from "../models";

export type TaskTableProps = {
  onTaskDeleted: (task: Task) => void;
  onTaskMarkedAsDone: (task: Task) => void;
  tasks: Task[];
};

const TaskTable: FunctionComponent<TaskTableProps> = ({
  onTaskDeleted,
  onTaskMarkedAsDone,
  tasks,
}) => (
  <Container>
    {tasks.map((task) => (
      <Row key={task.id} className="pt-1 pt-2">
        <Col xs={1} className="text-center">
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={() => onTaskMarkedAsDone(task)}
          />
        </Col>
        <Col>{task.text}</Col>
        <Col xs={1} className="text-center">
          <Button variant="danger" onClick={() => onTaskDeleted(task)}>
            Delete
          </Button>
        </Col>
      </Row>
    ))}
  </Container>
);

TaskTable.displayName = "TaskTable";

export default TaskTable;
