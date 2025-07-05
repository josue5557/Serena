'use server';

import { aiCompanion } from '@/ai/flows/ai-companion-contextual-awareness';
import { aiCompanionDailyCheckIn } from '@/ai/flows/ai-companion-daily-check-in';
import { aiCompanionPersonalizedTips } from '@/ai/flows/ai-companion-personalized-tips';
import type { Message } from './types';

// Mock journal entries for contextual awareness
const mockJournalEntries = [
    "Felt a bit anxious today about the upcoming presentation. Did some breathing exercises, which helped.",
    "Had a great day! Felt happy and productive. Spent some time in the park, which was refreshing.",
    "Feeling a little down and unmotivated. It's hard to get started on tasks."
];

export async function getDailyCheckinQuestion() {
  const result = await aiCompanionDailyCheckIn({ userId: '1234', journalEntries: mockJournalEntries });
  return result;
}

export async function getAiCompanionResponse(history: Omit<Message, 'id' | 'content'>[], userMessage: string) {
    const conversationHistory = history.map(h => `${h.role}: ${h.content}`);
    
    try {
        const result = await aiCompanion({
            journalEntries: mockJournalEntries,
            conversationHistory,
            userMessage
        });
        return result.response;
    } catch (error) {
        console.error("AI Companion Error:", error);
        return "I'm sorry, I'm having a little trouble connecting right now. Please try again in a moment.";
    }
}

export async function getPersonalizedTips(topic: string, recentInteraction: string) {
    try {
        const result = await aiCompanionPersonalizedTips({
            moodJournalEntries: mockJournalEntries.join('\n'),
            recentInteraction,
            topic
        });
        return result.personalizedTips;
    } catch (error) {
        console.error("Personalized Tips Error:", error);
        return "I'm sorry, I couldn't fetch tips right now. Let's talk about something else.";
    }
}
