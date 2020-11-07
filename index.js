import {rankings} from './rankings.json';

const FILTER_NONE = () => true;

const SORT_CODE_ALPHA = (r1, r2) => {
    return r1[0].localeCompare(r2[0]);
};

function renderTable(filterFunc = FILTER_NONE) {
    const sortedAndFiltered = rankings.filter(filterFunc);

    sortedAndFiltered.sort(SORT_CODE_ALPHA);

    document.getElementById('rankings').innerHTML = sortedAndFiltered
        .map(
            r => `<tr><td>${r[0]}</td><td>${r[2]}</td><td>${r[4]}</td><td>${r[5]}</td><td class="more"></td></tr>`
        )
        .join('');
}

function updateTableBySearch() {
    const query = document.getElementById('search').value.trim().toUpperCase();

    const startsWith = new RegExp('^' + query);
    renderTable(r => startsWith.test(r[0]));
}

const el = {
    search: document.getElementById('search')
};

el.search.addEventListener('keyup', updateTableBySearch);
el.search.addEventListener('change', updateTableBySearch);

renderTable();
