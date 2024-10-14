import axios from "axios";
import { useEffect, useState } from "react";

function DailyTrends() {
  const [dailyTrendsData, setDailyTrendsData] = useState<{
    default: {
      trendingSearchesDays: {
        trendingSearches: {
          title: { query: string };
          formattedTraffic: string;
        }[];
      }[];
    };
  } | null>(null);

  useEffect(() => {
    const fetchDailyTrends = async () => {
      try {
        const response = await axios.post(
          "https://trends-app-qi5t.onrender.com//api/dailyTrends"
        );
        setDailyTrendsData(response.data);
      } catch (err) {
        console.error("Error fetching daily trends data:", err);
      }
    };
    fetchDailyTrends();
  }, []);

  return (
    <>
      <div className="dailyTrends">
        <h1>日常トレンド</h1>
        <table style={{ border: "1px solid black" }}>
          {dailyTrendsData ? (
            <thead>
              <tr>
                <th>順位</th>
                <th>タイトル</th>
                <th>アクセス数</th>
              </tr>
            </thead>
          ) : (
            ""
          )}
          {dailyTrendsData ? (
            <tbody>
              {dailyTrendsData.default.trendingSearchesDays[0].trendingSearches.map(
                (
                  item,
                  index: number
                ) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.title.query}</td>
                    <td>{item.formattedTraffic}</td>
                  </tr>
                )
              )}
            </tbody>
          ) : (
            ""
          )}
        </table>
      </div>
    </>
  );
}

export default DailyTrends;
