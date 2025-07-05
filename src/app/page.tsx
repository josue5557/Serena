import { MoodChart } from '@/components/mood-chart';
import { DailyCheckin } from '@/components/daily-checkin';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Welcome to Serena</h1>
        <p className="text-muted-foreground mt-2">Your personal space for tranquility and growth.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Mood Journey</CardTitle>
            <CardDescription>A look at your mood fluctuations over the past week.</CardDescription>
          </CardHeader>
          <CardContent>
            <MoodChart />
          </CardContent>
        </Card>

        <DailyCheckin />
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ActionCard title="Breathing Exercise" description="Calm your mind" href="/breathing" />
            <ActionCard title="New Journal Entry" description="Reflect on your day" href="/journal" />
            <ActionCard title="Relaxation Guides" description="Find your peace" href="/relaxation" />
            <ActionCard title="AI Companion" description="Talk about anything" href="/chat" />
        </CardContent>
      </Card>
    </div>
  );
}

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

function ActionCard({ title, description, href }: { title: string, description: string, href: string }) {
    return (
        <Link href={href} className="block">
        <Card className="h-full hover:bg-muted/50 transition-colors">
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription className="flex items-center justify-between">
                    {description}
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </CardDescription>
            </CardHeader>
        </Card>
        </Link>
    )
}
