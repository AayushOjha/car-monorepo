import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useEffect, useState } from 'react';
import { UserApi } from '../services/api/users';
import { ISubscription } from '../services/types/subscription';
import { getTimeSlotString } from '../services/helpers/parseTimeSlot';
import CancelIcon from '@mui/icons-material/Cancel';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import dayjs from 'dayjs';

const Subscriptions = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const { userId } = useParams();

  // State for dialog
  const [open, setOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] =
    useState<ISubscription | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    UserApi.listSubscription(userId || '')
      .then((res) => {
        setSubscriptions(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handleCancelSubscription = (subscription: ISubscription) => {
    const today = dayjs();
    const startDate = dayjs(subscription.startDate);

    if (startDate.isBefore(today) || startDate.isSame(today)) {
      setErrorMessage('You cannot cancel an ongoing service.');
      setOpen(true); // Show the dialog with error message
    } else {
      setSelectedSubscription(subscription);
      setErrorMessage(''); // Clear any previous error
      setOpen(true); // Show confirmation dialog
    }
  };

  const handleConfirmCancel = async () => {
    if (selectedSubscription && userId) {
      try {
        await UserApi.cancelSubscription(userId, selectedSubscription.id);
        setSubscriptions(
          subscriptions.filter((sub) => sub.id !== selectedSubscription.id)
        );
        setOpen(false); // Close the dialog
      } catch (error: any) {
        setErrorMessage(error.message);
        setOpen(true);
        console.error('Error canceling subscription:', error);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSubscription(null); // Reset selection on close
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Subscriptions</h1>
      <Button
        variant="contained"
        onClick={() => navigate(`/${userId}/subscriptions/new`)}
      >
        Add New Subscription
      </Button>

      <div className="my-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {subscriptions.map((subscription) => (
          <Card key={subscription.id.toString()} className="max-w-sm">
            <CardContent>
              <Typography variant="h6" component="div">
                {subscription.planType} | {subscription.carType}
              </Typography>
              <Typography color="textSecondary">
                Time Slot: {getTimeSlotString(subscription.timeSlot)} | Start
                date: {dayjs(subscription.startDate).format('DD MMM')}
              </Typography>
              <Typography color="textSecondary">
                Status: {subscription.status}
              </Typography>
            </CardContent>
            <div className="p-4 flex justify-between">
              {/* Cancel Subscription Button */}
              <Button
                variant="outlined"
                color="error"
                className="!leading-height"
                startIcon={<CancelIcon />}
                onClick={() => handleCancelSubscription(subscription)}
              >
                Subscription
              </Button>

              {/* View Schedule Button */}
              <Button
                variant="contained"
                color="primary"
                className="!leading-height"
                endIcon={<CalendarMonthIcon />}
                onClick={() =>
                  navigate(`/subscriptions/${subscription.id}/schedule`)
                }
              >
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {errorMessage ? 'Error' : 'Cancel Subscription'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {errorMessage
              ? errorMessage
              : 'Are you sure you want to cancel this subscription?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {errorMessage ? (
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          ) : (
            <>
              <Button onClick={handleClose} color="primary">
                No
              </Button>
              <Button onClick={handleConfirmCancel} color="error">
                Yes, Cancel
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Subscriptions;
