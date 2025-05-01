'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
import { CalendarIcon } from '@heroicons/react/24/outline';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
const chartData = [
  { week: 'Monday', desktop: 186 },
  { week: 'Tuesday', desktop: 305 },
  { week: 'Wednesday', desktop: 237 },
  { week: 'Thursday ', desktop: 73 },
  { week: 'Friday ', desktop: 209 },
  { week: 'Saturday ', desktop: 214 },
  { week: 'Sunday  ', desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function VisitChart() {
  return (
    <div className="w-full md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl"> Recent visits</h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="rounded-md bg-white p-4">
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={value => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
        <div className="flex items-center pt-6 pb-2">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Last week</h3>
        </div>
      </div>
    </div>
  );
}
