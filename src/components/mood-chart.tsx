'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { day: 'Mon', mood: 4 },
  { day: 'Tue', mood: 3 },
  { day: 'Wed', mood: 5 },
  { day: 'Thu', mood: 2 },
  { day: 'Fri', mood: 4 },
  { day: 'Sat', mood: 5 },
  { day: 'Sun', mood: 3 },
];

const chartConfig = {
  mood: {
    label: 'Mood',
    color: 'hsl(var(--chart-1))',
  },
};

const moodLabels: { [key: number]: string } = {
  1: 'Angry',
  2: 'Anxious',
  3: 'Sad',
  4: 'Calm',
  5: 'Happy',
};

export function MoodChart() {
  return (
    <div className="h-64 w-full">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={(value) => moodLabels[value]}
            />
             <Tooltip
              cursor={false}
              content={<ChartTooltipContent
                formatter={(value) => moodLabels[value as number]}
                labelClassName="font-bold"
                indicator="dot"
              />}
            />
            <Bar dataKey="mood" fill="var(--color-mood)" radius={8} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
