import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="HomeButtonWrp">
        <button onClick={() => navigate("/RelatedQueries")}>
          関連トレンドを見る
        </button>
        <button onClick={() => navigate("/DailyTrends")}>
          日常トレンドを見る
        </button>
      </div>
    </>
  );
}

export default Home;
