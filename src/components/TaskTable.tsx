import React, { FunctionComponent } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

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
  <Table>
    <tbody>
      {tasks.map((task) => (
        <tr key={task.id}>
          <td>
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={() => onTaskMarkedAsDone(task)}
            />
          </td>
          <td>{task.text}</td>
          <td>
            <Button variant="danger" onClick={() => onTaskDeleted(task)}>
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

TaskTable.displayName = "TaskTable";

export default TaskTable;
