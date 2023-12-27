'use client';

import Link from 'next/link';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';

import { IEvent } from '@/lib/database/models/event.model';

import { Button } from '@/components/ui/button';

import Checkout from './checkout';

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className='flex items-center gap-3'>
      {/* CANNOT BUY PAST EVENT */}
      {hasEventFinished ? (
        <p className='p-2 text-red-500'>
          Sorry tickets are no longer available.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className='button rounded-full' size='lg'>
              <Link href='/sign-in'>Get Tickets</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};
export default CheckoutButton;
