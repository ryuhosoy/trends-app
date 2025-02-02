import { useState } from "react";
import axios from "axios";
import "./RelatedQueries.css";

interface TrendItem {
  query: string;
  value: number;
  extracted_value: number;
  link: string;
}

interface TrendsData {
  rising: TrendItem[];
  top: TrendItem[];
}

function RelatedQueries() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [trendsData, setTrendsData] = useState<TrendsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "https://trends-app-backend.vercel.app/api/relatedQueries",
        { searchKeyword }
      );
      setTrendsData(response.data);
    } catch (err) {
      setError("データの取得中にエラーが発生しました。もう一度お試しください。");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="related-queries-container">
      <div className="search-section">
        <h1>関連トレンド検索</h1>
        <p>キーワードを入力して、関連するトレンドを探してみましょう</p>

        <form onSubmit={handleSubmit}>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="知りたいトレンドのキーワードを入力"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit" className="search-button" disabled={loading}>
              検索
            </button>
          </div>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-message">
          データを取得しています（20秒ほどかかる場合がございます）
        </div>
      ) : (
        trendsData && (
          <div className="results-section">
            <div className="trend-card">
              <h2>上昇中のトレンド</h2>
              <table className="trend-table">
                <thead>
                  <tr>
                    <th>順位</th>
                    <th>キーワード</th>
                    <th>上昇率</th>
                  </tr>
                </thead>
                <tbody>
                  {trendsData.rising.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.query}</td>
                      <td>{item.value}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="trend-card">
              <h2>人気のトレンド</h2>
              <table className="trend-table">
                <thead>
                  <tr>
                    <th>順位</th>
                    <th>キーワード</th>
                    <th>検索量</th>
                  </tr>
                </thead>
                <tbody>
                  {trendsData.top.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.query}</td>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default RelatedQueries;
