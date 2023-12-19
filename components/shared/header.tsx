import Image from 'next/image';
import Link from 'next/link';
import { SignedOut } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex items-center justify-between'>
        <Link href='/' className='w-36'>
          <Image
            src='/assets/images/logo.svg'
            width={128}
            height={38}
            alt='Evently logo'
          />
        </Link>

        <div className='w-32 flex justify-end gap-3'>
          <SignedOut>
            <Button asChild className='rounded-full' size='lg'>
              <Link href='/sign-in'>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};
export default Header;