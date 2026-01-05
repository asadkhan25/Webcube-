import express from "express";
import requestLogger from "./middlewares/requestLogger.js";
import responseTimeTracker from "./middlewares/responseTime.js";

const app = express();
const port = 3000;

/* Global Middlewares */
app.use(express.json());
app.use(requestLogger);
app.use(responseTimeTracker);

/* Routes */
app.get("/", (req, res) => {
  res.send("API Server is running");
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is Healthy",
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is TESTED Successfully",
  });
});

/* Server Start */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
