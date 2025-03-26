import express from 'express';
import path from 'path';

export class Server {
    private app = express();

    async start() {
        //*Middleware
        //*Public folder
        this.app.use(express.static('public'));

        //*Routes
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + '../../../public/index.html');
            res.sendFile(indexPath);
        });

        this.app.listen(3000, () => {
            console.log(`Server is running on port ${3000}`);
        });
    };
};