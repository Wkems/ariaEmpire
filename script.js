const fs = require('fs');
const file = 'src/data/products.ts';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/price:\s*(\d+),/g, (match, p1) => {
    return 'price: ' + (parseInt(p1) * 1000) + ',';
});
fs.writeFileSync(file, content);
console.log('Prices updated successfully.');
