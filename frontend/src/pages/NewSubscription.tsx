import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserApi } from '../services/api/users';
import { CarType, PlanType, TimeSlot } from '../services/types/subscription';
import { Button, MenuItem, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';

const NewSubscription: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Assuming userId is passed in the URL

  // Form state
  const [carType, setCarType] = useState<CarType | ''>('');
  const [planType, setPlanType] = useState<PlanType | ''>('');
  const [startDate, setStartDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [timeSlot, setTimeSlot] = useState<TimeSlot | ''>('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!carType || !planType || !timeSlot) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Call your API to create the subscription
      await UserApi.createSubscription({
        userId: userId || '',
        carType,
        planType,
        startDate: new Date(startDate).toString(),
        timeSlot
      });

      // Navigate back to subscriptions list
      navigate(`/${userId}/subscriptions`);
    } catch (error) {
      console.error("Failed to create subscription", error);
      alert("An error occurred while creating the subscription.");
    }
  };

  return (
    <div className="p-6">
      <Typography variant="h4" className="font-bold mb-4 text-center">Book Subscription</Typography>
      <form onSubmit={handleSubmit} className="space-y-4 mt-10 w-5/6 lg:w-[500px] mx-auto">
        {/* Car Type */}
        <TextField
          select
          label="Car Type"
          value={carType}
          onChange={(e) => setCarType(e.target.value as CarType)}
          fullWidth
        >
          <MenuItem value="HATCHBACK">Hatchback</MenuItem>
          <MenuItem value="SEDAN">Sedan</MenuItem>
          <MenuItem value="CSUV">CSUV</MenuItem>
          <MenuItem value="SUV">SUV</MenuItem>
        </TextField>

        {/* Plan Type */}
        <TextField
          select
          label="Plan Type"
          value={planType}
          onChange={(e) => setPlanType(e.target.value as PlanType)}
          fullWidth
        >
          <MenuItem value="DAILY">Daily</MenuItem>
          <MenuItem value="ALTERNATE">Alternate</MenuItem>
        </TextField>

        {/* Start Date */}
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Time Slot */}
        <TextField
          select
          label="Time Slot"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value as TimeSlot)}
          fullWidth
        >
          <MenuItem value="MORNING_6_8_AM">6-8 AM</MenuItem>
          <MenuItem value="MORNING_8_10_AM">8-10 AM</MenuItem>
          <MenuItem value="MORNING_10_12_AM">10-12 AM</MenuItem>
        </TextField>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Subscription
        </Button>
      </form>
    </div>
  );
};

export default NewSubscription;
