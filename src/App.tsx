import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import RelatedQueries from "./components/relatedQueries/RelatedQueries";
import DailyTrends from "./components/dailyTrends/DailyTrends";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/relatedQueries" element={<RelatedQueries />} />
        <Route path="/dailyTrends" element={<DailyTrends />} />
      </Routes>
    </Router>
  );
}

export default App;
