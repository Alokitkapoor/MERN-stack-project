import React, { useCallback, useEffect, useState } from "react";

// Cds Component → Responsible for displaying **expired tasks**
// Tasks that are past their scheduled time appear here
// Users can mark them "Done" which deletes them from backend and refreshes UI
const Cds = ({ tasks, fetchAndRenderTasks }) => {
  // 1. Local state to store **expired tasks** for rendering
  const [toshow, settoshow] = useState([]);

  // 2. Function to filter tasks that are expired
  // useCallback ensures the function reference is stable across re-renders
  const loadexp = useCallback(() => {
    const now = new Date(); // current time

    // Filter tasks whose deadline (scheduledTime) has passed
    const expiredTasks = tasks.filter(t => new Date(t.scheduledTime) <= now);

    // Update local state → triggers re-render of the component
    settoshow(expiredTasks);
  }, [tasks]); // dependency: whenever `tasks` prop changes, re-run

  // 3. Handle removing a task when "Done" is clicked
  const handleRemove = async (index) => {
    const taskToRemove = toshow[index]; // get the specific task to delete

    try {
      const token = localStorage.getItem("token");

      // API call to delete task from backend
      const res = await fetch(
        `http://localhost:5000/api/problems/${taskToRemove._id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (!res.ok) throw new Error("Failed to remove task");

      // Refresh tasks in MainPage → keeps UI in sync
      fetchAndRenderTasks();

    } catch (err) {
      console.error(err);
      alert("Error removing task");
    }
  };

  // 4. useEffect to load expired tasks whenever `tasks` prop changes
  // Also works like polling if `tasks` are refreshed externally
  useEffect(() => {
    loadexp();
  }, [loadexp]); // only re-run if loadexp reference changes

  return (
    <>
      {/* 5. Show empty message if no expired tasks */}
      {toshow.length === 0 && (
        <>
          <img
            src="src/assets/empty-box.png"
            style={{
              padding: "3vw",
              marginTop: "3vw",
              opacity: "0.75"
            }}
          />
          <p
            style={{
              textAlign: "center",
              marginTop: "-2vw",
              color: "#7289a9"
            }}
          >
            Nothing to address
          </p>
        </>
      )}

      {/* 6. Render all expired tasks */}
      {toshow.map((task, index) => (
        <div key={index} className="task-card">
          {/* Task Header: title + deadline */}
          <div className="task-card-header">
            <h4>{task.title}</h4>
            <small>{new Date(task.scheduledTime).toLocaleString()}</small>
          </div>

          {/* Task Notes */}
          <p className="task-note">{task.description || "No additional notes."}</p>

          {/* Remove button */}
          <button
            className="remove-task-btn"
            onClick={() => handleRemove(index)}
          >
            Done
          </button>
        </div>
      ))}
    </>
  );
};

export default Cds;