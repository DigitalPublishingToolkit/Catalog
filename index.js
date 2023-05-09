async function loadJSON(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

function createItemHTML(item) {
    const authors = item.author.map(author => `${author.family}, ${author.given}`).join('; ');
    const issued = (item.issued && item.issued['date-parts'] && item.issued['date-parts'][0]) ? item.issued['date-parts'][0].join('-') : '';
    const accessed = (item.accessed && item.accessed['date-parts'] && item.accessed['date-parts'][0]) ? item.accessed['date-parts'][0].join('-') : '';
    let html = `
    <div class="item">
      <div class="title">${item.title}</div>
      <div class="authors">${authors}</div>
      <div class="publisher">${item.publisher}, ${item['publisher-place']}, ${issued}</div>
      <div class="accessed">Accessed ${accessed}</div>
      <div class="url"><a href="${item.URL}">${item.URL}</a></div>
    </div>
  `;
    return html;
}

async function loadCatalog(url) {
    const catalog = await loadJSON(url);
    const itemsHTML = catalog.map(createItemHTML).join('\n');
    document.getElementById('catalog').innerHTML = itemsHTML;
}

loadCatalog('catalog.json');