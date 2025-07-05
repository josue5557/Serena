import { BreathingPacer } from '@/components/breathing-pacer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function BreathingPage() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-foreground">Breathing Exercise</h1>
        <p className="text-muted-foreground mt-2">Follow the guide to center your mind and body.</p>
      </header>
      
      <Card className="w-full max-w-md">
        <CardHeader>
            <CardTitle>4-7-8 Breathing</CardTitle>
            <CardDescription>A simple yet powerful technique to promote calmness.</CardDescription>
        </CardHeader>
        <CardContent>
            <BreathingPacer />
        </CardContent>
      </Card>
    </div>
  );
}
