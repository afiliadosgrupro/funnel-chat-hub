
export type FunnelStage = 
  | 'initial'
  | 'identification'
  | 'awareness'
  | 'validation'
  | 'negotiation'
  | 'objection'
  | 'purchase';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  stage: FunnelStage;
  stageUpdatedAt: string;
  assignedTo: string | null;
  isHot: boolean;
  lastMessageAt: string;
  lastMessage: string;
  symptoms?: string[];
  problemDuration?: string;
  attemptsToSolve?: string[];
  isActive: boolean;
  isAutomationPaused: boolean;
}

export interface Message {
  id: string;
  leadId: string;
  content: string;
  sentAt: string;
  isFromLead: boolean;
  isAutomated: boolean;
  sentBy?: string;
  readAt?: string;
}
