import http from "http";
import express from "express";

const app = express();
const port = 3000;

app.use (express.json());

app.get("/", (req, res) => {
    res.send("API Server is running");

});
console.log("API Server is running");

app.get("/health", (req,res) =>{
    res.json({
        status:"OK",
        message:"Server is Healthy"
    })
})

app.get("/api/test", (req,res) => {
    res.json({
        success:true,
        message:"API is TESTED Successfully"

    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 