'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchVerifiedAssistantsInputSchema = z.object({
  userLocation: z.object({
    latitude: z.number().describe('The latitude of the user.'),
    longitude: z..number().describe('The longitude of the user.'),
  }).describe('The location of the user.'),
  serviceRequest: z.string().describe('The type of service the user needs (e.g., fuel delivery, mechanical repair, towing).'),
  assistantPool: z.array(z.object({
    assistantId: z.string().describe('The unique ID of the assistant.'),
    location: z.object({
      latitude: z.number().describe('The latitude of the assistant.'),
      longitude: z.number().describe('The longitude of the assistant.'),
    }).describe('The location of the assistant.'),
    serviceHistory: z.array(z.string()).describe('A list of previous services provided by the assistant.'),
    rating: z.number().describe('The rating of the assistant (0-5).'),
  })).describe('A list of available assistants.'),
});
export type MatchVerifiedAssistantsInput = z.infer<typeof MatchVerifiedAssistantsInputSchema>;

const MatchVerifiedAssistantsOutputSchema = z.object({
  assistantId: z.string().describe('The ID of the best matched assistant.'),
  reason: z.string().describe('The reason for choosing this assistant.'),
});
export type MatchVerifiedAssistantsOutput = z.infer<typeof MatchVerifiedAssistantsOutputSchema>;

export async function matchVerifiedAssistants(input: MatchVerifiedAssistantsInput): Promise<MatchVerifiedAssistantsOutput> {
  return matchVerifiedAssistantsFlow(input);
}

const selectAssistantTool = ai.defineTool(
  {
    name: 'selectAssistant',
    description: 'Selects the best assistant from a list based on location, service request, and service history.',
    inputSchema: z.object({
      userLocation: z.object({
        latitude: z.number().describe('The latitude of the user.'),
        longitude: z.number().describe('The longitude of the user.'),
      }).describe('The location of the user.'),
      serviceRequest: z.string().describe('The type of service the user needs (e.g., fuel delivery, mechanical repair, towing).'),
      assistantPool: z.array(z.object({
        assistantId: z.string().describe('The unique ID of the assistant.'),
        location: z.object({
          latitude: z.number().describe('The latitude of the assistant.'),
          longitude: z.number().describe('The longitude of the assistant.'),
        }).describe('The location of the assistant.'),
        serviceHistory: z.array(z.string()).describe('A list of previous services provided by the assistant.'),
        rating: z.number().describe('The rating of the assistant (0-5).'),
      })).describe('A list of available assistants.'),
    }),
    outputSchema: z.object({
      assistantId: z.string().describe('The ID of the best matched assistant.'),
      reason: z.string().describe('The reason for choosing this assistant.'),
    }),
  },
  async (input) => {
    // Implement the logic to select the best assistant based on the input.
    // This is a placeholder implementation.
    if (!input.assistantPool || input.assistantPool.length === 0) {
      return { assistantId: 'no-match', reason: 'No assistants available.' };
    }

    // Simple logic: Find the first assistant whose service history includes the requested service.
    const matchedAssistant = input.assistantPool.find(assistant =>
      assistant.serviceHistory.includes(input.serviceRequest)
    );

    if (matchedAssistant) {
      return { assistantId: matchedAssistant.assistantId, reason: 'Assistant has a history of providing the requested service.' };
    }

    // If no exact match, return the first assistant in the pool.
    return { assistantId: input.assistantPool[0].assistantId, reason: 'No assistant with matching service history found, returning the closest assistant.' };
  }
);

const matchVerifiedAssistantsPrompt = ai.definePrompt({
  name: 'matchVerifiedAssistantsPrompt',
  input: { schema: MatchVerifiedAssistantsInputSchema },
  output: { schema: MatchVerifiedAssistantsOutputSchema },
  tools: [selectAssistantTool],
  prompt: `Given a user's location and service request, and a pool of available assistants, determine the best assistant to dispatch.

User Location: Latitude: {{{userLocation.latitude}}}, Longitude: {{{userLocation.longitude}}}
Service Request: {{{serviceRequest}}}

Available Assistants:
{{#each assistantPool}}
  - Assistant ID: {{{assistantId}}}, Location: Latitude: {{{location.latitude}}}, Longitude: {{{location.longitude}}}, Service History: {{{serviceHistory}}}, Rating: {{{rating}}}
{{/each}}

Consider the assistant's location, service history, and rating to determine the best match. Use the selectAssistant tool to select the best assistant.

Output the assistant ID of the best match and the reason for choosing that assistant.
`,
});

const matchVerifiedAssistantsFlow = ai.defineFlow(
  {
    name: 'matchVerifiedAssistantsFlow',
    inputSchema: MatchVerifiedAssistantsInputSchema,
    outputSchema: MatchVerifiedAssistantsOutputSchema,
  },
  async input => {
    const { output } = await matchVerifiedAssistantsPrompt(input);
    return output!;
  }
);
