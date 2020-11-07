import {rankings} from './rankings.json';

const el = {
    search:         document.getElementById('search'),
    rankings:       document.getElementById('rankings'),
    modal:          document.getElementById('modal'),
    shares:         document.getElementById('shares'),
    sharesValue:    document.getElementById('shares-value'),
    sharesProgress: document.getElementById('shares-progress'),
    fiatValue:      document.getElementById('fiat-value'),
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.PIC = {
    originatingEl:   null,
    dividendForFund: 0,

    showModal: (originatingEl, dividendForFund) => {
        PIC.dividendForFund = dividendForFund;
        PIC.originatingEl   = originatingEl;
        originatingEl.classList.add('calculate');
        el.modal.style.display = 'block';
    },

    hideModal: () => {
        PIC.originatingEl.classList.remove('calculate');
        el.modal.style.display = 'none';
    },

};


function updateShareQuantity() {
    const {value, clientWidth}    = el.shares;
    el.sharesValue.innerHTML      = value;
    el.sharesProgress.style.width = (Math.floor(clientWidth * value / 10000) - 2) + 'px';


    const dividend = parseFloat(PIC.dividendForFund.replace('R$', '').replace(',', '.').trim());

    el.fiatValue.innerHTML = `R$${(value * dividend).toFixed(2).replace('.', ',')}`;
}

el.shares.addEventListener('input', updateShareQuantity);
window.addEventListener('resize', updateShareQuantity);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const FILTER_NONE = () => true;

const SORT_CODE_ALPHA = (r1, r2) => {
    return r1[0].localeCompare(r2[0]);
};

function renderTable(filterFunc = FILTER_NONE) {
    const sortedAndFiltered = rankings.filter(filterFunc);

    sortedAndFiltered.sort(SORT_CODE_ALPHA);

    el.rankings.innerHTML = sortedAndFiltered
        .map(
            (r, i) => `<tr><td>${r[0]}</td><td>${r[2]}</td><td>${r[4]}</td><td>${r[5]}</td><td class="more" onclick="PIC.showModal(this,'${r[4]}')"></td></tr>`
        )
        .join('');
}

function updateTableBySearch() {
    const query = document.getElementById('search').value.trim().toUpperCase();

    const startsWith = new RegExp('^' + query);
    renderTable(r => startsWith.test(r[0]));
}


el.search.addEventListener('keyup', updateTableBySearch);
el.search.addEventListener('change', updateTableBySearch);

renderTable();

