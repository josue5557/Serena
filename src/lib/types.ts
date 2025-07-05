export type Mood = 'Happy' | 'Calm' | 'Sad' | 'Anxious' | 'Angry' | 'Neutral';

export interface JournalEntry {
  id: string;
  date: string;
  mood: Mood;
  content: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: React.ReactNode;
}
