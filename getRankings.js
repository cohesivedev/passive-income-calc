const fetch   = require('node-fetch');
const {parse} = require('node-html-parser');

fetch('https://www.fundsexplorer.com.br/ranking')
    .then(res => res.text())
    .then(html => {

        const indexTableRanking    = html.indexOf('<table id="table-ranking"');
        const indexTableRankingEnd = html.indexOf('</table', indexTableRanking);

        const root = parse(html.slice(
            indexTableRanking, indexTableRankingEnd
        ));

        console.log(root.querySelectorAll('tbody'));
    });

