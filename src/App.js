
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth } from './pages/auth/index';
import { ExpenseTracker } from './pages/template-home';
import { CampaignSelection } from './pages/campaign-selection';
import { CampaignSummaries } from './pages/campaign-summaries';
import { DMPage } from './pages/dm-page';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" exact element={<ExpenseTracker />} />
          <Route path="/campaign-selection" exact element={<CampaignSelection />} />
          <Route path="/campaign-summaries" exact element={<CampaignSummaries />} />
          <Route path="/dmpage" exact element={<DMPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
