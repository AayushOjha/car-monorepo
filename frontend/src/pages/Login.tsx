import { useState, FormEvent, useEffect } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Divider,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../services/types/user';
import { UserApi } from '../services/api/users';

const Login: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [existingUsers, setExistingUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const navigate = useNavigate();


  useEffect(() => {    
    UserApi.list()
      .then((res) => {
        setExistingUsers(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  // Handle form submission to create account
  const handleCreateAccount = (e: FormEvent) => {
    e.preventDefault();
    if (name && email) {
      UserApi.create(name, email)
        .then((res) => {
          alert(`Account created for ${name} (${email})`);
          navigate(`${res.id}/subscriptions`);
        })
        .catch((e) => {
          alert(JSON.stringify(e));
        });
    } else {
      alert('Please enter both name and email');
    }
  };

  // Handle user selection from dropdown
  const handleContinueAs = () => {
    if (selectedUser) {
      navigate(`${selectedUser}/subscriptions`);
    } else {
      alert('Please select a user');
    }
  };

  // Handle dropdown change
  const handleUserSelect = (e: SelectChangeEvent<string>) => {
    setSelectedUser(e.target.value);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h1 className="text-2xl mb-6 text-center font-bold">
          Login or Create Account
        </h1>

        {/* Create Account Form */}
        <form onSubmit={handleCreateAccount}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth className="mt-4">
            Create account and continue
          </Button>
        </form>

        {/* Separator */}
        <Divider className="my-6" />

        {/* Continue as existing user */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="select-user-label">Continue as</InputLabel>
          <Select
            labelId="select-user-label"
            value={selectedUser}
            onChange={handleUserSelect}
            fullWidth
          >
            {existingUsers.map((user) => (
              <MenuItem key={user.id} value={user.email}>
                {user.name} ({user.email})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleContinueAs}
          fullWidth
          className="mt-4"
        >
          Continue as selected user
        </Button>
      </div>
    </div>
  );
};

export default Login;
