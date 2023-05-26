import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export type TaskFormProps = {
  onTaskCreated: (text: string) => void;
};

const TaskForm: FunctionComponent<TaskFormProps> = ({ onTaskCreated }) => {
  const [text, setText] = useState<string>("");

  const handleTextChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setText(ev.target.value);
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!/^\s*$/.test(text)) {
      onTaskCreated(text);
    }
    setText("");
  };

  return (
    <Form className="row mb-2" onSubmit={handleSubmit}>
      <Form.Group className="col-md-11">
        <Form.Control type="text" value={text} onChange={handleTextChange} />
      </Form.Group>
      <div className="col-md-1">
        <Button variant="primary" type="submit">
          Add
        </Button>
      </div>
    </Form>
  );
};

TaskForm.displayName = "TaskForm";

export default TaskForm;
