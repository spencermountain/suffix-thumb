type pair = [string, string]
type rules = Record<string, string>

interface Model {
  /** suffix rules that only work left→right */
  fwd: rules
  /** suffix rules that work in both directions */
  both: rules
  /** suffix rules that only work right→left */
  rev: rules
  /** whole-word exceptions */
  ex: rules
  reversed?: boolean
}

interface Options {
  /** a rule must serve at least this many pairs (default 0) */
  min?: number
  /** also learn the backward transformation (default true) */
  reverse?: boolean
  /** warn about skipped pairs (default false) */
  verbose?: boolean
}

export function learn(input: pair[], opts?: Options): Model
export function convert(word: string, model: Model): string
export function reverse(model: Model): Model
/** pack a model into one string */
export function compress(model: Model): string
export function uncompress(str: string): Model
/** drop repeated and unencodable pairs. {reverse:false} keeps right-side repeats */
export function validate(input: pair[], opts?: { reverse?: boolean }): pair[]
export function test(input: pair[], model: Model): void
