---
name: capa-case
description: >-
  Cria a capa de Reels no modelo fixo de "case" do perfil do Kayke (fundo preto,
  verde-limão #D8F878, palavra de destaque em itálico serifado, print do vídeo
  do cliente dentro de um celular). Use sempre que ele pedir "capa", "capa do
  reels", "capa pro vídeo do cliente X" ou mandar um vídeo feito para cliente
  para postar no perfil.
---

# capa-case

Modelo aprovado pelo Kayke em 24/11/2026 (primeiro uso: Drogarias Medclass).
Exemplo final: `exemplo/capa-medclass.png`.

## Identidade (não mudar sem ele pedir)

- Fundo preto `#0a0a0a`, grade sutil e brilho verde-oliva atrás do celular.
- Verde do perfil: **#D8F878** (verde-limão). Não usar verde de WhatsApp.
- Título em Inter Display bold branco. A palavra de destaque vai em
  **Instrument Serif itálico**, na cor #D8F878, terminando com ponto
  (ex.: "*WhatsApp.*"). Mesmo estilo dos Reels dele ("faz *isso.*").
- Etiqueta discreta no topo: `CASE • <SEGMENTO>` em cinza, bolinha verde.
- Embaixo: nome do cliente e, abaixo, só o serviço (`Motion design`).
  Nada de duração ou formato.
- **Sem botão de play.** Ele não gosta.
- 1080x1920. Título, celular e cliente ficam dentro da área 3:4 do grid
  (y 240 a 1680), então nada corta no perfil.

## Como gerar

1. Ver o vídeo (frames com ffmpeg) e escolher o frame que melhor resume o
   serviço do cliente. Extrair em resolução cheia:
   `ffmpeg -ss <t> -i video.mp4 -frames:v 1 -q:v 2 frame.jpg`
2. Escrever um `config.json` (ver `exemplo/medclass.json`):
   - `tag`: `CASE • DROGARIA`, `CASE • IMOBILIÁRIA`...
   - `titulo`: duas linhas com `<br>`, destaque em `<span>palavra.</span>`
   - `cliente`, `servico` (padrão `Motion design`), `frame`
3. `node render.js config.json capa-<cliente>.png`
4. Olhar o resultado antes de mandar. Conferir se o texto do frame não ficou
   escondido e se o título cabe em duas linhas.

## Legenda

Depois da capa, escrever a legenda com a skill `ig-caption` (branch
`claude/instagram-agent-skill-setup-kr4i06` deste repo) e passar pelo
`ig-human`. Formato que ele aprovou: `exemplo/legenda-medclass.txt`.

- Job A: o Reel já tem o gancho. Linha 1 cita o cliente e faz a única
  chamada ("Me chama no direct").
- Corpo: o objetivo do vídeo e o que ele mostra, em primeira pessoa, frases
  curtas. Sem inventar números ou resultados.
- Termos de busca no texto ("vídeo para <segmento>", "motion design").
- 3 hashtags no fim. Sem emoji obrigatório.
- Observação: o linter detecta chamadas só em inglês, então o aviso "no call
  to action" é falso quando a chamada é "me chama no direct".
