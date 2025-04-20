const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        // Đăng nhập thành công
        res.redirect("/"); // hoặc về trang dashboard
    }
);

router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});
router.post("/google", authController.googleLogin);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;