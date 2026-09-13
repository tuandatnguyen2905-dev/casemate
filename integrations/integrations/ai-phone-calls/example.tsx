import { useState, useEffect } from 'react';

const workspaceId = 'workspace-123';

function AIPhoneCallsApp() {
  const [calls, setCalls] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [purpose, setPurpose] = useState('appointment-reminder');
  const [selectedCall, setSelectedCall] = useState(null);

  useEffect(() => {
    loadCalls();
  }, []);

  const loadCalls = async () => {
    const response = await fetch(`/api/workspaces/${workspaceId}/phone/calls`);
    const data = await response.json();
    setCalls(data.calls || []);
  };

  const makeCall = async () => {
    await fetch(`/api/workspaces/${workspaceId}/phone/calls/outbound`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        toNumber: phoneNumber,
        dynamicVariables: { customerName },
        metadata: { purpose },
      }),
    });
    setPhoneNumber('');
    setCustomerName('');
    loadCalls();
  };

  const viewCallDetails = async (callId: string) => {
    const response = await fetch(`/api/workspaces/${workspaceId}/phone/calls/${callId}`);
    const data = await response.json();
    setSelectedCall(data);
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-2">Make a Call</h2>
        <div className="space-y-2">
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone number (+1...)"
            className="w-full p-2 border rounded"
          />
          <input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer name"
            className="w-full p-2 border rounded"
          />
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="appointment-reminder">Appointment Reminder</option>
            <option value="follow-up">Follow Up</option>
            <option value="lead-qualification">Lead Qualification</option>
            <option value="survey">Customer Survey</option>
          </select>
          <button onClick={makeCall} className="px-4 py-2 bg-blue-600 text-white rounded">
            Initiate Call
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Call History</h2>
        {calls.map((call: any) => (
          <div key={call.callId} className="border p-3 rounded mb-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono">{call.toNumber}</span>
                <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
                  call.status === 'completed' ? 'bg-green-100 text-green-800' :
                  call.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  call.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {call.status}
                </span>
                {call.duration && (
                  <span className="ml-2 text-sm text-gray-500">
                    {Math.floor(call.duration / 60)}m {call.duration % 60}s
                  </span>
                )}
              </div>
              <button
                onClick={() => viewCallDetails(call.callId)}
                className="px-3 py-1 bg-gray-200 rounded text-sm"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCall && (
        <div>
          <h2 className="text-lg font-bold mb-2">Call Transcript</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">
            {(selectedCall as any).transcript || 'No transcript available'}
          </pre>
        </div>
      )}
    </div>
  );
}

export default AIPhoneCallsApp;
