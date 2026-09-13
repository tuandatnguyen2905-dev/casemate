import { useState, useRef } from 'react';

function VoiceNoteInput() {
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });

        setLoading(true);
        try {
          const formData = new FormData();
          formData.append('audio', blob, 'recording.webm');

          const res = await fetch('/api/generate/transcribe', {
            method: 'POST',
            body: formData
          });

          if (!res.ok) throw new Error('Transcription failed');
          const { text: transcribed } = await res.json();
          setText(transcribed);
        } catch (err) {
          console.error('Transcription error:', err);
        } finally {
          setLoading(false);
        }
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error('Microphone access denied:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tap the mic to speak, or type here..."
        rows={4}
        style={{ width: '100%', padding: '8px' }}
      />
      <button
        onClick={recording ? stopRecording : startRecording}
        disabled={loading}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        {loading ? 'Transcribing...' : recording ? '⏹ Stop Recording' : '🎤 Record Voice Note'}
      </button>
    </div>
  );
}

export default VoiceNoteInput;
