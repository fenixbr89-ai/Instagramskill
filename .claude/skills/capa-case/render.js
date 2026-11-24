// Uso: node render.js config.json saida.png
// config.json: {"tag":"CASE • DROGARIA","titulo":"Vídeo que<br>vende pelo <span>WhatsApp.</span>",
//               "cliente":"Drogarias Medclass","servico":"Motion design","frame":"/caminho/frame.jpg"}
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const [cfgPath, out = 'capa.png'] = process.argv.slice(2);
const c = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const dir = __dirname;
const html = fs.readFileSync(path.join(dir, 'template.html'), 'utf8')
  .replace('{{TAG}}', c.tag).replace('{{TITULO}}', c.titulo)
  .replace('{{CLIENTE}}', c.cliente).replace('{{SERVICO}}', c.servico || 'Motion design')
  .replace('{{FRAME}}', 'file://' + path.resolve(c.frame));
const tmp = path.join(dir, '.render.html');
fs.writeFileSync(tmp, html);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + tmp); await p.waitForTimeout(400);
  await p.screenshot({ path: path.resolve(out) }); await b.close(); fs.unlinkSync(tmp);
  console.log('ok', path.resolve(out));
})();
