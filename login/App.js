const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const loadUserData = () => {
    try {
        const data = fs.readFileSync('login.json', 'utf8');
        return JSON.parse(data).usuario;
    } catch (error) {
        console.error('Erro ao carregar os dados do arquivo JSON:', error);
        return [];
    }
};

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const usuarios = loadUserData();

    const user = usuarios.find(user => user.usuario === username && user.senha == password);

    if (user) {
        res.send('Login bem-sucedido!');
    } else {
        res.render('index');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});





/* Para rodar: node App.js
   Para encerrar: Ctrl + C
   Para inicializar o projeto: npm init -y
   Para instalar dependências: npm install <nome-dependencia>
*/

