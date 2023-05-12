import React, { useState } from "react";
import { Task } from "./task";
import { useTasks, useGroup } from "../hooks/useTasks";
import { Create } from "./create";
import { Group } from "./group";

export function Tasks() {
  const [tasks, updateTask] = useTasks([]);
  const [isOpen, setIsOpen] = useState(false);
  const [groups, updateGroup] = useGroup([]);

  return (
    <main className="content">
      {isOpen && (
        <Create
          setIsOpen={setIsOpen}
          updateTask={updateTask}
        />
      )}
      <div style={isOpen ? { filter: "blur(1rem)" } : {}}>
        <div className="task__header">
          <h1 className="tasks__title">Your Tasks</h1>
          <div
            className="floating__button createTab"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <svg
              fill="transparent"
              width="3.5rem"
              height="3.5rem"
            >
              <line
                x1="50%"
                x2="50%"
                y1="20%"
                y2="80%"
                stroke="#099"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <line
                x1="80%"
                x2="20%"
                y1="50%"
                y2="50%"
                stroke="#099"
                strokeWidth="20"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <ul className="tasks continer">
          {tasks.length > 0 &&
            tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                updateTask={updateTask}
              />
            ))}
        </ul>
      </div>
      <Group groups={groups} updateGroup={updateGroup} updateTask={updateTask}/>
    </main>
  );
}
