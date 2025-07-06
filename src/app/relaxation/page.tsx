'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Image from "next/image";
import { Play, Pause } from 'lucide-react';

const relaxationGuides = [
  {
    title: "Enchanted Forest Walk",
    description: "A 10-minute guided walk through a serene, magical forest.",
    image: "https://storage.googleapis.com/serena-storage/forest-8787_256.gif",
    hint: "serene forest",
    audioSrc: "https://storage.googleapis.com/serena-storage/forest-sounds-259933.mp3",
  },
  {
    title: "Calm Beach Waves",
    description: "Listen to the soothing sound of ocean waves for 15 minutes.",
    image: "https://storage.googleapis.com/serena-storage/tropical-10201_256.gif",
    hint: "calm beach",
    audioSrc: "https://storage.googleapis.com/serena-storage/ocean-beach-waves-332383.mp3",
  },
  {
    title: "Mountain Sunset",
    description: "Visualize a beautiful sunset from a peaceful mountain peak.",
    image: "https://storage.googleapis.com/serena-storage/gift-4801_256.gif",
    hint: "mountain sunset",
    audioSrc: "https://storage.googleapis.com/serena-storage/the-sound-of-a-mountain-stream-_nature-sound-201930.mp3",
  },
  {
    title: "Gentle Rain Sounds",
    description: "Relax with the calming pitter-patter of a gentle rainstorm.",
    image: "https://placehold.co/600x400.png",
    hint: "gentle rain",
    audioSrc: "https://storage.googleapis.com/serena-storage/the-sound-of-a-mountain-stream-_nature-sound-201930.mp3",
  },
    {
    title: "Cozy Fireside",
    description: "Warm up with the crackling sounds of a cozy fireplace.",
    image: "https://placehold.co/600x400.png",
    hint: "cozy fireplace",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    title: "Starlight Meditation",
    description: "A guided meditation under a vast, starry night sky.",
    image: "https://placehold.co/600x400.png",
    hint: "starry sky",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
];

export default function RelaxationPage() {
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const audioRefs = useRef<{[key: string]: HTMLAudioElement | null}>({});

  useEffect(() => {
    // This effect ensures that when the active audio changes, the old one is paused.
    Object.keys(audioRefs.current).forEach(key => {
        const audio = audioRefs.current[key];
        if (audio) {
            if (key !== activeAudio) {
                audio.pause();
            }
        }
    });
  }, [activeAudio]);

  const togglePlay = (title: string) => {
    const audio = audioRefs.current[title];
    if (!audio) return;
    
    if (activeAudio === title) {
      audio.pause();
      setActiveAudio(null);
    } else {
      // Pause currently playing audio before starting a new one
      if (activeAudio && audioRefs.current[activeAudio]) {
        audioRefs.current[activeAudio]?.pause();
      }
      audio.play();
      setActiveAudio(title);
    }
  };
  
  const isPlaying = (title: string) => activeAudio === title;

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Relaxation Guides</h1>
        <p className="text-muted-foreground mt-2">Find a moment of peace with our guided experiences.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relaxationGuides.map((guide) => (
          <Card key={guide.title} className="overflow-hidden flex flex-col">
            <CardHeader className="p-0">
               <Image src={guide.image} alt={guide.title} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={guide.hint} />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
                 <CardTitle className="text-xl mb-2">{guide.title}</CardTitle>
                 <CardDescription>{guide.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 mt-auto bg-muted/50">
               <audio 
                 ref={el => audioRefs.current[guide.title] = el}
                 src={guide.audioSrc}
                 onEnded={() => setActiveAudio(null)}
                 onPause={() => {
                   if(activeAudio === guide.title) {
                       setActiveAudio(null);
                   }
                 }}
                 preload="none"
               />
               <Button onClick={() => togglePlay(guide.title)} className="w-full">
                  {isPlaying(guide.title) ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                  {isPlaying(guide.title) ? 'Stop Session' : 'Start Session'}
               </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}