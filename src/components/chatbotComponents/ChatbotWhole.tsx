// Fix: Corrected the React import by removing the extraneous 'a,'. This was causing all subsequent errors.
import React, { useState, useEffect, useRef } from 'react';
import FloatingActionButton from './FloatingActionButton';
import { Conversation, Message } from './types';
import { supabase } from './supabaseClient';
import ChatWidget from './ChatWidget';
// import "./chatbot.css"
const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Fetches the full message history for a given Flowise session ID.
 * @param sessionId The Flowise session ID.
 * @returns A fully populated Conversation object or a Conversation object with an error state.
 */
const fetchHistoryForSession = async (sessionId: string): Promise<Conversation> => {
  try {
    const flowisePredictionEndpoint = import.meta.env.VITE_FLOWISE_PREDICTION_ENDPOINT;
    // const API_ENDPOINT = `http://localhost:3000/api/v1/chatmessage/72f6ce2f-51af-4f5b-89e2-26bb39902850?sessionId=${sessionId}`;
    const API_ENDPOINT=flowisePredictionEndpoint
    const AUTH_TOKEN = import.meta.env.VITE_FLOWISE_AUTH_TOKEN;

    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch chat history: ${response.statusText}`);
    }
    const historyData = await response.json();

    const formattedMessages: Message[] = (Array.isArray(historyData) ? historyData : []).map((item: any, index: number) => ({
      id: `hist-${sessionId}-${index}`,
      text: item.message || item.text || item.content || '',
      isUser: item.type === 'userMessage' || item.role === 'user' || item.role === 'human',
      timestamp: item.created || new Date().toISOString()
    })).filter(msg => msg.text.trim());

    const lastMessageTimestamp = formattedMessages.length > 0
      ? formattedMessages[formattedMessages.length - 1].timestamp
      : new Date().toISOString();

    const firstUserMessage = formattedMessages.find(m => m.isUser)?.text;
    const title = firstUserMessage ? firstUserMessage.substring(0, 40) + (firstUserMessage.length > 40 ? '...' : '') : 'Chat History';

    // The timestamp for the welcome messages should be just before the first real message, if any.
    const welcomeTimestamp = formattedMessages.length > 0
      ? new Date(new Date(formattedMessages[0].timestamp).getTime() - 1000).toISOString() // 1 second before
      : new Date().toISOString();

    const welcomeMessages: Message[] = [
      {
        id: `welcome-${sessionId}-1`,
        text: "Hi there! You're speaking with IPage Vision Assistant.",
        isUser: false,
        timestamp: welcomeTimestamp,
      },
      {
        id: `welcome-${sessionId}-2`,
        text: 'How can I help?',
        isUser: false,
        timestamp: welcomeTimestamp,
      }
    ];

    return {
      id: `convo-sid-${sessionId}`,
      sessionId: sessionId,
      messages: [...welcomeMessages, ...formattedMessages],
      lastUpdated: lastMessageTimestamp,
      title: title
    };
  } catch (error) {
    console.error(`Error fetching history for session ${sessionId}:`, error);
    return {
      id: `convo-sid-${sessionId}`,
      sessionId: sessionId,
      messages: [],
      lastUpdated: new Date().toISOString(),
      title: 'Failed to load conversation',
      error: error instanceof Error ? error.message : 'Could not connect to server.'
    };
  }
};


function ChatbotWhole() {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [userSessionId, setUserSessionId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get or create a unique session ID for the user and store it locally.
  useEffect(() => {
    let sessionId = localStorage.getItem('user_session_id');
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem('user_session_id', sessionId);
    }
    setUserSessionId(sessionId);
  }, []);

  // Fetch conversation session IDs from Supabase, then fetch full history for each from Flowise.
  useEffect(() => {
    if (!userSessionId) return;

    const fetchAndLoadConversations = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('chat_conversations')
        .select('conversation_ids')
        .eq('user_session_id', userSessionId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116: no rows found
        console.error('Error fetching conversations from Supabase:', error.message);
        setIsLoading(false);
        return;
      }

      if (data && data.conversation_ids) {
        const sessionIds = data.conversation_ids;
        // Fetch all conversation histories concurrently
        const conversationPromises = sessionIds.map((sid: string) => fetchHistoryForSession(sid));
        const fetchedConversations = await Promise.all(conversationPromises);

        // Sort by the most recently updated
        fetchedConversations.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

        setConversations(fetchedConversations);
      }

      setIsLoading(false);
    };

    fetchAndLoadConversations();
  }, [userSessionId]);


  // Sync session IDs back to Supabase when conversations change.
  useEffect(() => {
    // Avoid writing to the DB during initial load or if there's no session ID.
    if (!userSessionId || isLoading) {
      return;
    }

    const saveSessionIdsToSupabase = async () => {
      const sessionIds = conversations
        .map(c => c.sessionId)
        .filter((id): id is string => !!id);

      const { error } = await supabase
        .from('chat_conversations')
        .upsert({
          user_session_id: userSessionId,
          conversation_ids: sessionIds,
        });

      if (error) {
        console.error('Failed to sync session IDs to Supabase:', error.message);
      }
    };

    // Debounce the save operation to avoid excessive database writes during rapid changes.
    const timerId = setTimeout(() => {
      saveSessionIdsToSupabase();
    }, 1000); // Wait 1s after the last change to save.

    return () => {
      clearTimeout(timerId);
    };
  }, [conversations, userSessionId, isLoading]);


  const toggleWidget = () => {
    setIsWidgetOpen(prev => !prev);
  };

  return (
    <>
      {/* Page Content */}
      

      {/* Fixed Chat Components */}
      <FloatingActionButton
        isOpen={isWidgetOpen}
        onClick={toggleWidget}
        conversationCount={conversations.length} 
        style={{
    /* Font stack */
    fontFamily:
      'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    
    /* Font styling */
    fontSize: '14px',
    fontWeight: 400,
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontKerning: 'auto',
    fontOpticalSizing: 'auto',
    fontStretch: '100%',
    fontVariationSettings: 'normal',
    fontFeatureSettings: 'normal',
    /* Text styling */
    color: 'rgb(247, 247, 247)',
    textAlign: 'left',
    textDecoration: 'none',
    textTransform: 'none',
    textIndent: '0px',

    /* Background */
    backgroundColor: 'rgba(0, 0, 0, 0)',

    /* Layout */
    lineHeight: 'normal',
  }}
      />
      <div className="fixed bottom-20 right-4 w-full max-w-md sm:max-w-lg md:max-w-xl z-50">
        <ChatWidget
        style={{
    /* Font stack */
    fontFamily:
      'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    
    /* Font styling */
    fontSize: '14px',
    fontWeight: 400,
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontKerning: 'auto',
    fontOpticalSizing: 'auto',
    fontStretch: '100%',
    fontVariationSettings: 'normal',
    fontFeatureSettings: 'normal',

    /* Text styling */
    color: 'rgb(247, 247, 247)',
    textAlign: 'left',
    textDecoration: 'none',
    textTransform: 'none',
    textIndent: '0px',

    /* Background */
    backgroundColor: 'rgba(0, 0, 0, 0)',

    /* Layout */
    lineHeight: 'normal',
  }}
          isOpen={isWidgetOpen}
          onClose={() => setIsWidgetOpen(false)}
          conversations={conversations}
          setConversations={setConversations}
        />
      </div>

    </>
  );
}

export default ChatbotWhole;