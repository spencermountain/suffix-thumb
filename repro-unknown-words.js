// repro: v6 learn() keeps a catch-all ''-suffix rule that v5 pruned,
// so convert() rewrites every out-of-vocabulary word.
//
//   node ./repro-unknown-words.js        (against ./src, currently 6.1.0)
//
// v5.0.3:  learn(pairs) has no '' rule → convert('perro', rev) === 'perro'
// v6.0.0+: learn(pairs) keeps {'': 'r'} → convert('perro', rev) === 'perror'
//
// two regular pairs teach "append r"; the one contradicting pair ('haz')
// made v5 drop the catch-all, but v6 keeps it. found via es-compromise,
// where reversed imperative models turned any unknown word w into w+'r' -
// 'sienten' → 'sientener', 'impactan' → 'impactaner'.
import { learn, convert, reverse } from './src/index.js'

const pairs = [
  ['hablar', 'habla'],
  ['comer', 'come'],
  ['hacer', 'haz']
]
const model = learn(pairs)
const rev = reverse(model)

console.log('reversed model:', JSON.stringify(rev))

// known words round-trip fine in both versions
console.log(`habla → ${convert('habla', rev)}   (want 'hablar')`)
console.log(`haz   → ${convert('haz', rev)}     (want 'hacer')`)

// an unknown word should come back unchanged, like v5 - not get the '' rule
const out = convert('perro', rev)
console.log(`perro → ${out}    (v5 returned 'perro', v6 returns 'perror')`)

if (out !== 'perro') {
  console.log('\n✗ unknown word was rewritten by the catch-all rule')
  process.exit(1)
}
console.log('\n✓ unknown word returned unchanged')
