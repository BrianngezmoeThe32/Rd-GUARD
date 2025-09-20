import { Fuel, Wrench, Car } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ServiceType } from '@/app/page';

interface RequestServiceProps {
  onServiceSelect: (service: ServiceType) => void;
}

const services = [
  { type: 'fuel' as ServiceType, name: 'Fuel Delivery', icon: Fuel, description: "Ran out of gas? We'll bring it to you." },
  { type: 'mechanical' as ServiceType, name: 'Mechanical Help', icon: Wrench, description: 'Engine trouble or other issues.' },
  { type: 'towing' as ServiceType, name: 'Towing Service', icon: Car, description: 'Need a tow to the nearest repair shop.' },
];

export default function RequestService({ onServiceSelect }: RequestServiceProps) {
  return (
    <div className="flex flex-col items-center space-y-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight lg:text-5xl">
          How can we help?
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Select a service below to get connected with a verified assistant.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        {services.map((service) => (
          <Card 
            key={service.type}
            className="group cursor-pointer text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary"
            onClick={() => onServiceSelect(service.type)}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onServiceSelect(service.type)}
            aria-label={`Request ${service.name}`}
          >
            <CardHeader className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="h-10 w-10" />
              </div>
              <CardTitle className="font-headline text-xl">{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
