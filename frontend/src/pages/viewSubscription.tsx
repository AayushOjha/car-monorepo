import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import { UserApi } from '../services/api/users';
import { Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ISubscription } from '../services/types/subscription';
import { NavigateNextSharp } from '@mui/icons-material';

const ViewSubscription: React.FC = () => {
  const [subscription, setSubscription] = useState<ISubscription | null>(null);
  const { subscriptionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch subscription details including cleaning events
    const fetchSubscription = async () => {
      try {
        const res = await UserApi.getSubscriptionById(subscriptionId || '');
        setSubscription(res.data);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      }
    };

    fetchSubscription();
  }, [subscriptionId]);

  // Highlight cleaning events on the calendar
  const tileClassName = ({ date }: { date: Date }) => {
    if (!subscription) return '';

    // Format the date to match cleaning event date
    const formattedDate = dayjs(date).format('DD MMM');

    const event = subscription.cleaningEvents.find(
      (event) => dayjs(event.date).format('DD MMM') === formattedDate
    );

    // Apply different classes for interior and exterior cleaning events
    if (event?.eventType) {
      return event.eventType === 'INTERIOR' ? '!bg-pink-200 !font-bold' : '!bg-green-200 !font-bold';
    }

    return '';
  };

  return (
    <div className="p-6">
      <Typography variant="h4" className="font-bold mb-4">
        Subscription Details
      </Typography>

      {/* Subscription Info */}
      {subscription && (
        <div className="mb-6 mt-5">
          <Typography>Car Type: {subscription.carType}</Typography>
          <Typography>Plan Type: {subscription.planType}</Typography>
          <Typography>
            Start Date: {dayjs(subscription.startDate).format('DD MMM')}
          </Typography>
          <Typography>
            Time Slot: {subscription.timeSlot.replace(/_/g, ' ')}
          </Typography>
        </div>
      )}

      {/* Calendar */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-fit">
        <Calendar
          tileClassName={tileClassName}
        />
      </div>

      
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back to Subscriptions
        </Button>
      
    </div>
  );
};

export default ViewSubscription;
