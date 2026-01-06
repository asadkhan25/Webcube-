import express from "express";
import userRoutes from "./routes/userRoute.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(port, () => {
    console.log(`Server is Sucessfully Running on port ${port}`);
});

