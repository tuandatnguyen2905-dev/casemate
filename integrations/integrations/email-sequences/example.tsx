import { useState, useEffect } from 'react';

const workspaceId = 'workspace-123';

function EmailSequencesApp() {
  const [sequences, setSequences] = useState([]);
  const [seqName, setSeqName] = useState('');
  const [enrollEmail, setEnrollEmail] = useState('');
  const [enrollFirstName, setEnrollFirstName] = useState('');
  const [selectedSeq, setSelectedSeq] = useState<string | null>(null);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    loadSequences();
  }, []);

  const loadSequences = async () => {
    const response = await fetch(`/api/workspaces/${workspaceId}/email-sequences`);
    const data = await response.json();
    setSequences(data);
  };

  const createSequence = async () => {
    await fetch(`/api/workspaces/${workspaceId}/email-sequences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: seqName,
        steps: [
          { order: 1, delayHours: 0, subject: 'Welcome!', textBody: 'Thanks for signing up, {{firstName}}!' },
          { order: 2, delayHours: 24, subject: 'Getting started', textBody: 'Here are some tips...' },
          { order: 3, delayHours: 72, subject: 'Need help?', textBody: 'We are here to help!' },
        ],
      }),
    });
    setSeqName('');
    loadSequences();
  };

  const enrollContact = async () => {
    if (!selectedSeq) return;
    await fetch(`/api/workspaces/${workspaceId}/email-sequences/${selectedSeq}/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: enrollEmail,
        variables: { firstName: enrollFirstName },
      }),
    });
    setEnrollEmail('');
    setEnrollFirstName('');
    loadEnrollments(selectedSeq);
  };

  const loadEnrollments = async (seqId: string) => {
    setSelectedSeq(seqId);
    const response = await fetch(`/api/workspaces/${workspaceId}/email-sequences/${seqId}/enrollments`);
    const data = await response.json();
    setEnrollments(data);
  };

  const toggleSequence = async (seqId: string, currentStatus: string) => {
    const action = currentStatus === 'active' ? 'pause' : 'resume';
    await fetch(`/api/workspaces/${workspaceId}/email-sequences/${seqId}/${action}`, {
      method: 'POST',
    });
    loadSequences();
  };

  const deleteSequence = async (seqId: string) => {
    await fetch(`/api/workspaces/${workspaceId}/email-sequences/${seqId}`, { method: 'DELETE' });
    loadSequences();
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-2">Create Sequence</h2>
        <div className="flex gap-2">
          <input
            value={seqName}
            onChange={(e) => setSeqName(e.target.value)}
            placeholder="Sequence name"
            className="flex-1 p-2 border rounded"
          />
          <button onClick={createSequence} className="px-4 py-2 bg-blue-600 text-white rounded">
            Create
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Email Sequences</h2>
        {sequences.map((seq: any) => (
          <div key={seq.id} className="border p-3 rounded mb-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold">{seq.name}</span>
                <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
                  seq.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {seq.status}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {seq.stepsCount} steps | {seq.enrollmentCount} enrolled
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => loadEnrollments(seq.id)} className="px-3 py-1 bg-gray-200 rounded text-sm">
                  Enrollments
                </button>
                <button onClick={() => toggleSequence(seq.id, seq.status)} className="px-3 py-1 bg-yellow-600 text-white rounded text-sm">
                  {seq.status === 'active' ? 'Pause' : 'Resume'}
                </button>
                <button onClick={() => deleteSequence(seq.id)} className="px-3 py-1 bg-red-600 text-white rounded text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedSeq && (
        <div>
          <h2 className="text-lg font-bold mb-2">Enroll Contact</h2>
          <div className="flex gap-2 mb-4">
            <input
              value={enrollEmail}
              onChange={(e) => setEnrollEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 p-2 border rounded"
            />
            <input
              value={enrollFirstName}
              onChange={(e) => setEnrollFirstName(e.target.value)}
              placeholder="First name"
              className="flex-1 p-2 border rounded"
            />
            <button onClick={enrollContact} className="px-4 py-2 bg-green-600 text-white rounded">
              Enroll
            </button>
          </div>

          <h3 className="font-bold mb-2">Current Enrollments</h3>
          {enrollments.map((e: any) => (
            <div key={e.email} className="border p-2 rounded mb-1 flex justify-between items-center">
              <span>{e.email}</span>
              <span className="text-sm text-gray-500">Step {e.currentStep}/{e.totalSteps}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmailSequencesApp;
