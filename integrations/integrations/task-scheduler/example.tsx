import { useState, useEffect } from 'react';

declare const window: Window & { __WORKSPACE_ID__: string; __APP_ID__: string };

const api = {
  async sendEmail(to: string, subject: string, text: string, html?: string) {
    const res = await fetch('/api/app-skills/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Workspace-Id': window.__WORKSPACE_ID__
      },
      body: JSON.stringify({ to, subject, text, html })
    });
    return res.json();
  },

  async scheduleEmail(name: string, scheduledAt: string, email: { to: string; subject: string; text: string; html?: string }) {
    const res = await fetch('/api/app-skills/scheduler/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Workspace-Id': window.__WORKSPACE_ID__
      },
      body: JSON.stringify({ name, scheduledAt, email, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    });
    return res.json();
  },

  async listTasks() {
    const res = await fetch('/api/app-skills/scheduler/tasks', {
      headers: { 'X-Workspace-Id': window.__WORKSPACE_ID__ }
    });
    const data = await res.json();
    return data.data || [];
  },

  async deleteTask(taskId: string) {
    await fetch(`/api/app-skills/scheduler/tasks/${taskId}`, {
      method: 'DELETE',
      headers: { 'X-Workspace-Id': window.__WORKSPACE_ID__ }
    });
  }
};

function EmailSchedulerApp() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [mode, setMode] = useState<'now' | 'later'>('now');
  const [scheduledAt, setScheduledAt] = useState('');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await api.listTasks();
    setTasks(data);
  };

  const handleSend = async () => {
    if (!to || !subject || !body) return;
    setSending(true);
    setMessage('');

    try {
      if (mode === 'now') {
        const result = await api.sendEmail(to, subject, body);
        if (result.success) {
          setMessage(`Email sent to ${to}`);
          setTo(''); setSubject(''); setBody('');
        } else {
          setMessage(`Error: ${result.error}`);
        }
      } else {
        if (!scheduledAt) { setMessage('Pick a date/time'); setSending(false); return; }
        const result = await api.scheduleEmail(`Email to ${to}`, new Date(scheduledAt).toISOString(), { to, subject, text: body });
        if (result.success) {
          setMessage(`Email scheduled for ${new Date(scheduledAt).toLocaleString()}`);
          setTo(''); setSubject(''); setBody(''); setScheduledAt('');
          loadTasks();
        } else {
          setMessage(`Error: ${result.error}`);
        }
      }
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-xl font-bold">Email Scheduler</h2>

      <div className="flex gap-2">
        <button onClick={() => setMode('now')} className={`px-3 py-1 rounded ${mode === 'now' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Send Now</button>
        <button onClick={() => setMode('later')} className={`px-3 py-1 rounded ${mode === 'later' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Schedule</button>
      </div>

      <div className="space-y-3">
        <input value={to} onChange={e => setTo(e.target.value)} placeholder="To email" className="w-full p-2 border rounded" />
        <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" className="w-full p-2 border rounded" />
        <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Email body" rows={4} className="w-full p-2 border rounded" />
        {mode === 'later' && (
          <input type="datetime-local" value={scheduledAt} onChange={e => setScheduledAt(e.target.value)} className="w-full p-2 border rounded" />
        )}
        <button onClick={handleSend} disabled={sending} className="w-full px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
          {sending ? 'Sending...' : mode === 'now' ? 'Send Email' : 'Schedule Email'}
        </button>
      </div>

      {message && <p className="text-sm text-green-600">{message}</p>}

      {tasks.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Scheduled Tasks</h3>
          <div className="space-y-2">
            {tasks.map((task: any) => (
              <div key={task.id} className="border p-3 rounded flex justify-between items-center">
                <div>
                  <div className="font-medium">{task.name}</div>
                  <div className="text-sm text-gray-500">
                    {task.status} — {task.actionType} — {task.scheduledAt ? new Date(task.scheduledAt).toLocaleString() : 'recurring'}
                  </div>
                </div>
                <button onClick={() => { api.deleteTask(task.id); loadTasks(); }} className="text-red-500 text-sm">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EmailSchedulerApp;
