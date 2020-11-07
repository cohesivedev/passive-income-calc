fetch('https://www.fundsexplorer.com.br/ranking', {
    mode: 'no-cors',
})
.then(res=>res.text())
.then(res=>console.log(res));
