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

interface Packed {
  fwd: string
  both: string
  rev: string
  ex: string
}

interface Options {
  /** a rule must serve at least this many pairs (default 0) */
  min?: number
  /** also learn the backward transformation (default true) */
  reverse?: boolean
}

export function learn(input: pair[], opts?: Options): Model
export function convert(word: string, model: Model): string
export function reverse(model: Model): Model
export function compress(model: Model): Packed
export function uncompress(model: string | Packed): Model
export function validate(input: pair[]): pair[]
export function test(input: pair[], model: Model): void
