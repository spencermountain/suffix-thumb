import { convert, learn, reverse, test, classify } from './src/index.js'

// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBD.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBZ.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBG.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/NNS.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'

let pairs = [

  ["deceased", "decease", 2],
  ["interned", "intern", 2],
  ["naturalized", "naturalize", 2],
  ["educated", "educate", 2],
  ["loaned", "loan", 2],
  ["disenfranchised", "disenfranchise", 2],
  ["retraced", "retrace", 2],
  ["coproduced", "coproduce", 2],
  ["rehearsed", "rehearse", 2],
  ["funnelled", "funnel", 2],
  ["sheltered", "shelter", 2],
  ["sculptured", "sculpture", 2],
  ["surfed", "surf", 2],
  ["crowded", "crowd", 2],
  ["reinvigorated", "reinvigorate", 2],
  ["prospered", "prosper", 2],
  ["eluded", "elude", 2],
  ["endangered", "endanger", 2],
  ["appeased", "appease", 2],
  ["lambasted", "lambaste", 2],
  ["excepted", "except", 2],
  ["improvised", "improvise", 2],
  ["dissected", "dissect", 2],
  ["peppered", "pepper", 2],
  ["underdeveloped", "underdevelop", 2],
  ["unscrambled", "unscramble", 2],
  ["advantaged", "advantage", 2],
  ["crystallized", "crystallize", 2],
  ["dismantled", "dismantle", 2],
  ["conjured", "conjure", 2],
  ["penetrated", "penetrate", 2],
  ["occured", "occure", 2],
  ["repaid", "repay", 2],
  ["contradicted", "contradict", 2],
  ["petitioned", "petition", 2],
  ["undercapitalized", "undercapitalize", 2],
  ["descended", "descend", 2],
  ["fractionated", "fractionate", 2],
  ["bedecked", "bedeck", 2],
  ["analogized", "analogize", 2],
  ["encroached", "encroach", 2],
  ["shoved", "shove", 2],
  ["exhorted", "exhort", 2],
  ["reestablished", "reestablish", 2],
  ["conquered", "conquer", 2],
  ["hearted", "heart", 2],
  ["paired", "pair", 2],
  ["permeated", "permeate", 2],
  ["captivated", "captivate", 2],
  ["coined", "coin", 2],
  ["underbid", "underbid", 2],
  ["reprinted", "reprint", 2],
  ["tallied", "tally", 2],
  ["disabled", "disable", 2],
  ["clicked", "click", 2],
  ["indemnified", "indemnify", 2],
  ["stylized", "stylize", 2],
  ["stretched", "stretch", 2],
  ["ascended", "ascend", 2],
  ["exasperated", "exasperate", 2],
]

// let model = learn(pairs)
// console.dir(model, { depth: 5 })
// console.log(convert('tallied', model))
// const rev = reverse(model)
// console.log(convert('tally', rev))
test(pairs)
// console.log(classify('gleaning', model))