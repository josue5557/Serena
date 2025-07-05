'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { type JournalEntry, type Mood } from '@/lib/types';
import { format, parseISO } from 'date-fns';
import { Smile, Frown, Meh, Angry, Annoyed, HandMetal } from 'lucide-react';

const moodIcons: Record<Mood, React.ReactNode> = {
  Happy: <Smile className="w-8 h-8 text-yellow-500" />,
  Calm: <HandMetal className="w-8 h-8 text-green-500" />,
  Sad: <Frown className="w-8 h-8 text-blue-500" />,
  Anxious: <Annoyed className="w-8 h-8 text-purple-500" />,
  Angry: <Angry className="w-8 h-8 text-red-500" />,
  Neutral: <Meh className="w-8 h-8 text-gray-500" />,
};

const moods: Mood[] = ['Happy', 'Calm', 'Sad', 'Anxious', 'Angry', 'Neutral'];

const initialEntries: JournalEntry[] = [
    { id: '1', date: new Date(Date.now() - 86400000 * 2).toISOString(), mood: 'Anxious', content: 'Felt a bit anxious today about the upcoming presentation. Did some breathing exercises, which helped.' },
    { id: '2', date: new Date(Date.now() - 86400000).toISOString(), mood: 'Happy', content: 'Had a great day! Felt happy and productive. Spent some time in the park, which was refreshing.' },
];

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>(initialEntries);
  const [newContent, setNewContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood>('Neutral');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    const newEntry: JournalEntry = {
      id: new Date().toISOString(),
      date: new Date().toISOString(),
      mood: selectedMood,
      content: newContent,
    };
    setEntries([newEntry, ...entries]);
    setNewContent('');
    setSelectedMood('Neutral');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>New Journal Entry</CardTitle>
            <CardDescription>How are you feeling right now?</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select your mood</label>
                <div className="grid grid-cols-3 gap-2">
                  {moods.map((mood) => (
                    <Button
                      key={mood}
                      type="button"
                      variant={selectedMood === mood ? 'default' : 'outline'}
                      onClick={() => setSelectedMood(mood)}
                      className="flex flex-col h-16"
                    >
                      {moodIcons[mood]}
                      <span className="mt-1 text-xs">{mood}</span>
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="journal-content" className="text-sm font-medium">
                  What's on your mind?
                </label>
                <Textarea
                  id="journal-content"
                  placeholder="Describe your feelings, thoughts, or the day's events..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={6}
                  className="mt-2"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Add to Journal
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
         <header>
            <h1 className="text-3xl font-bold text-foreground">Your Journal</h1>
            <p className="text-muted-foreground mt-2">A history of your thoughts and feelings.</p>
        </header>
        {entries.length > 0 ? (
          entries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {moodIcons[entry.mood]}
                      {entry.mood}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {format(parseISO(entry.date), 'eeee, MMMM d, yyyy')}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90">{entry.content}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-10 text-center text-muted-foreground">
              <p>Your journal is empty.</p>
              <p>Start by adding a new entry.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
