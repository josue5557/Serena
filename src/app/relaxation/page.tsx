'use client';
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Play, Pause } from 'lucide-react';
import { Sparkle } from 'lucide-react'; // ¡Importamos Sparkle!


const relaxationGuides = [
  {
    title: "Enchanted Forest Walk",
    description: "A 10-minute guided walk through a serene, magical forest.",
    image: "https://storage.googleapis.com/serena-storage/forest-8787_256.gif",
    hint: "serene forest",
    audioSrc: "https://storage.googleapis.com/serena-storage/forest-sounds-259933.mp3",
    instructions: `Inhale deeply through your nose for 4 seconds, hold for 4 seconds, then exhale slowly through your mouth for 6 seconds. Repeat this cycle for the duration of the session. Focus on the sound of the forest as you breathe.`,
  },
  {
    title: "Calm Beach Waves",
    description: "Listen to the soothing sound of ocean waves for 15 minutes.",
    image: "https://storage.googleapis.com/serena-storage/tropical-10201_256.gif",
    hint: "calm beach",
    audioSrc: "https://storage.googleapis.com/serena-storage/ocean-beach-waves-332383.mp3",
    instructions: `Breathe in as the wave comes in, hold as it gently rolls, and breathe out as it recedes. Align your breathing rhythm with the ocean's movement to deepen relaxation.`,
  },
  {
    title: "Mountain Sunset",
    description: "Visualize a beautiful sunset from a peaceful mountain peak.",
    image: "https://storage.googleapis.com/serena-storage/gift-4801_256.gif",
    hint: "mountain sunset",
    audioSrc: "https://storage.googleapis.com/serena-storage/the-sound-of-a-mountain-stream-_nature-sound-201930.mp3",
    instructions: `Close your eyes and inhale the crisp mountain air for 4 seconds. Visualize the sun setting as you hold your breath for 4 seconds. Exhale slowly for 6 seconds, releasing any tension.`,
  },
];

// Componente para las flores de loto de puntuación (ahora sparkles)
interface SparkleRatingProps { // Cambié el nombre de la interfaz para mayor claridad
  rating: number;
  onRatingChange: (newRating: number) => void;
}

const LotusRating: React.FC<SparkleRatingProps> = ({ rating, onRatingChange }) => { // Mantuve el nombre del componente para no cambiarlo en el resto del código
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((index) => (
        <Sparkle // ¡Usamos el componente Sparkle!
          key={index}
          className={`
            w-8 h-8 cursor-pointer transition-colors duration-200
            ${
              (hoverRating || rating) >= index
                ? 'text-purple-700 fill-purple-700' // Morado más fuerte y relleno
                : 'text-purple-300 fill-purple-300' // Lila y sin relleno
            }
          `}
          onClick={() => onRatingChange(index)}
          onMouseEnter={() => setHoverRating(index)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ))}
    </div>
  );
};


