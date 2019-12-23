const http = require('http');
const https = require('https');
const fs = require('fs');

const url = 'http://www.omdbapi.com?apikey=5f81bfba&s=Batman&type=movie';
const downloadFolder = './dg-movie/src/assets/images';

let totalPages = 0;

http.get(url, response => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', () => {
        const json = JSON.parse(data);
        if (json.Response === 'False') {
            console.error(json.Error);
            return;
        }
    
        downloadPosters(json.Search);
    
        const total = json.totalResults;
        totalPages = Math.ceil(total / 10);
        for (let i = 2; i <= totalPages; i++) {
            downloadPage(i);
        }
    });
});

function downloadPage(page) {
    http.get(`${url}&page=${page}`, response => {
        let data = '';
    
        response.on('data', (chunk) => {
            data += chunk;
        });
    
        response.on('end', () => {
            const json = JSON.parse(data);
            if (json.Response === 'False') {
                console.error(json.Error);
                return;
            }
        
            downloadPosters(json.Search);
        });
    });
}

function downloadPosters(items) {
    for (let item of items) {
        download(item.Poster);
    }
}

function download(uri) {
    if (uri === 'N/A') {
        return;
    }
    
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const file = fs.createWriteStream(`${downloadFolder}/${filename}`);

    https.get(uri, res => {
        res.on('data', data => {
            file.write(data);
        }).on('end', () => {
            file.end();
        });
    });
}
