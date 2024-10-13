import axios from "axios";
import { useState } from "react";

function RelatedQueries() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [trendsData, setTrendsData] = useState<string[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/relatedQueries",
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
          <table border="1">
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
                {trendsData.rising.map((item: string[], index: number) => (
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
          <table border="1">
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
                {trendsData.top.map((item: string[], index: number) => (
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
