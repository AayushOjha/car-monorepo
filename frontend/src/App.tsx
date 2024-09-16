import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Subscriptions from './pages/Subscriptions';
import NewSubscription from './pages/NewSubscription';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/:userId/subscriptions" element={<Subscriptions />} />
        <Route path="/:userId/subscriptions/new" element={<NewSubscription />} />
      </Routes>
    </Router>
  );
}

export default App;
