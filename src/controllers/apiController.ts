import { Request, Response } from "express";
import { Todo } from "../models/Todos";
import { Op, Sequelize } from "sequelize";
import { off } from "process";
import sharp from "sharp";
import { unlink } from "fs/promises";


export const uploadFile = async (req: Request, res: Response) => {
    if(req.file) {
        await sharp(req.file.path)
                .resize(500, null, {
                    fit: sharp.fit.fill,
                    position: 'top'
                })
                .toFormat('jpeg')
                .toFile(`./public/media/${req.file.filename}.jpeg`)

        await unlink(req.file.path);

        res.json({success: 'Arquivo recebido'})
    } else {
        res.status(400);
        res.json({error: 'Arquivo invalido'});
    }
}


export const todo = async (req: Request, res: Response) => {
    let allTasks = await Todo.findAll();

    res.json(allTasks);
};

export const addTask = async (req: Request, res: Response) => {
    let title: string = req.body.title;
    let done: boolean = req.body.done;

    let newTask = await Todo.create({
        title,
        done
    });

    res.status(201);
    res.json({
        id: newTask.id,
        title: newTask.title,
        done: newTask.done
    });
};

export const specificTask = async (req: Request, res: Response) => {
    let {id} = req.params;

    let task = await Todo.findByPk(id);

    if(task) {
        res.json(task);
    } else {
        res.json('Página não encontrada')
        res.status(404)
    }
}

export const changeTaks = async (req: Request, res: Response) => {
    let {id, title, done} = req.body;

    let task = await Todo.findByPk(id);

    if (task) {
        if(title) {
            task.title = title;
        }
        
        if(done) {
            if(done.toLowerCase() === 'true') {
                task.done = true
            } else if (done.toLowerCase() === 'false') {
                task.done = false
            } else {
                res.json({erro: 'Só podem ser enviados valores booleanos'})
            }
        }
        
        await task.save();

        res.status(200);
        res.json({task});
    } else {
        res.json({erro: 'Trefa não encontrada'});
        res.status(404);
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    let {id} = req.params;

    let task = await Todo.findByPk(id);

    if(task) {
        await task.destroy();

        res.json({sucesso: 'Tarefa deletada com sucesso'});
    } else {
        res.json({erro: 'Frase não pode ser deletada ou encontrada'});
    }
}