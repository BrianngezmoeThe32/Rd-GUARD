'use client';

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Fuel, Wrench, Car, Clock } from "lucide-react";

const mockRequests = [
    { id: 1, service: 'Fuel Delivery', distance: '2.5 miles away', location: '123 Main St, Los Angeles', type: 'fuel', eta: '5 min' },
    { id: 2, service: 'Towing Service', distance: '5 miles away', location: '456 Oak Ave, Los Angeles', type: 'towing', eta: '12 min' },
    { id: 3, service: 'Mechanical Help', distance: '8 miles away', location: '789 Pine Ln, Los Angeles', type: 'mechanical', eta: '20 min' },
];

const serviceIcons = {
    fuel: <Fuel className="w-5 h-5" />,
    towing: <Car className="w-5 h-5" />,
    mechanical: <Wrench className="w-5 h-5" />,
}

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex-1 bg-background p-4 md:p-8">
                <div className="mx-auto w-full max-w-6xl">
                    <div className="mb-6">
                        <h1 className="text-3xl font-headline font-bold">Service Requests</h1>
                        <p className="text-muted-foreground">Available requests in your area.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {mockRequests.map(request => (
                            <Card key={request.id}>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>{request.service}</span>
                                        <Badge variant={request.type === 'fuel' ? 'default' : request.type === 'towing' ? 'destructive' : 'secondary'}>
                                            {serviceIcons[request.type as keyof typeof serviceIcons]}
                                            <span className="ml-2">{request.type}</span>
                                        </Badge>
                                    </CardTitle>
                                    <CardDescription className="flex items-center pt-2">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        {request.location}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-center text-sm">
                                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>Est. arrival: {request.eta}</span>
                                    </div>
                                    <p className="font-semibold">{request.distance}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full">Accept Request</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
