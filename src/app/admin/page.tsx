'use client';

import { Header } from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function RidesManagement() {
    const rides = [
        { id: 'RIDE-001', user: 'John Doe', driver: 'Jane Smith', status: 'Completed', service: 'Towing', date: '2024-07-28' },
        { id: 'RIDE-002', user: 'Peter Pan', driver: 'Chen W.', status: 'In Progress', service: 'Fuel', date: '2024-07-28' },
        { id: 'RIDE-003', user: 'Mary Jane', driver: 'Maria S.', status: 'Canceled', service: 'Mechanical', date: '2024-07-27' },
    ];
    return (
        <Card>
            <CardHeader>
                <CardTitle>Rides Management</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ride ID</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Driver</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rides.map(ride => (
                            <TableRow key={ride.id}>
                                <TableCell className="font-medium">{ride.id}</TableCell>
                                <TableCell>{ride.user}</TableCell>
                                <TableCell>{ride.driver}</TableCell>
                                <TableCell>{ride.service}</TableCell>
                                <TableCell><Badge variant={ride.status === 'Completed' ? 'default' : ride.status === 'Canceled' ? 'destructive' : 'secondary'}>{ride.status}</Badge></TableCell>
                                <TableCell>{ride.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

function DriverApplications() {
    const applications = [
        { id: 'APP-001', name: 'Robert K.', status: 'Pending', date: '2024-07-25' },
        { id: 'APP-002', name: 'Emily White', status: 'Approved', date: '2024-07-24' },
    ];
    return (
        <Card>
            <CardHeader>
                <CardTitle>Driver Applications</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>App ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.map(app => (
                            <TableRow key={app.id}>
                                <TableCell>{app.id}</TableCell>
                                <TableCell>{app.name}</TableCell>
                                <TableCell><Badge variant={app.status === 'Approved' ? 'default' : 'secondary'}>{app.status}</Badge></TableCell>
                                <TableCell>{app.date}</TableCell>
                                <TableCell>
                                    {app.status === 'Pending' && <Button size="sm">Review</Button>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

function UserManagement() {
     const users = [
        { id: 'USR-101', name: 'John Doe', role: 'Customer', status: 'Active' },
        { id: 'USR-102', name: 'Jane Smith', role: 'Driver', status: 'Active' },
        { id: 'USR-103', name: 'Peter Pan', role: 'Customer', status: 'Suspended' },
    ];
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell><Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>{user.status}</Badge></TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm">Manage</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}


function LiveMap() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>All Users Location</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[500px] w-full bg-muted rounded-md flex items-center justify-center">
                    <p>Live map placeholder</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default function AdminPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex-1 bg-background p-4 md:p-8">
                <div className="mx-auto w-full max-w-7xl">
                    <div className="mb-6">
                        <h1 className="text-3xl font-headline font-bold">Admin Panel</h1>
                        <p className="text-muted-foreground">Manage your RoadGuard application.</p>
                    </div>

                    <Tabs defaultValue="rides">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="rides">Rides</TabsTrigger>
                            <TabsTrigger value="applications">Applications</TabsTrigger>
                            <TabsTrigger value="users">Users</TabsTrigger>
                            <TabsTrigger value="map">Live Map</TabsTrigger>
                        </TabsList>
                        <TabsContent value="rides">
                            <RidesManagement />
                        </TabsContent>
                        <TabsContent value="applications">
                            <DriverApplications />
                        </TabsContent>
                        <TabsContent value="users">
                           <UserManagement />
                        </TabsContent>
                        <TabsContent value="map">
                            <LiveMap />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
