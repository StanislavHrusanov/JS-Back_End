const http = require('http');
const fs = require('fs/promises');
const catTemplate = require('./templates/catTemplate');

const port = 5000;
const server = http.createServer(async (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    if (req.url == '/styles/site.css') {
        res.writeHead(200, {
            'Content-Type': 'text/css'
        });

        const style = await fs.readFile('./content/styles/site.css', 'utf-8');
        res.write(style);

    } else if (req.url.startsWith('/search')) {
        const querystring = req.url.split('?')[1];
        const searched = querystring.split('=')[1];
        const homePage = await fs.readFile('./views/home.html', 'utf-8');
        const cats = JSON.parse(await fs.readFile('./cats.json', 'utf-8'))
            .filter(cat => cat.name.toLowerCase().includes(searched.toLowerCase()));
        
            const home = homePage.replace('{{ cats }}', cats.map(catTemplate).join(''));
        
        res.write(home);

    } else {
        const homePage = await fs.readFile('./views/home.html', 'utf-8');
        const cats = JSON.parse(await fs.readFile('./cats.json', 'utf-8'));
        const home = homePage.replace('{{ cats }}', cats.map(catTemplate).join(''));
        res.write(home);
    }
    res.end();
});

server.listen(port, () => { console.log(`Server is listening on port ${port}...`) });