const express = require("express");
const urlRoute = require("./routes/url");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(
  console.log("MongoDB Connected :)")
);

//template engines for render HTML-ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Default middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/testurl", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home");
// });

app.use("/url", urlRoute);

app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
