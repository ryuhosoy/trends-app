import axios from "axios";
import { useState } from "react";

function RelatedQueries() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [trendsData, setTrendsData] = useState<{
    rising: {
      query: string;
      value: number;
      extracted_value: number;
      link: string;
      serpapi_link: string;
    }[];
    top: {
      query: string;
      value: number;
      extracted_value: number;
      link: string;
      serpapi_link: string;
    }[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://trends-app-qi5t.onrender.com//api/relatedQueries",
        { searchKeyword }
      );
      setTrendsData(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="searchbar">
          <input
            type="text"
            className="searchInput"
            placeholder="知りたいトレンドのキーワードを入力"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
          />
        </div>
      </form>
      <div className="results">
        <div className="rising">
          {loading ? (
            <p>取得しています。(20秒ほどかかる場合がございます。)</p>
          ) : (
            ""
          )}
          <h1>上昇中ランキング</h1>
          <table style={{ border: "1px solid black" }}>
            {trendsData ? (
              <thead>
                <tr>
                  <th>順位</th>
                  <th>キーワード</th>
                  <th>検索回数増加率</th>
                </tr>
              </thead>
            ) : (
              ""
            )}
            {trendsData ? (
              <tbody>
                {trendsData.rising.map((item, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.query}</td>
                    <td>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              ""
            )}
          </table>
        </div>
        <div className="top">
          <h1>トップランキング</h1>
          <table style={{ border: "1px solid black" }}>
            {trendsData ? (
              <thead>
                <tr>
                  <th>順位</th>
                  <th>キーワード</th>
                  <th>検索回数(max100)</th>
                </tr>
              </thead>
            ) : (
              ""
            )}
            {trendsData ? (
              <tbody>
                {trendsData.top.map((item, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.query}</td>
                    <td>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              ""
            )}
          </table>
        </div>
      </div>
    </>
  );
}

export default RelatedQueries;
