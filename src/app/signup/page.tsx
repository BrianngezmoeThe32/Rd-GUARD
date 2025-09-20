'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically perform user registration
        // For now, we'll just redirect to the login page
        router.push('/login');
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mb-4 flex justify-center">
                        <Shield className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
                    <CardDescription>Join RoadGuard and drive with peace of mind.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSignup}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="full-name">Full Name</Label>
                            <Input id="full-name" type="text" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="you@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="••••••••" required />
                        </div>
                        <div className="space-y-2">
                            <Label>Account Type</Label>
                            <RadioGroup defaultValue="customer" className="flex gap-4">
                                <div>
                                    <RadioGroupItem value="customer" id="customer" />
                                    <Label htmlFor="customer" className="ml-2">Customer</Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="provider" id="provider" />
                                    <Label htmlFor="provider" className="ml-2">Service Provider</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" className="w-full">Create Account</Button>
                        <p className="text-center text-sm text-muted-foreground">
                            Already have an account? <Link href="/login" className="font-medium text-primary hover:underline">Log in</Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
