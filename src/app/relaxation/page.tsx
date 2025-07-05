import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlayCircle } from "lucide-react";

const relaxationGuides = [
  {
    title: "Enchanted Forest Walk",
    description: "A 10-minute guided walk through a serene, magical forest.",
    image: "https://placehold.co/600x400.png",
    hint: "serene forest",
  },
  {
    title: "Calm Beach Waves",
    description: "Listen to the soothing sound of ocean waves for 15 minutes.",
    image: "https://placehold.co/600x400.png",
    hint: "calm beach",
  },
  {
    title: "Mountain Sunset",
    description: "Visualize a beautiful sunset from a peaceful mountain peak.",
    image: "https://placehold.co/600x400.png",
    hint: "mountain sunset",
  },
  {
    title: "Gentle Rain Sounds",
    description: "Relax with the calming pitter-patter of a gentle rainstorm.",
    image: "https://placehold.co/600x400.png",
    hint: "gentle rain",
  },
    {
    title: "Cozy Fireside",
    description: "Warm up with the crackling sounds of a cozy fireplace.",
    image: "https://placehold.co/600x400.png",
    hint: "cozy fireplace",
  },
  {
    title: "Starlight Meditation",
    description: "A guided meditation under a vast, starry night sky.",
    image: "https://placehold.co/600x400.png",
    hint: "starry sky",
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
            <CardFooter className="p-4">
              <Button className="w-full">
                <PlayCircle className="mr-2 h-4 w-4" /> Start Session
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
