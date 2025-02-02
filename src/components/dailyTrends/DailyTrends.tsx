import axios from "axios";
import { useEffect, useState } from "react";

function DailyTrends() {
  const [dailyTrendsData, setDailyTrendsData] = useState<{
    default: {
      trendingSearchesDays: {
        trendingSearches: {
          title: { query: string };
          formattedTraffic: string;
          image: { newsUrl: string; imageUrl: string };
        }[];
      }[];
    };
  } | null>(null);

  const fetchDailyTrends = async () => {
    try {
      const response = await axios.post(
        "trends-app-backend.vercel.app/api/dailyTrends"
      );
      setDailyTrendsData(response.data);
    } catch (err) {
      console.error("Error fetching daily trends data:", err);
    }
  };

  useEffect(() => {
    fetchDailyTrends();
  }, []);

  setInterval(fetchDailyTrends, 60000);

  console.log("dailyTrendsData", dailyTrendsData);
  
  return (
    <div className="daily-trends-container">
      <div className="page-header">
        <h1>日常トレンド</h1>
      </div>
      <table className="trend-table">
        {dailyTrendsData ? (
          <thead>
            <tr>
              <th>順位</th>
              <th>タイトル</th>
              <th>アクセス数</th>
              <th>ニュースをクリック</th>
            </tr>
          </thead>
        ) : (
          ""
        )}
        {dailyTrendsData ? (
          <tbody>
            {dailyTrendsData.default.trendingSearchesDays[0].trendingSearches.map(
              (item, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.title.query}</td>
                  <td>{item.formattedTraffic}</td>
                  <td>
                    <a href={item.image.newsUrl}>
                      <img src={item.image.imageUrl} alt="" />
                    </a>
                  </td>
                </tr>
              )
            )}
          </tbody>
        ) : (
          ""
        )}
      </table>
    </div>
  );
}

export default DailyTrends;
