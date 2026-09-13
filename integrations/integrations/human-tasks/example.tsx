// Human Tasks Dashboard Example
// Shows how to list, create, approve, and manage human tasks

import { useState, useEffect, useCallback } from "react";

const WORKSPACE_ID = (window as any).__WORKSPACE_ID__;

interface HumanTask {
  id: string;
  title: string;
  description: string;
  status: string;
  approvalStatus: string;
  priority: string;
  estimatedHours: string;
  hourlyRate: string;
  quotedBudget: string;
  finalCost: string | null;
  channel: string;
  createdAt: string;
  approvedAt: string | null;
  completedAt: string | null;
}

function formatBudget(cents: string | number | null): string {
  if (!cents) return "N/A";
  return `$${(Number(cents) / 100).toFixed(2)}`;
}

function getStatusColor(status: string): string {
  switch (status) {
    case "awaiting_approval": return "#f59e0b";
    case "pending": return "#3b82f6";
    case "in_progress": return "#8b5cf6";
    case "completed": return "#22c55e";
    case "cancelled": return "#ef4444";
    default: return "#6b7280";
  }
}

export default function HumanTasksDashboard() {
  const [tasks, setTasks] = useState<HumanTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", estimatedHours: 1, priority: "medium" });

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch(`/api/human-tasks?workspaceId=${WORKSPACE_ID}&includeCompleted=true`);
      const data = await res.json();
      if (data.success) setTasks(data.tasks);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const createTask = async () => {
    try {
      const res = await fetch("/api/human-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspaceId: WORKSPACE_ID,
          ...newTask,
          hourlyRate: 2500,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowForm(false);
        setNewTask({ title: "", description: "", estimatedHours: 1, priority: "medium" });
        fetchTasks();
      }
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  const approveTask = async (taskId: string) => {
    try {
      await fetch(`/api/human-tasks/${taskId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId: WORKSPACE_ID }),
      });
      fetchTasks();
    } catch (err) {
      console.error("Failed to approve task:", err);
    }
  };

  const rejectTask = async (taskId: string) => {
    try {
      await fetch(`/api/human-tasks/${taskId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId: WORKSPACE_ID }),
      });
      fetchTasks();
    } catch (err) {
      console.error("Failed to reject task:", err);
    }
  };

  if (loading) return <div style={{ padding: 24 }}>Loading tasks...</div>;

  return (
    <div style={{ padding: 16, fontFamily: "system-ui" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>Human Tasks</h2>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid #ddd", cursor: "pointer" }}>
          {showForm ? "Cancel" : "+ New Task"}
        </button>
      </div>

      {showForm && (
        <div style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 8, marginBottom: 16 }}>
          <input
            placeholder="Task title"
            value={newTask.title}
            onChange={e => setNewTask(t => ({ ...t, title: e.target.value }))}
            style={{ width: "100%", padding: 8, marginBottom: 8, borderRadius: 6, border: "1px solid #ddd" }}
          />
          <textarea
            placeholder="Description"
            value={newTask.description}
            onChange={e => setNewTask(t => ({ ...t, description: e.target.value }))}
            style={{ width: "100%", padding: 8, marginBottom: 8, borderRadius: 6, border: "1px solid #ddd", minHeight: 60 }}
          />
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input
              type="number"
              min={0.25}
              step={0.25}
              value={newTask.estimatedHours}
              onChange={e => setNewTask(t => ({ ...t, estimatedHours: Number(e.target.value) }))}
              style={{ width: 100, padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
            />
            <span style={{ alignSelf: "center", color: "#6b7280", fontSize: 13 }}>
              hours × $25/hr = {formatBudget(newTask.estimatedHours * 2500)}
            </span>
          </div>
          <button onClick={createTask} style={{ padding: "8px 16px", borderRadius: 6, background: "#0d69b3", color: "white", border: "none", cursor: "pointer" }}>
            Create Task
          </button>
        </div>
      )}

      {tasks.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: "#9ca3af" }}>No tasks yet</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tasks.map(task => (
            <div key={task.id} style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong>{task.title}</strong>
                <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 11, background: getStatusColor(task.status) + "20", color: getStatusColor(task.status) }}>
                  {task.status}
                </span>
              </div>
              <p style={{ margin: "4px 0", fontSize: 13, color: "#6b7280" }}>{task.description}</p>
              <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#9ca3af" }}>
                <span>Budget: {formatBudget(task.quotedBudget)}</span>
                <span>Est: {task.estimatedHours}h</span>
                <span>Priority: {task.priority}</span>
              </div>
              {task.approvalStatus === "pending" && (
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button onClick={() => approveTask(task.id)} style={{ padding: "4px 12px", borderRadius: 4, background: "#22c55e", color: "white", border: "none", cursor: "pointer", fontSize: 12 }}>
                    Approve
                  </button>
                  <button onClick={() => rejectTask(task.id)} style={{ padding: "4px 12px", borderRadius: 4, background: "#ef4444", color: "white", border: "none", cursor: "pointer", fontSize: 12 }}>
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
