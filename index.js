const http = require('node:http')
const fs = require('node:fs')

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url + '.html';
    if(req.url === '/') {
        filePath = './index.html';
    }

    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code === 'ENOENT') {
                fs.readFile('./404.html', (error, errorContent) => {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(errorContent, 'utf-8');
                })
            } else {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.end('Interval Server Error');
            }
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content, 'utf-8')
        }
    })
})

server.listen(8080);