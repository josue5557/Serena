'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { getAiCompanionResponse, getPersonalizedTips } from '@/lib/actions';
import { type Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  useEffect(() => {
    // Initial message from AI
    setMessages([{ id: 'init', role: 'assistant', content: "Hello! I'm your AI wellness companion. How can I help you today? Feel free to share what's on your mind or ask for some tips." }]);
  }, []);

  const handleSendMessage = async (messageContent?: string) => {
    const userMessage = messageContent || input;
    if (!userMessage.trim() || isLoading) return;

    const newUserMessage: Message = { id: Date.now().toString(), role: 'user', content: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content as string }));
      const aiResponse = await getAiCompanionResponse(history, userMessage);
      const newAiMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: aiResponse };
      setMessages((prev) => [...prev, newAiMessage]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem sending your message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTipRequest = async (topic: string) => {
      const recentInteraction = messages.filter(m => m.role === 'user').slice(-1)[0]?.content as string || '';
      const prompt = `Can you give me some tips for ${topic}?`;
      
      const newUserMessage: Message = { id: Date.now().toString(), role: 'user', content: prompt };
      setMessages((prev) => [...prev, newUserMessage]);
      setIsLoading(true);
      
      try {
        const tips = await getPersonalizedTips(topic, recentInteraction);
        const newAiMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: tips };
        setMessages((prev) => [...prev, newAiMessage]);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error fetching tips.",
          description: "Could not fetch personalized tips at this time.",
        });
      } finally {
        setIsLoading(false);
      }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-grow flex flex-col p-0">
        <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-start gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><Sparkles className="w-4 h-4" /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted rounded-bl-none'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="w-8 h-8">
                    <AvatarFallback><Sparkles className="w-4 h-4" /></AvatarFallback>
                </Avatar>
                <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-none">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t space-y-2">
            <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={() => handleTipRequest('stress management')}>Stress Tips</Button>
                <Button variant="outline" size="sm" onClick={() => handleTipRequest('anxiety relief')}>Anxiety Relief</Button>
                <Button variant="outline" size="sm" onClick={() => handleTipRequest('anger management')}>Anger Management</Button>
                <Button variant="outline" size="sm" onClick={() => handleTipRequest('relaxation')}>Relaxation</Button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                autoComplete="off"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
        </div>
      </CardContent>
    </Card>
  );
}
