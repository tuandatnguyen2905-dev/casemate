const workspaceId = 'your-workspace-id';

async function createTag(name: string, color: string) {
  const response = await fetch(`/api/workspace-tags/${workspaceId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, color })
  });
  return response.json();
}

async function listTags() {
  const response = await fetch(`/api/workspace-tags/${workspaceId}`);
  return response.json();
}

async function tagContact(contactId: string, tagId: string) {
  const response = await fetch(
    `/api/entity-tags/contacts/${contactId}/tags?workspaceId=${workspaceId}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        tagId,
        propagateToSessions: true
      })
    }
  );
  return response.json();
}

async function tagSession(sessionId: string, tagId: string) {
  const response = await fetch(
    `/api/entity-tags/sessions/${sessionId}/tags?workspaceId=${workspaceId}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        tagId,
        propagateToContact: false
      })
    }
  );
  return response.json();
}

async function getContactTags(contactId: string) {
  const response = await fetch(
    `/api/entity-tags/contacts/${contactId}/tags?workspaceId=${workspaceId}`
  );
  return response.json();
}

async function removeTagFromContact(contactId: string, tagId: string) {
  const response = await fetch(
    `/api/entity-tags/contacts/${contactId}/tags/${tagId}?workspaceId=${workspaceId}`,
    { method: 'DELETE' }
  );
  return response.json();
}

export { createTag, listTags, tagContact, tagSession, getContactTags, removeTagFromContact };
