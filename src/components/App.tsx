import { findAll, list, remove, save } from "@varasto/orm";
import { Storage } from "@varasto/storage";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";

import { Task } from "../models";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export type AppProps = {
  storage: Storage;
};

const App: FunctionComponent<AppProps> = ({ storage }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<boolean | undefined>();

  const fetchTasks = useCallback(() => {
    (filter === undefined
      ? list(storage, Task)
      : findAll(storage, Task, { isDone: filter })
    )
      .then(setTasks)
      .catch(() => {});
  }, [filter, storage]);

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

  useEffect(() => {
    fetchTasks();
  }, [storage, filter, fetchTasks]);

  return (
    <Container className="mt-3">
      <h1>What needs to be done?</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <ButtonGroup>
        <Button
          variant={filter === undefined ? "primary" : "secondary"}
          onClick={() => setFilter(undefined)}
        >
          Show all tasks
        </Button>
        <Button
          variant={filter === false ? "primary" : "secondary"}
          onClick={() => setFilter(false)}
        >
          Show active tasks
        </Button>
        <Button
          variant={filter === true ? "primary" : "secondary"}
          onClick={() => setFilter(true)}
        >
          Show completed tasks
        </Button>
      </ButtonGroup>
      <TaskList
        onTaskDeleted={handleTaskDeleted}
        onTaskMarkedAsDone={handleTaskMarkedAsDone}
        tasks={tasks}
      />
    </Container>
  );
};

App.displayName = "App";

export default App;
