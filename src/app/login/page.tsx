'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [role, setRole] = useState<'customer' | 'provider'>('customer');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically perform authentication
        // For now, we'll just redirect to the verify page, passing the role
        const verifyUrl = role === 'customer' ? '/request' : '/dashboard';
        router.push(`/login/verify?redirect=${verifyUrl}`);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <div className="mb-4 flex justify-center">
                        <Shield className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-2xl">Welcome to RoadGuard</CardTitle>
                    <CardDescription>Enter your credentials to access your account.</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>I am a...</Label>
                            <RadioGroup value={role} onValueChange={(value) => setRole(value as 'customer' | 'provider')} className="flex gap-4 pt-1">
                                <div>
                                    <RadioGroupItem value="customer" id="customer" />
                                    <Label htmlFor="customer" className="ml-2 font-normal cursor-pointer">Customer</Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="provider" id="provider" />
                                    <Label htmlFor="provider" className="ml-2 font-normal cursor-pointer">Service Provider</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="id-number">ID Number</Label>
                            <Input id="id-number" type="text" placeholder="Your ID Number" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="••••••••" required />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" className="w-full">Login</Button>
                        <p className="text-center text-sm text-muted-foreground">
                            Don't have an account? <Link href="/signup" className="font-medium text-primary hover:underline">Sign up</Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
