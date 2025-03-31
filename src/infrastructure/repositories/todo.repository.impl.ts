import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {
    constructor(
        private readonly datatasource: TodoDataSource,
    ){};

    create(createTododDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datatasource.create(createTododDto);
    };

    getAll(): Promise<TodoEntity[]> {
        return this.datatasource.getAll();
    };

    findById(id: number): Promise<TodoEntity> {
        return this.datatasource.findById(id);
    }

    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datatasource.updateById(updateTodoDto);
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datatasource.deleteById(id);
    }

}