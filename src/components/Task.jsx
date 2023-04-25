import React, { useEffect, useState } from "react";
import Button from "./Button";

export default function Task({ task }) {
  return (
    <li key={task.id}>
      {task.text}
      <Button text="Edit" task={task} />
      <Button text="Delete" task={task} />
    </li>
  );
}
