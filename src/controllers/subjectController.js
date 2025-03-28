const { Subject } = require("../models");

//Lấy tất cả môn học
exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.findAll();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

//Thêm môn học
exports.createSubject = async (req, res) => {
    try {

        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
        }

        const newSubject = await Subject.create({ name });
        res.status(201).json({ message: "Môn học đã được thêm", subject: newSubject });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error });
    }
};

//Xoá môn học
exports.deleteSubject = async (req, res) => {
    try {
        const { subject_id } = req.params;
        const subject = await Subject.findByPk(subject_id);
        if (!subject) {
            return res.status(404).json({ message: "Không tìm thấy môn học" });
        }
        await subject.destroy();
        res.status(200).json({ message: `Môn học đã bị xóa` });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message || error });
    }
}

//Sửa môn học
// exports.updateUser = async (req, res) => {
//     try {
//         const { user_id } = req.params;
//         const { username, password, role, email } = req.body;
//         const user = await User.findByPk(user_id);
//         if (!user) {
//             return res.status(404).json({ message: "Không tìm thấy người dùng" });
//         }
//         user.username = username || user.username;
//         user.password = password || user.password;
//         user.role = role || user.role;
//         user.email = email || user.email;
//         user.updatedAt = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
//         await user.save();
//         res.status(200).json({ message: `Người dùng có ID ${user_id} đã được cập nhật`, user });
//     } catch (error) {
//         res.status(500).json({ message: "Lỗi server", error: error.message || error });
//     }
// }
exports.updateSubject = async (req, res) => {
    try {
        const { subject_id } = req.params;
        const { name } = req.body;
        const subject = await Subject.findByPk(subject_id);
        if (!subject) {
            return res.status(404).json({ message: "Không tìm thấy môn học" });
        }
        subject.name = name || subject.name;

        await subject.save();
        res.status(200).json({ message: `Môn học đã được cập nhật` });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message || error });
    }
}