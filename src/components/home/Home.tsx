import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate("/RelatedQueries")}>関連トレンドを見る</button>
      <button onClick={() => navigate("/DailyTrends")}>日常トレンドを見る</button>
    </>
  );
}

export default Home;
