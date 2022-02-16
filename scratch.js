import { convert, learn, reverse, test, classify } from './src/index.js'

// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBD.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBZ.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/VBG.js'
// import pairs from '/Users/spencer/mountain/minimum-model/pairs/NNS.js'
// import pairs from '/Users/spencer/mountain/suffix-thumb/test/data/fr-nous.js'

let pairs = [
  ["functioning", "function", 139],
  ["questioning", "question", 113],
  ["positioning", "position", 96],
  ["commissioning", "commission", 91],
  ["burgeoning", "burgeon", 80],
  ["mentioning", "mention", 71],
  ["cloning", "clon", 62],
  ["championing", "champion", 47],
  ["repositioning", "reposition", 34],
  ["decommissioning", "decommission", 27],
  ["rationing", "ration", 25],
  ["postponing", "postpone", 24],
  ["captioning", "caption", 24],
  ["abandoning", "abandon", 22],
  ["sanctioning", "sanction", 17],
  ["boning", "bone", 16],
  ["honing", "hone", 15],
  ["phoning", "phone", 14],
  ["vacationing", "vacation", 10],
  ["apportioning", "apportion", 9],
  ["malfunctioning", "malfunction", 9],
  ["zoning", "zone", 8],
  ["reasoning", "reason", 8],
  ["reconditioning", "recondition", 8],
  ["telephoning", "telephone", 6],
  ["conditioning", "condition", 6],
  ["petitioning", "petition", 6],
  ["requisitioning", "requisition", 5],
  ["cautioning", "caution", 5],
  ["envisioning", "envision", 5],
  ["visioning", "vision", 5],
  ["ballooning", "balloon", 4],
  ["fashioning", "fashion", 4],
  ["auctioning", "auction", 4],
  ["cushioning", "cushion", 3],
  ["ironing", "iron", 3],
  ["swooning", "swoon", 2],
  ["summoning", "summon", 2],
  ["preconditioning", "precondition", 2],
  ["poisoning", "poison", 2],
  ["portioning", "portion", 2],
  ["chaperoning", "chaperon", 2],
  ["fractioning", "fraction", 2],
  ["stationing", "station", 2],
  ["auditioning", "audition", 2],
  ["seasoning", "season", 2],
  ["siphoning", "siphon", 2],

]

let model = learn(pairs)
// console.dir(model, { depth: 5 })
// console.log(JSON.stringify(model.rules, null, 2))
// console.log(convert('tallied', model))
// const rev = reverse(model)
// console.log(convert('tally', rev))
test(pairs)
// console.log(classify('gleaning', model))