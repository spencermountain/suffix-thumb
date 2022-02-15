import { convert, learn, reverse, test, classify } from './src/index.js'

// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBD.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBZ.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBG.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/NNS.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'

let pairs = [

  ["beat", "beat"],
  ["bet", "bet"],
  ["bias", "biased"],
  ["bid", "bid"],
  ["bike", "biked"],
  ["boss", "bossed"],
  ["buzz", "buzzed"],
  ["core", "cored"],
  ["cut", "cut"],
  ["eye", "eyed"],
  ["fit", "fit"],
  ["frame", "framed"],
  ["game", "gamed"],
  ["gas", "gassed"],
  ["gloss", "glossed"],
  ["guess", "guessed"],
  ["hit", "hit"],
  ["inhale", "inhaled"],
  ["manoeuvre", "manoeuvred"],
  ["mess", "messed"],
  ["name", "named"],
  ["perfume", "perfumed"],
  ["pore", "pored"],
  ["programme", "programmed"],
  ["prune", "pruned"],
  ["redo", "redid"],
  ["rendezvous", "rendezvous"],
  ["scout", "scouted"],
  ["set", "set"],
  ["shed", "shed"],
  ["ski", "skied"],
  ["smile", "smiled"],
  ["spite", "spited"],
  ["spread", "spread"],
  ["sprinkle", "sprinkled"],
  ["stall", "stalled"],
  ["time", "timed"],
  ["toll", "tolled"],
  ["tone", "toned"],
  ["toss", "tossed"],
  ["vibe", "vibed"],
  ["zone", "zoned"],
  ["kiss", "kissed"],
  ["witness", "witnessed"],
]

// let model = learn(pairs)
// console.dir(model, { depth: 5 })
// console.log(convert('tallied', model))
// const rev = reverse(model)
// console.log(convert('tally', rev))
test(pairs)
// console.log(classify('gleaning', model))