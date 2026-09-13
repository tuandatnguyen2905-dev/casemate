import { useState } from 'react';
// Import the helper: See docs.md for installation code

function VoiceChat() {
  const [isListening, setIsListening] = useState(false);
  const [session, setSession] = useState(null);

  const startVoiceChat = async () => {
    try {
      const newSession = await realtimeAudio.createSession();
      setSession(newSession);
      setIsListening(true);
      
      // Start microphone capture
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Connect to realtime session...
    } catch (error) {
      console.error('Voice chat failed:', error);
    }
  };

  return (
    <button onClick={startVoiceChat} disabled={isListening}>
      {isListening ? '🎤 Listening...' : '🎙️ Start Voice Chat'}
    </button>
  );
}

export default VoiceChat;
