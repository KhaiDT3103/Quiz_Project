const app = require("./src/app");

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    serverStarted = true;
    console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
