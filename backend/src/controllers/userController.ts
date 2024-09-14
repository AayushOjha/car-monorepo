import { Request, Response } from 'express';
import { db } from '../lib/db_client';

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const newUser = await db.user.create({
      data: {
        name,
        email
      }
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const bookService = async (req: Request, res: Response) => {
  const { userId, carType, planType, startDate, timeSlot } = req.body;

  try {
    const subscription = await db.subscription.create({
      data: {
        userId,
        carType,
        planType,
        startDate: new Date(startDate),
        timeSlot
      }
    });
    res.status(201).json(subscription);
  } catch (error) {
    console.error('Error booking service:', error);
    res.status(500).json({ error: 'Failed to book service' });
  }
};

export const getUserSubscriptions = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const subscriptions = await db.subscription.findMany({
      where: { userId },
      include: {
        cleaningEvents: true
      }
    });
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
};
