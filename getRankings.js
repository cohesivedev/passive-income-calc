const fetch           = require('node-fetch');
const {parse}         = require('node-html-parser');
const {writeFileSync} = require('fs');

fetch('https://www.fundsexplorer.com.br/ranking')
    .then(res => res.text())
    .then(html => {

        const indexTableRanking    = html.indexOf('<table id="table-ranking"');
        const indexTableRankingEnd = html.indexOf('</table', indexTableRanking);

        const root = parse(html.slice(
            indexTableRanking, indexTableRankingEnd
        ));

        let outputJSON = {};

        const rowHeaders = root.querySelectorAll('thead tr');
        for (let r of rowHeaders) {
            outputJSON.headers = r.querySelectorAll('th').map(th => th.rawText);
        }

        outputJSON.rankings = [];
        const rows = root.querySelectorAll('tbody tr');
        for (let r of rows) {
            outputJSON.rankings.push(r.querySelectorAll('td').map(td => td.rawText));
        }

        writeFileSync('rankings.json', JSON.stringify(outputJSON));
    });

