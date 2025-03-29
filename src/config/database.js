const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load biến môi trường từ .env


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false
});

sequelize.authenticate()
    .then(() => console.log("✅ Kết nối MySQL thành công!"))
    .catch(err => console.error("❌ Lỗi kết nối MySQL:", err));

module.exports = sequelize;
// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//     "mysql://root:IeocwSyYIZcxfyWdwnNSOyOWstaCqgjB@tramway.proxy.rlwy.net:57353/railway",
//     {
//         dialect: "mysql",
//         logging: false,
//         dialectOptions: {
//             ssl: { require: true, rejectUnauthorized: false },
//         },
//     }
// );

// sequelize
//     .authenticate()
//     .then(() => console.log("✅ Kết nối thành công với MySQL trên Railway!"))
//     .catch((err) => console.error("❌ Lỗi kết nối:", err));

// module.exports = sequelize;
