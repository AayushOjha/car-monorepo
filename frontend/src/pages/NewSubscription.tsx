import { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NewSubscription = () => {
  const [plan, setPlan] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Add the logic to handle subscription creation
    alert(`Subscribed to ${plan}`);
    navigate('/subscriptions');
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h1 className="text-2xl mb-6 text-center font-bold">New Subscription</h1>
        <TextField
          select
          label="Choose a plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="Basic Plan">Basic Plan</MenuItem>
          <MenuItem value="Premium Plan">Premium Plan</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" fullWidth className="mt-4">
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default NewSubscription;
