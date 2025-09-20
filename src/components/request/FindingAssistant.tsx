'use client';

import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ServiceType, Assistant } from '@/app/page';
import { matchVerifiedAssistants, MatchVerifiedAssistantsInput } from '@/ai/flows/match-verified-assistants';
import { useToast } from "@/hooks/use-toast";

interface FindingAssistantProps {
  service: ServiceType;
  onAssistantFound: (assistant: Assistant) => void;
  onCancel: () => void;
}

// Mock data for assistants pool
const mockAssistants = [
    { assistantId: 'asst_1', location: { latitude: 34.0522, longitude: -118.2437 }, serviceHistory: ['fuel', 'towing'], rating: 4.8 },
    { assistantId: 'asst_2', location: { latitude: 34.0550, longitude: -118.2500 }, serviceHistory: ['mechanical', 'towing'], rating: 4.5 },
    { assistantId: 'asst_3', location: { latitude: 34.0500, longitude: -118.2400 }, serviceHistory: ['fuel', 'mechanical'], rating: 4.9 },
    { assistantId: 'asst_4', location: { latitude: 34.0600, longitude: -118.2300 }, serviceHistory: ['jump-start'], rating: 4.2 },
];

const mockAssistantDetails: Omit<Assistant, 'id' | 'location'>[] = [
    { name: 'John D.', vehicle: 'Ford Transit Fuel Van', rating: 4.8, eta: '12 mins' },
    { name: 'Maria S.', vehicle: 'Chevy Silverado Tow Truck', rating: 4.5, eta: '15 mins' },
    { name: 'Chen W.', vehicle: 'Mobile Mechanic Van', rating: 4.9, eta: '10 mins' },
    { name: 'Robert K.', vehicle: 'Service Sedan', rating: 4.2, eta: '18 mins' },
];

export default function FindingAssistant({ service, onAssistantFound, onCancel }: FindingAssistantProps) {
  const { toast } = useToast();

  useEffect(() => {
    const findAssistant = async () => {
      // In a real app, we'd get the user's location via browser Geolocation API
      const userLocation = { latitude: 34.052235, longitude: -118.243683 };
      
      const input: MatchVerifiedAssistantsInput = {
        userLocation,
        serviceRequest: service,
        assistantPool: mockAssistants,
      };

      try {
        // A realistic delay for the AI call and dispatch logic
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const result = await matchVerifiedAssistants(input);

        if (result && result.assistantId !== 'no-match') {
          const assistantIndex = mockAssistants.findIndex(a => a.assistantId === result.assistantId);
          if (assistantIndex !== -1) {
            const assistantDetails = mockAssistantDetails[assistantIndex];
            const assistantData = mockAssistants[assistantIndex];
            
            const foundAssistant: Assistant = {
              id: result.assistantId,
              name: assistantDetails.name,
              vehicle: assistantDetails.vehicle,
              rating: assistantDetails.rating,
              eta: assistantDetails.eta,
              location: assistantData.location
            };
            onAssistantFound(foundAssistant);
          } else {
             throw new Error('Matched assistant not found in mock data.');
          }
        } else {
          throw new Error('No suitable assistants found at the moment. Please try again later.');
        }
      } catch (error) {
        console.error("Failed to find assistant:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "An unknown error occurred.",
        });
        onCancel();
      }
    };

    findAssistant();
  }, [service, onAssistantFound, onCancel, toast]);

  return (
    <div className="flex flex-col items-center space-y-6 text-center py-12">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
      <h2 className="text-3xl font-headline font-bold">Finding a verified assistant...</h2>
      <p className="max-w-md text-muted-foreground">
        We're searching our network for the best-rated and closest assistant for your{' '}
        <span className="font-bold text-primary">{service}</span> request.
      </p>
      <p className="text-sm text-muted-foreground">This should only take a moment.</p>
      <Button variant="outline" onClick={onCancel}>
        Cancel Request
      </Button>
    </div>
  );
}
