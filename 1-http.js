import http from 'http';
const server=http.createServer((req, res)=>{
    if(req.url==='/'){res.end('Welcome to our home page')}
    else if(req.url==='/about'){res.end('Here is our short history')}
    else res.end(`
        <h1>OOPS</h1>
    `)
    res.end();
})
server.listen(5000)