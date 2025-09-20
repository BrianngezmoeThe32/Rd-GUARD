import Link from 'next/link';
import { Shield, User, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold">
          <Shield className="h-7 w-7 text-primary" />
          <span className="font-headline">RoadGuard</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="destructive" className="font-bold shadow-lg animate-pulse">
              <PhoneCall className="mr-2 h-4 w-4" />
              SOS
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">User Profile</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
