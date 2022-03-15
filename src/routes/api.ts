import { Router, Request, Response } from "express";
import * as ApiController from '../controllers/apiController';
import multer from 'multer';

const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb) => {
        const allowed: string[] = ['image/jpeg', 'image/jpg', 'image/png'];

        if(allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false)
        }      
    }
});

const router = Router();


router.get('/todo/:id', ApiController.specificTask)
router.get('/todo', ApiController.todo);
router.post('/todo', ApiController.addTask);
router.put('/todo', ApiController.changeTaks);
router.delete('/todo/:id', ApiController.deleteTask);

router.post('/upload', upload.single('avatar'), ApiController.uploadFile)


export default router;