'use server';
/**
 * @fileOverview This file defines the AI companion daily check-in flow.
 *
 * - aiCompanionDailyCheckIn - A function that initiates the daily check-in process with the user.
 * - AiCompanionDailyCheckInInput - The input type for the aiCompanionDailyCheckIn function.
 * - AiCompanionDailyCheckInOutput - The return type for the aiCompanionDailyCheckIn function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiCompanionDailyCheckInInputSchema = z.object({
  userId: z.string().describe('The unique identifier of the user.'),
  journalEntries: z.array(z.string()).optional().describe('The users journal entries')
});
export type AiCompanionDailyCheckInInput = z.infer<typeof AiCompanionDailyCheckInInputSchema>;

const AiCompanionDailyCheckInOutputSchema = z.object({
  question: z.string().describe('The question the AI asks the user about their day.'),
});
export type AiCompanionDailyCheckInOutput = z.infer<typeof AiCompanionDailyCheckInOutputSchema>;

export async function aiCompanionDailyCheckIn(input: AiCompanionDailyCheckInInput): Promise<AiCompanionDailyCheckInOutput> {
  return aiCompanionDailyCheckInFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCompanionDailyCheckInPrompt',
  input: {schema: AiCompanionDailyCheckInInputSchema},
  output: {schema: AiCompanionDailyCheckInOutputSchema},
  prompt: `You are a mental wellness companion. Your goal is to check in with the user each day and record their response.

Given the following journal entries from the user:
{{#each journalEntries}}
  {{this}}
{{/each}}

Ask the user how they are feeling today in a single question. Be friendly and encouraging.`,
});

const aiCompanionDailyCheckInFlow = ai.defineFlow(
  {
    name: 'aiCompanionDailyCheckInFlow',
    inputSchema: AiCompanionDailyCheckInInputSchema,
    outputSchema: AiCompanionDailyCheckInOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
