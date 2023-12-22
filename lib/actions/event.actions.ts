'use server';

import { revalidatePath } from 'next/cache';

import { CreateEventParams } from '@/types';

import { handleError } from '@/lib/utils';
import { connectToDatabase } from '@/lib/database';
import User from '@/lib/database/models/user.model';
import Event from '@/lib/database/models/event.model';

// CREATE
export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error('Organizer not found');

    console.log({
      categoryId: event.categoryId,
      organizerId: userId,
    });

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}
