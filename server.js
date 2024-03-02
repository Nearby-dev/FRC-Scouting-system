const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment');

const databasePath = "database/scoutingData.json";
const backupPath = "backup";

const app = express();
const port = 3000;


app.use(cors()); // Adicionando o middleware CORS
// Middleware para processar corpos de solicitação JSON
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Se você está lendo isso. O servidor está funcionando! Recarregue a página');
  });
  
  app.listen(port, '192.168.18.157', () => {
    console.log(`Servidor rodando em http://192.168.18.157:${port}`);
  });
// Rota para adicionar dados ao arquivo JSON externo
app.post('/addData', (req, res) => {
    const newData = req.body;

    // Carrega os dados existentes do arquivo JSON
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao ler o arquivo JSON');
        }

        let jsonData = [];
        if (data) {
            jsonData = JSON.parse(data);
        }

        // Adiciona os novos dados ao array
        jsonData.push(newData);

        // Escreve os dados atualizados de volta ao arquivo JSON
        fs.writeFile(databasePath, JSON.stringify(jsonData, null, 4), err => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao escrever no arquivo JSON');
            }

            console.log('Dados adicionados com sucesso!');
            createBackup();
            exportToCsv();
            res.sendStatus(200);
        });
    });
});
function getCurrentDateTime() {
    return moment().format('YYYY-MM-DD_HH-mm-ss');
}

function createBackup(){
    const fileName = `backup_${getCurrentDateTime()}.json`;
    fs.copyFile(databasePath, path.join(backupPath, fileName), (err) => {
        if (err) {
            console.error('Erro ao copiar o arquivo:', err);
            return;
        }
        console.log('Backup realizado com sucesso!');
    });
}

function jsonToCsv(jsonData) {
    let csvString = '';

    const headers = Object.keys(jsonData[0]);
    csvString += headers.join(',') + '\n';

    jsonData.forEach(item => {
        const values = headers.map(header => item[header]);
        csvString += values.join(',') + '\n';
    });

    return csvString;
}

function exportToCsv(){
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            return;
        }
    
        try {
            const jsonData = JSON.parse(data);
    
            // Convertendo JSON para CSV
            const csvData = jsonToCsv(jsonData);
    
            // Escrevendo no arquivo CSV
            fs.writeFile('data.csv', csvData, 'utf8', (err) => {
                if (err) {
                    console.error('Erro ao escrever no arquivo CSV:', err);
                    return;
                }
                console.log('Arquivo CSV criado com sucesso!');
            });
        } catch (error) {
            console.error('Erro ao analisar o JSON:', error);
        }
    });
}


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
