// use server'

/**
 * @fileOverview AI companion with contextual awareness using previous journaling entries and conversations.
 *
 * - aiCompanion - A function that provides the AI companion service.
 * - AICompanionInput - The input type for the aiCompanion function.
 * - AICompanionOutput - The return type for the aiCompanion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICompanionInputSchema = z.object({
  journalEntries: z.array(z.string()).describe('Array of previous journal entries.'),
  conversationHistory: z.array(z.string()).describe('Array of previous conversation turns.'),
  userMessage: z.string().describe('The current message from the user.'),
});
export type AICompanionInput = z.infer<typeof AICompanionInputSchema>;

const AICompanionOutputSchema = z.object({
  response: z.string().describe('The AI companion response to the user message.'),
});
export type AICompanionOutput = z.infer<typeof AICompanionOutputSchema>;

export async function aiCompanion(input: AICompanionInput): Promise<AICompanionOutput> {
  return aiCompanionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCompanionPrompt',
  input: {schema: AICompanionInputSchema},
  output: {schema: AICompanionOutputSchema},
  prompt: `You are a mental wellness companion chatbot designed to provide support, advice, and encouragement to users.
  You are trained on relaxation techniques, stress management, anger management, and strategies for dealing with depression and anxiety.

  Take into account the user's journaling entries and conversation history to provide personalized and relevant responses.

  Journal Entries:
  {{#each journalEntries}}
  - {{{this}}}
  {{/each}}

  Conversation History:
  {{#each conversationHistory}}
  - {{{this}}}
  {{/each}}

  User Message: {{{userMessage}}}

  Response:`, // Ensure 'Response:' is included to guide the LLM to respond appropriately
});

const aiCompanionFlow = ai.defineFlow(
  {
    name: 'aiCompanionFlow',
    inputSchema: AICompanionInputSchema,
    outputSchema: AICompanionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
