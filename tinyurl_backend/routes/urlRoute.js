const express = require("express");
const router = express.Router();
const Url = require("../models/Url");

// Utility: Generate random 6-char string (Base62)
const generateShortCode = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

// POST /api/shorten
router.post("/shorten", async (req, res) => {
  const { longUrl, customCode, expireAt } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "Long URL is required" });
  }

  const shortCode = customCode ? customCode : generateShortCode();

  const existing = await Url.findOne({ shortCode });
  if (existing) {
    return res.status(400).json({ error: "Short code already exists. Please choose a different custom code." });
  }

  const newUrl = new Url({
    longUrl,
    shortCode,
    expireAt: expireAt ? new Date(expireAt) : undefined,
  });

  await newUrl.save();

  const shortUrl = `http://localhost:5000/${shortCode}`; // Use your domain in production

  res.json({ shortUrl, longUrl, shortCode, expireAt });
});

// GET /:shortCode - redirect
router.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).send("Short URL not found.");
    }

    if (urlDoc.expireAt && new Date() > urlDoc.expireAt) {
      return res.status(410).send("This link has expired.");
    }

    urlDoc.clicks += 1;
    await urlDoc.save();

    return res.redirect(urlDoc.longUrl);
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).send("Server error");
  }
});


module.exports = router;
