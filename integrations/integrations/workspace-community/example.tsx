import { useState, useEffect } from 'react';
// Import the helper: See docs.md for installation code

function WorkoutFeed() {
  const [posts, setPosts] = useState([]);
  const [spaceId, setSpaceId] = useState(null);
  const workspaceId = 'my-workspace-123';
  const userId = 'user@example.com';
  const userName = 'John Doe';

  useEffect(() => {
    let ws = null;
    let canceled = false;
    
    // Initialize community space
    async function init() {
      const space = await community.getOrCreateSpace(
        workspaceId,
        'fitness-tracker',
        'Workout Feed',
        'feed'
      );
      if (canceled) return;
      setSpaceId(space.id);
      
      // Load existing posts
      const { posts: existingPosts } = await community.getPosts(space.id);
      if (canceled) return;
      setPosts(existingPosts);
      
      // Connect to real-time updates
      ws = community.connectRealtime(space.id, (message) => {
        if (message.type === 'post.created') {
          setPosts(prev => [message.data, ...prev]);
        } else if (message.type === 'reaction.added') {
          setPosts(prev => prev.map(p => 
            p.id === message.data.postId 
              ? { ...p, reactions: { ...p.reactions, [message.data.reactionType]: message.data.count }}
              : p
          ));
        }
      });
    }
    
    init();
    
    // Cleanup: close WebSocket on unmount
    return () => {
      canceled = true;
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const handleWorkoutSubmit = async (workout) => {
    await community.post(spaceId, userId, userName, {
      text: `Just completed ${workout.reps} ${workout.exercise}!`,
      workout: workout
    });
  };
  
  const handleReact = async (postId) => {
    await community.react(postId, userId, '🔥');
  };

  return (
    <div>
      <h2>Team Feed</h2>
      {posts.map(post => (
        <div key={post.id}>
          <p><strong>{post.userName}</strong>: {post.content.text}</p>
          <button onClick={() => handleReact(post.id)}>🔥 {post.reactions?.['🔥'] || 0}</button>
        </div>
      ))}
    </div>
  );
}

export default WorkoutFeed;
