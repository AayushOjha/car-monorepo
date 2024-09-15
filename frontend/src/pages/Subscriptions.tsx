import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';

const Subscriptions = () => {
  const navigate = useNavigate();

  // Mock subscription data
  const subscriptions = [
    { id: 1, name: 'Basic Plan', status: 'active' },
    { id: 2, name: 'Premium Plan', status: 'cancelled' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Subscriptions</h1>
      <Button
        variant="contained"
        onClick={() => navigate('/subscriptions/new')}
        className="mb-4"
      >
        Add New Subscription
      </Button>
      
      <div className="grid grid-cols-1 gap-4">
        {subscriptions.map((subscription) => (
          <Card key={subscription.id} className="max-w-sm">
            <CardContent>
              <Typography variant="h6" component="div">
                {subscription.name}
              </Typography>
              <Typography color="textSecondary">
                Status: {subscription.status}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