export default function RelaxationPage() {
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [userComment, setUserComment] = useState<string>('');

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  useEffect(() => {
    Object.keys(audioRefs.current).forEach(key => {
      const audio = audioRefs.current[key];
      if (audio && key !== activeAudio) audio.pause();
    });
  }, [activeAudio]);

  const togglePlay = (title: string) => {
    const audio = audioRefs.current[title];
    if (!audio) return;

    if (activeAudio === title) {
      audio.pause();
      setActiveAudio(null);
      setSelectedGuide(null);
      setUserRating(0);
      setUserComment('');
    } else {
      if (activeAudio) audioRefs.current[activeAudio]?.pause();
      audio.play();
      setActiveAudio(title);
      setSelectedGuide(title);
    }
  };

  const handleCardClick = (title: string) => {
    if (selectedGuide === title) {
      setSelectedGuide(null);
      setUserRating(0);
      setUserComment('');
      if (activeAudio === title) {
        audioRefs.current[title]?.pause();
        setActiveAudio(null);
      }
    } else {
      setSelectedGuide(title);
      if (activeAudio) {
        audioRefs.current[activeAudio]?.pause();
        setActiveAudio(null);
      }
      setUserRating(0);
      setUserComment('');
    }
  };


  const hasSelection = Boolean(selectedGuide);
  const currentGuide = relaxationGuides.find(guide => guide.title === selectedGuide);

  return (
    <div className={`flex flex-col items-center min-h-screen ${hasSelection ? 'p-0 gap-0' : 'p-4 gap-8'}`}>
      {!hasSelection && (
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">Relaxation Guides</h1>
          <p className="text-muted-foreground mt-2 text-lg">Find a moment of peace with our guided experiences.</p>
        </header>
      )}

      <div
        className={`flex w-full justify-center ${
          hasSelection ? 'flex-col lg:flex-row p-4 gap-8 lg:gap-12' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        }`}
      >
        {relaxationGuides.map(guide => {
          const isSelected = selectedGuide === guide.title;
          if (hasSelection && !isSelected) return null;

          return (
            <Card
              key={guide.title}
              className={
                `overflow-hidden flex flex-col transition-transform duration-300 bg-background ` +
                (isSelected
                  ? 'scale-100 w-full max-w-lg lg:max-w-xl z-10'
                  : 'scale-100 w-full max-w-sm')
              }
            >
              <CardHeader
                className="p-0 cursor-pointer"
                onClick={() => handleCardClick(guide.title)}
              >
                <Image
                  src={guide.image}
                  alt={guide.title}
                  width={isSelected ? 800 : 600}
                  height={isSelected ? 450 : 350}
                  className={`w-full object-cover ${isSelected ? 'h-72 lg:h-96' : 'h-56'}`}
                  data-ai-hint={guide.hint}
                />
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-xl mb-3">{guide.title}</CardTitle>
                <CardDescription className="mb-4 text-base">
                  {guide.description}
                </CardDescription>
                {isSelected && (
                  <div className="mb-4 p-3 bg-muted rounded text-left text-sm leading-relaxed">
                    <h3 className="font-semibold mb-2">Instructions:</h3>
                    {guide.instructions}
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4 bg-muted/50">
                <audio
                  ref={el => (audioRefs.current[guide.title] = el)}
                  src={guide.audioSrc}
                  onEnded={() => {
                    setActiveAudio(null);
                  }}
                  onPause={() => {
                    if (activeAudio === guide.title) setActiveAudio(null);
                  }}
                  preload="none"
                />
                <Button onClick={() => togglePlay(guide.title)} className="w-full">
                  {activeAudio === guide.title ? (
                    <><Pause className="mr-2 h-4 w-4"/> Stop Session</>
                  ) : (
                    <><Play className="mr-2 h-4 w-4"/> Start Session</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}

        {hasSelection && currentGuide && (
          <div className="flex flex-col gap-6 p-4 bg-background border rounded-lg shadow-md lg:w-1/2 max-w-lg lg:max-w-md self-start">
            <h2 className="text-2xl font-bold text-foreground text-center">How was your session?</h2>

            <div className="flex flex-col items-center gap-2">
              <p className="text-lg text-muted-foreground">Rate your relaxation level:</p>
              <LotusRating rating={userRating} onRatingChange={setUserRating} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="comments" className="text-lg text-muted-foreground">Your comments:</label>
              <Textarea
                id="comments"
                placeholder="Share your thoughts about this session..."
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Button
              onClick={() => {
                console.log(`Rating for ${currentGuide.title}: ${userRating} sparkles`); // Mensaje actualizado
                console.log(`Comment: ${userComment}`);
                alert(`Thanks for your feedback! Rating: ${userRating}, Comment: "${userComment}"`);
                setSelectedGuide(null);
                setUserRating(0);
                setUserComment('');
              }}
              disabled={userRating === 0 && userComment.trim() === ''}
            >
              Submit Feedback
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}