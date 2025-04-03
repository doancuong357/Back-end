import {Router} from "express";
const router = Router();
import db from '../db.json' with {type:'json'};
import fs from 'fs';
import path from 'path';
const DB_FILE = path.resolve('./db.json');
const writeData = (data) => {
    //nên dùng async await kết hợp với try-catch
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};
// Get all users
router.get('/', (req, res) => {
    res.status(200).json({
        users: db.users});
});
// Get user by ID
router.get('/:id', (req, res) => {
    const user = db.users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
// Create new user
router.post('/', (req, res) => {
    //ở đây client có thể truyền id lên được ở body, nên tách ra phần sinh id riêng 
    const newUser = {
        id: db.users.length ? db.users[db.users.length - 1].id + 1 : 1,
        ...req.body
    };
    //thêm bước kiểm tra xem dữ liệu truyền vào có đầy đủ hay không
    db.users.push(newUser);
    writeData({ users: db.users });
    res.status(201).json(newUser);
});
// Update user
router.put('/:id', (req, res) => {
    const index = db.users.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        db.users[index] = { id: parseInt(req.params.id), ...req.body };
        writeData({ users: db.users });
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
// Delete user
router.delete('/:id', (req, res) => {
    const filteredUsers = db.users.filter(u => u.id !== parseInt(req.params.id));
    if (filteredUsers.length !== db.users.length) {
        db.users = filteredUsers;
        writeData({ users: db.users });
        res.status(200).json(true);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
export default router
//git checkout -b fea/crud...(nếu lỗi ở assert thì thay bằng with)
