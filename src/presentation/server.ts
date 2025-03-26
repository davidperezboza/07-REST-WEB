import express, { Request, Response } from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path: string;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly public_path: string;

    constructor(options: Options) {
        const { port, public_path } = options;
        this.port = port;
        this.public_path = public_path;
    }

    async start() {
        //* Middleware
        //* Public folder
        this.app.use(express.static(this.public_path));

        this.app.get('/api/todos', (req: Request, res: Response) => {
            res.json([
                {
                    id: 1,
                    text: 'Buy milk',
                    createdAt: new Date(),
                },
                {
                    id: 2,
                    text: 'Buy bread',
                    createdAt: null,
                },
                {
                    id: 3,
                    text: 'Buy butter',
                    createdAt: new Date(),
                },
            ]);
        });

        //* SPA
        this.app.get('*', (req: Request, res: Response) => {
            const indexPath = path.join(__dirname, `../../../${this.public_path}/index.html`);
            res.sendFile(indexPath);
        });

        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}