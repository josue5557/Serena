'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { getDailyCheckinQuestion } from '@/lib/actions';

export function DailyCheckin() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState('');

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const result = await getDailyCheckinQuestion();
        setQuestion(result.question);
      } catch (error) {
        console.error('Failed to fetch daily check-in question:', error);
        setQuestion('How are you feeling today?');
      } finally {
        setLoading(false);
      }
    }
    fetchQuestion();
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Daily Check-in</CardTitle>
        <CardDescription>
          {loading ? 'Thinking of a good question...' : question}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        {loading ? (
          <div className="flex-grow flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="flex-grow flex flex-col gap-4">
              <Textarea
                placeholder="Share your thoughts..."
                className="flex-grow resize-none"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
              <Button>Save to Journal</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
