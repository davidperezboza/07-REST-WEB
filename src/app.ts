import http from 'http';

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.write('Hello World!');
    res.end();
});


server.listen(8080, () => {
    console.log('Server running on port 8080');
})