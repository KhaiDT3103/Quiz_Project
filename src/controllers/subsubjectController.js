const { Subject, SubSubject } = require("../models");

//Lấy tất cả môn học phân lớp
exports.getAllSubSubject = async (req, res) => {
    try {
        const subsubject = await SubSubject.findAll();
        res.json(subsubject);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server👹", error });
    }
};

//Thêm môn học phân lớp
exports.createSubSubject = async (req, res) => {
    try {

        const { subject_name, subject_id } = req.body;
        if (!subject_name || !subject_id) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin👹" });
        }

        const subjectExists = await Subject.findByPk(subject_id);
        if (!subjectExists) {
            return res.status(404).json({ message: `Không tìm thấy môn học chính👹` });
        }

        //const newUser = await User.create({ username, password, role, createdAt, updatedAt });
        const newSubSubject = await SubSubject.create({ subject_name, subject_id });
        res.status(201).json({ message: "Môn học phân lớp đã được tạo👹", subsubject: newSubSubject });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server👹", error });
    }
};

//Xoá môn học phân lớp
exports.deleteSubSubject = async (req, res) => {
    try {
        const { subsubject_id } = req.params;
        const subsubject = await SubSubject.findByPk(subsubject_id);
        if (!subsubject) {
            return res.status(404).json({ message: "Không tìm thấy môn học phân lớp👹" });
        }
        await subsubject.destroy();
        res.status(200).json({ message: `Môn học đã bị xóa👹` });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server👹", error: error.message || error });
    }
}

//Sửa môn học phân lớp
exports.updateSubSubject = async (req, res) => {
    try {
        const { subsubject_id } = req.params;
        const { subject_name, subject_id } = req.body;
        const subsubject = await SubSubject.findByPk(subsubject_id);
        if (!subsubject) {
            return res.status(404).json({ message: "Không tìm thấy môn học👹" });
        }
        if (subject_id && subject_id !== subsubject.subject_id) {
            const subjectExists = await Subject.findByPk(subject_id);
            if (!subjectExists) {
                return res.status(404).json({ message: `Không tồn tại môn học chính👹` });
            }
            subsubject.subject_id = subject_id || subsubject.subject_id;
        }
        subsubject.subject_name = subject_name || subsubject.subject_name;


        await subsubject.save();
        res.status(200).json({ message: `Môn học đã được cập nhật👹` });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server👹", error: error.message || error });
    }
}