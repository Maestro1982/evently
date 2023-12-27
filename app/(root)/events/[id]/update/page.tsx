import { auth } from '@clerk/nextjs';

import EventForm from '@/components/shared/event-form';
import { getEventById } from '@/lib/actions/event.actions';

type UpdateEventProps = {
  params: {
    id: string;
  };
};

const UpdateEventPage = async ({ params: { id } }: UpdateEventProps) => {
  const { sessionClaims } = auth();
  const event = await getEventById(id);

  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <h3 className='wrapper h3-bold text-center sm:text-left'>
          Update Event
        </h3>
      </section>

      <div className='wrapper my-8'>
        <EventForm
          userId={userId}
          type='Update'
          event={event}
          eventId={event._id}
        />
      </div>
    </>
  );
};
export default UpdateEventPage;
