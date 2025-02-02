import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from "./components/home/Home";
import RelatedQueries from "./components/relatedQueries/RelatedQueries";
import DailyTrends from "./components/dailyTrends/DailyTrends";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/relatedQueries" element={<RelatedQueries />} />
              <Route path="/dailyTrends" element={<DailyTrends />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
