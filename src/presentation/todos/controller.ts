import { Request, Response } from 'express'
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { CreateTodo, GetTodo, GetTodos, TodoRepository } from '../../domain';

export class TodosController{
    //*DI
    constructor(
        private readonly todoRepository: TodoRepository,
    ){}

    public getTodos = (req: Request, res: Response) =>  {
       new GetTodos(this.todoRepository)
        .execute()
        .then(todos => res.json(todos))
        .catch(error => res.status(404).json(error));
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;

        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(404).json({error}));
    }

     public createTodo = async(req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if(error) {
            res.status(400).json({ error });
            return;
        };

        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(404).json({error}));
    };

    public updateTodo = async( req: Request, res: Response ) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
        if ( error ) {
            res.status( 400 ).json( { error } );
            return;
        }
        
        const updateTodo = await this.todoRepository.updateById(updateTodoDto!);
        res.json(updateTodo);
    
    };

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        if(isNaN(id)) {
            res.status(400).json({ error: 'ID argument is not a number' });
            return;
        };

        const deletedTodo = await this.todoRepository.deleteById(id);
        res.json(deletedTodo);
    };

};