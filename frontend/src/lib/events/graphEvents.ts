// Define all event types
export const GraphEvents = {
  MODE_CHANGE_REQUESTED: 'mode:change:requested',
  NODE_CREATED: 'node:created',
  NODE_DELETED: 'node:deleted',
  NODE_TEXT_UPDATED: 'node:text:updated',
} as const;

// Event payload types
export interface ModeChangeRequestedEvent {
  mode: 'NORMAL' | 'INSERT';
  nodeID?: string;
  initialText?: string;
}

export interface NodeCreatedEvent {
  nodeID: string;
}

export interface NodeDeletedEvent {
  nodeID: string;
}

export interface NodeTextUpdatedEvent {
  nodeID: string;
  text: string;
}
