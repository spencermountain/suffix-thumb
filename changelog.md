### 6.0.0 [Sep 2026]
Models are ~50% smaller and learning is ~10x faster.
v6 `uncompress` refuses models packed by v5

- **[breaking]** - `learn` rules are chosen by an exact byte-cost search over a suffix-trie, instead of a percent-threshold
- **[breaking]** - the `threshold` option is gone
- **[breaking]** - `compress` now returns one string
- **[change]** - `validate` drops pairs with reserved characters (`~ | : , { }` and digits)
- **[change]** - on a tie, a whole-word rule is preferred over an exception
- **[new]** - `verbose` option warns about skipped pairs
- **[change]** - a rule may now match a whole word, in `convert`
- **[fix]** - repeated right-side words (`poner`/`ponerse` → `puesto`) are no longer dropped
- **[fix]** - reverse conversions could be wrong when a shared rule out-ranked a reverse rule
- **[fix]** - the `min` option no longer disables exceptions
- **[fix]** - stale type definitions
- **[fix]** - better-support special string inputs
- **[fix]** - unsafe regex fixes
- **[update]** - dependencies


### 5.0.3 [Feb 2023]
- **[fix]** - broken package.json path
- **[update]** - dependencies

### 5.0.2 [Feb 2023]
- **[hotfix]** - custom compress/uncompress 

### 5.0.1 [Feb 2023]
- **[fix]** - model format change

### 5.0.0 [Feb 2023]
- **[breaking]** - model format change
- **[change]** - smaller, faster builds
- **[new]** - support `{min, threshold, reverse}` options

### 4.0.0 [Jan 2022]
- **[breaking]** - model format change
- **[new]** - add classifier, test

### 3.1.0 [Jan 2022]
- **[new]** - add debug method

### 3.0.0 [Dec 2021]
- **[breaking]** - rename 'find' to 'learn'
- **[breaking]** - model format change
- **[breaking]** - don't babel anymore
- **[change]** - don't compress by default
- **[new]** - add uncompress method
- **[new]** - add validate method
- **[new]** - add reverse method

### 2.0.0 [Aug 2021]

- **[change]** - add compression to model
