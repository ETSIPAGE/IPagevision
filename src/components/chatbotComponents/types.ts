export enum Tab {
  Home = 'Home',
  Messages = 'Messages',
  Help = 'Help',
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string; // Added timestamp for each message
}

export interface Conversation {
  id: string;
  title?: string;
  messages: Message[];
  lastUpdated: string | number;
  sessionId?: string;
  error?: string;
}