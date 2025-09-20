import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Phone, MessageSquare, MapPin } from 'lucide-react';
import type { Assistant } from '@/app/page';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '../ui/input';

interface AssistantEnRouteProps {
  assistant: Assistant;
  onServiceCompleted: () => void;
  onCancel: () => void;
}

function ChatInterface({assistant}: {assistant: Assistant}) {
    return (
        <Card className="flex h-80 flex-col">
            <CardHeader className="border-b p-4">
                <CardTitle className="text-base font-medium">Chat with {assistant.name.split(' ')[0]}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-4 overflow-y-auto p-4">
                <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${assistant.id}`} alt={assistant.name} />
                      <AvatarFallback>{assistant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="max-w-[75%] rounded-lg bg-muted p-3 text-sm">On my way! Should be there in about {assistant.eta}.</p>
                </div>
                <div className="flex items-start justify-end gap-3">
                    <p className="max-w-[75%] rounded-lg bg-primary p-3 text-sm text-primary-foreground">Great, thank you!</p>
                </div>
            </CardContent>
            <div className="border-t p-2">
                <Input
                    type="text"
                    placeholder="Type a message..."
                    className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>
        </Card>
    );
}

function MapView({ assistant }: { assistant: Assistant }) {
  const mapImage = PlaceHolderImages.find((image) => image.id === 'roadguardmap');
  return (
    <Card className="h-96 w-full overflow-hidden shadow-lg">
        <div className="relative h-full w-full bg-muted">
            <Image
                src={mapImage?.imageUrl || ''}
                alt={mapImage?.description || ''}
                fill
                className="object-cover"
                data-ai-hint={mapImage?.imageHint}
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center text-white">
                <MapPin className="h-12 w-12 text-primary drop-shadow-lg" />
                <p className="mt-2 font-bold text-lg drop-shadow-md">Map View Placeholder</p>
                <p className="text-sm drop-shadow-md">Real-time tracking of {assistant.name}</p>
            </div>
        </div>
    </Card>
  );
}

export default function AssistantEnRoute({ assistant, onServiceCompleted, onCancel }: AssistantEnRouteProps) {
  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">Help is on the way!</h1>
        <p className="mt-2 text-lg text-muted-foreground">{assistant.name} is en route.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
            <MapView assistant={assistant} />
            <ChatInterface assistant={assistant} />
        </div>
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Assistant Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${assistant.id}`} alt={assistant.name} />
                  <AvatarFallback>{assistant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-bold">{assistant.name}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{assistant.rating} / 5.0</span>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vehicle</p>
                <p>{assistant.vehicle}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Estimated Arrival</p>
                <p className="text-2xl font-bold text-primary">{assistant.eta}</p>
              </div>
              <Separator />
               <div className="flex space-x-2">
                    <Button variant="outline" className="w-full"><Phone className="mr-2 h-4 w-4" /> Call</Button>
                    <Button variant="outline" className="w-full"><MessageSquare className="mr-2 h-4 w-4" /> Message</Button>
                </div>
            </CardContent>
          </Card>
          <Card className="border-green-500 bg-green-500/10">
            <CardHeader>
                <CardTitle className="font-headline text-green-800 dark:text-green-300">Service Completion</CardTitle>
                <CardDescription className="text-green-700 dark:text-green-400">
                    Once the service is successfully completed, please confirm below.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="w-full bg-green-600 text-white hover:bg-green-700" onClick={onServiceCompleted}>
                    Confirm Service Completion
                </Button>
            </CardContent>
          </Card>
          <Button variant="destructive" className="w-full" onClick={onCancel}>
            Cancel Request
          </Button>
        </div>
      </div>
    </div>
  );
}
