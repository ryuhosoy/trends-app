import express, { json } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import googleTrends from "google-trends-api";
import { getJson } from "serpapi";
import env from "dotenv";

env.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const fetchJsonWithRetry = async (params, maxRetries = 3, delay = 1000) => {
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      return await new Promise((resolve, reject) => {
        getJson(params, (json) => {
          if (json.error) {
            reject(new Error(json.error));
          } else {
            resolve(json);
          }
        });
      });
    } catch (error) {
      attempts++;
      if (attempts >= maxRetries) {
        throw error; 
      }
      console.warn(`Retrying... (${attempts}/${maxRetries})`);
      await new Promise((res) => setTimeout(res, delay)); // 遅延
    }
  }
};

app.post("/api/relatedQueries", async (req, res) => {
  try {
    const result = await fetchJsonWithRetry(
      {
        engine: "google_trends",
        q: req.body.searchKeyword,
        data_type: "RELATED_QUERIES",
        geo: "JP",
        hl: "ja",
        api_key: process.env.SERPAPI_KEY,
      },
      3,
      1000
    );
    console.log(result.related_queries);
    res.send(result.related_queries);
  } catch (error) {
    console.error("Error fetching related queries:", error.message);
    res.status(500).send({ error: "Failed to fetch related queries." });
  }
});

app.post("/api/dailyTrends", async (req, res) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  googleTrends.dailyTrends(
    {
      trendDate: yesterday,
      geo: "JP",
      hl: "ja",
    },
    function (err, results) {
      if (err) {
        console.error("Error fetching daily trends:", err);
        res.status(500).send({ error: "Failed to fetch daily trends" });
      } else {
        try {
          const data = JSON.parse(results);
          console.log(data);
          res.send(data);
        } catch (parseError) {
          console.error("Error parsing results:", parseError);
          res.status(500).send({ error: "Failed to parse trends data" });
        }
      }
    }
  );
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
