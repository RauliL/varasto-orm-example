import { list, remove, save } from "@varasto/orm";
import { Storage } from "@varasto/storage";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { Task } from "../models";
import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";

export type AppProps = {
  storage: Storage;
};

const App: FunctionComponent<AppProps> = ({ storage }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = useCallback(() => {
    list(storage, Task)
      .then(setTasks)
      .catch(() => {});
  }, [storage]);

  const handleTaskCreated = (text: string) => {
    const task = new Task(text);

    save(storage, task)
      .then(fetchTasks)
      .catch(() => {});
  };

  const handleTaskDeleted = (task: Task) => {
    remove(storage, task)
      .then(fetchTasks)
      .catch(() => {});
  };

  const handleTaskMarkedAsDone = (task: Task) => {
    task.isDone = !task.isDone;
    save(storage, task)
      .then(fetchTasks)
      .catch(() => {});
  };

  useEffect(fetchTasks, [storage, fetchTasks]);

  return (
    <Container className="mt-3">
      <h1>What needs to be done?</h1>
      <Row>
        <Col>
          <TaskForm onTaskCreated={handleTaskCreated} />
        </Col>
        <Col>
          <TaskTable
            onTaskDeleted={handleTaskDeleted}
            onTaskMarkedAsDone={handleTaskMarkedAsDone}
            tasks={tasks}
          />
        </Col>
      </Row>
    </Container>
  );
};

App.displayName = "App";

export default App;
