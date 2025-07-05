import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

const relaxationGuides = [
  {
    title: "Enchanted Forest Walk",
    description: "A 10-minute guided walk through a serene, magical forest.",
    image: "https://placehold.co/600x400.png",
    hint: "serene forest",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Calm Beach Waves",
    description: "Listen to the soothing sound of ocean waves for 15 minutes.",
    image: "https://placehold.co/600x400.png",
    hint: "calm beach",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "Mountain Sunset",
    description: "Visualize a beautiful sunset from a peaceful mountain peak.",
    image: "https://placehold.co/600x400.png",
    hint: "mountain sunset",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    title: "Gentle Rain Sounds",
    description: "Relax with the calming pitter-patter of a gentle rainstorm.",
    image: "https://placehold.co/600x400.png",
    hint: "gentle rain",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
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
            <CardFooter className="p-4 bg-muted/50">
              <audio controls className="w-full">
                <source src={guide.audioSrc} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
