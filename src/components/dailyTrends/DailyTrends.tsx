import axios from "axios";
import { useEffect, useState } from "react";

function DailyTrends() {
  const [dailyTrendsData, setDailyTrendsData] = useState<string[]>();

  useEffect(() => {
    const fetchDailyTrends = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/dailyTrends"
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
        <table border="1">
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
                (item: string[], index: number) => (
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
