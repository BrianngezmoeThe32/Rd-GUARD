'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Camera, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function VerifyPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [verificationMethod, setVerificationMethod] = useState<'face' | 'otp' | null>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (verificationMethod === 'face') {
            const getCameraPermission = async () => {
              try {
                const stream = await navigator.mediaDevices.getUserMedia({video: true});
                setHasCameraPermission(true);

                if (videoRef.current) {
                  videoRef.current.srcObject = stream;
                }
              } catch (error) {
                console.error('Error accessing camera:', error);
                setHasCameraPermission(false);
                toast({
                  variant: 'destructive',
                  title: 'Camera Access Denied',
                  description: 'Please enable camera permissions in your browser settings to use this app.',
                });
              }
            };

            getCameraPermission();
            
            return () => {
                // Stop camera stream when component unmounts or method changes
                if (videoRef.current && videoRef.current.srcObject) {
                    const stream = videoRef.current.srcObject as MediaStream;
                    stream.getTracks().forEach(track => track.stop());
                }
            }
        }
    }, [verificationMethod, toast]);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would implement actual verification logic
        toast({ title: "Verification Successful!", description: "Redirecting to your dashboard." });
        // Redirect based on user type, for now just to request page
        router.push('/request');
    }

    const renderVerificationMethod = () => {
        if (verificationMethod === 'face') {
            return (
                <div className="space-y-4">
                    <p className="text-center text-muted-foreground">Center your face in the camera view.</p>
                    <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
                        <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted />
                        { hasCameraPermission === false && (
                            <Alert variant="destructive" className="absolute bottom-4 left-4 right-4">
                                <AlertTitle>Camera Access Required</AlertTitle>
                                <AlertDescription>
                                    Please allow camera access to use this feature.
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                    <Button onClick={handleVerify} className="w-full" disabled={!hasCameraPermission}>Verify with Face</Button>
                </div>
            );
        }
        if (verificationMethod === 'otp') {
            return (
                <form onSubmit={handleVerify} className="space-y-4">
                    <p className="text-center text-muted-foreground">Enter the 6-digit code sent to your number.</p>
                    <div className="space-y-2">
                        <Label htmlFor="otp">One-Time Password</Label>
                        <Input id="otp" type="text" placeholder="123456" required maxLength={6} />
                    </div>
                    <Button type="submit" className="w-full">Verify with OTP</Button>
                </form>
            );
        }
        return (
            <div className="flex flex-col gap-4">
                <Button variant="outline" onClick={() => setVerificationMethod('face')}>
                    <Camera className="mr-2" />
                    Verify with Face Recognition
                </Button>
                <Button variant="outline" onClick={() => setVerificationMethod('otp')}>
                    <MessageSquare className="mr-2" />
                    Verify with OTP
                </Button>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <div className="mb-4 flex justify-center">
                        <Shield className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-2xl">Verify Your Identity</CardTitle>
                    <CardDescription>Choose a method to complete your login.</CardDescription>
                </CardHeader>
                <CardContent>
                    {renderVerificationMethod()}
                </CardContent>
            </Card>
        </div>
    )
}
