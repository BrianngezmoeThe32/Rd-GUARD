'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import RequestService from '@/components/request/RequestService';
import FindingAssistant from '@/components/request/FindingAssistant';
import AssistantEnRoute from '@/components/request/AssistantEnRoute';

export type ServiceType = 'fuel' | 'mechanical' | 'towing';

export type Assistant = {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  eta: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

export default function Home() {
  const [requestStep, setRequestStep] = useState<'idle' | 'finding' | 'en_route' | 'completed'>('idle');
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [foundAssistant, setFoundAssistant] = useState<Assistant | null>(null);

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service);
    setRequestStep('finding');
  };

  const handleAssistantFound = (assistant: Assistant) => {
    setFoundAssistant(assistant);
    setRequestStep('en_route');
  };

  const handleCancelRequest = () => {
    setRequestStep('idle');
    setSelectedService(null);
    setFoundAssistant(null);
  };
  
  const handleServiceCompleted = () => {
    // Here we would handle rating, payment, etc.
    setRequestStep('completed');
    // For this demo, we'll just reset to idle after a delay
    setTimeout(() => {
        setRequestStep('idle');
        setSelectedService(null);
        setFoundAssistant(null);
    }, 5000);
  };

  const renderContent = () => {
    switch (requestStep) {
      case 'finding':
        return <FindingAssistant service={selectedService!} onAssistantFound={handleAssistantFound} onCancel={handleCancelRequest} />;
      case 'en_route':
        return <AssistantEnRoute assistant={foundAssistant!} onServiceCompleted={handleServiceCompleted} onCancel={handleCancelRequest} />;
      case 'completed':
        return (
            <div className="text-center p-8">
                <h2 className="text-3xl font-headline font-bold text-primary">Service Completed!</h2>
                <p className="text-muted-foreground mt-2">Thank you for using RoadGuard. Drive safe!</p>
            </div>
        );
      case 'idle':
      default:
        return <RequestService onServiceSelect={handleServiceSelect} />;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center bg-background p-4 md:p-8">
        <div className="w-full max-w-5xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
