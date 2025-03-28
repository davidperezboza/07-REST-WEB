import { Request, Response } from "express"
import { prisma } from "../../data/postgres";

const todos = [
    {
        id: 1,
        text: 'Buy milk',
        completedAt: new Date(),
    },
    {
        id: 2,
        text: 'Buy bread',
        completedAt: null,
    },
    {
        id: 3,
        text: 'Buy butter',
        completedAt: new Date(),
    },
];

export class TodosController{
    //*DI
    constructor(){}

    public getTodos = async (req: Request, res: Response) =>  {
        try {
            const todos = await prisma.todo.findMany()
            res.json(todos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;

        if(isNaN(id)) {
            res.status(400).json({ message: 'ID argument is not a number' });
            return;
        };

        try {
            const todo = await prisma.todo.findUnique({
                where: {
                    id,
                }
            });

            if(!todo){
                res.status(404).json({ message: `Todo with id ${id} not found` });
                return;
            };

            res.json(todo);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });   
        }
    }

     public createTodo = async(req: Request, res: Response) => {
        const {text} = req.body;
        if(!text) {
            res.status(400).json({ error: 'Text property is required' });
            return;
        }

        try {
            const todo = await prisma.todo.create({
                data: {
                    text,
                }
            });
    
            res.json(todo);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    public updateTodo = async(req: Request, res: Response) => {
        const id = +req.params.id;

        if(isNaN(id)) {
            res.status(400).json({ error: 'ID argument is not a number' });
            return;
        };
        try {
            const todoAnt =  await prisma.todo.findUnique({
                where: {
                    id,
                }
            });

            if(!todoAnt){
                res.status(404).json({ message: `Todo with id ${id} not found` });
                return;
            };

            const {text, completedAt} = req.body;

            const todoUpd = await prisma.todo.update({
                where: {
                    id,
                },
                data: {
                    text: text || todoAnt.text,
                    completedAt: (completedAt === "null")
                        ? null
                        : new Date(completedAt || todoAnt.completedAt),
                },
            });

            res.json(todoUpd);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
            
        }
    };

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        if(isNaN(id)) {
            res.status(400).json({ error: 'ID argument is not a number' });
            return;
        };

        try {
            const todo = await prisma.todo.findUnique({
                where: {
                    id,
                }
            });

            if(!todo){
                res.status(404).json({ message: `Todo with id ${id} not found` });
                return;
            };

            await prisma.todo.delete({
                where: {
                    id,
                }
            });

            res.json({ message: `Todo with id ${id} was deleted` });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }

    };

};