'use server';

/**
 * @fileOverview AI companion flow that provides personalized tips for mental well-being.
 *
 * - aiCompanionPersonalizedTips - A function that provides personalized tips based on mood journal entries.
 * - AiCompanionPersonalizedTipsInput - The input type for the aiCompanionPersonalizedTips function.
 * - AiCompanionPersonalizedTipsOutput - The return type for the aiCompanionPersonalizedTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiCompanionPersonalizedTipsInputSchema = z.object({
  moodJournalEntries: z
    .string()
    .describe('The user\'s mood journal entries, as a string.'),
  recentInteraction: z
    .string()
    .describe('The most recent interaction with the user, as a string.'),
  topic: z
    .string()
    .describe(
      'The specific topic for which personalized tips are requested (e.g., relaxation, stress management, anger management, depression, anxiety).'
    ),
});
export type AiCompanionPersonalizedTipsInput = z.infer<
  typeof AiCompanionPersonalizedTipsInputSchema
>;

const AiCompanionPersonalizedTipsOutputSchema = z.object({
  personalizedTips: z
    .string()
    .describe(
      'Personalized tips for the specified topic, based on the user\'s mood journal entries and previous interactions.'
    ),
});
export type AiCompanionPersonalizedTipsOutput = z.infer<
  typeof AiCompanionPersonalizedTipsOutputSchema
>;

export async function aiCompanionPersonalizedTips(
  input: AiCompanionPersonalizedTipsInput
): Promise<AiCompanionPersonalizedTipsOutput> {
  return aiCompanionPersonalizedTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCompanionPersonalizedTipsPrompt',
  input: {schema: AiCompanionPersonalizedTipsInputSchema},
  output: {schema: AiCompanionPersonalizedTipsOutputSchema},
  prompt: `You are a mental wellness companion providing personalized tips.

  Based on the user's mood journal entries and previous interactions, provide personalized tips for the specified topic.

  Mood Journal Entries: {{{moodJournalEntries}}}
  Recent Interaction: {{{recentInteraction}}}
  Topic: {{{topic}}}

  Tips:`,
});

const aiCompanionPersonalizedTipsFlow = ai.defineFlow(
  {
    name: 'aiCompanionPersonalizedTipsFlow',
    inputSchema: AiCompanionPersonalizedTipsInputSchema,
    outputSchema: AiCompanionPersonalizedTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
