import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>トレンドウォッチャー</h1>
        <p>リアルタイムでトレンドを把握し、データドリブンな意思決定をサポート</p>
      </div>
      <div className="HomeButtonWrp">
        <button className="btn btn-primary" onClick={() => navigate("/relatedQueries")}>
          関連トレンドを見る
        </button>
        <button className="btn btn-primary" onClick={() => navigate("/dailyTrends")}>
          デイリートレンドを見る
        </button>
      </div>
    </div>
  );
}

export default Home;
