export type Token = string;

/**
 * A TokenIterator is an object that allows you to iterate over tokens in a string.
 * It provides methods to get the next token, check if there are more tokens
 * and peek at the next token without consuming it.
 */
export interface TokenIterator {
    /**
     * Returns the next token in the iterator.
     * @param expected - An optional expected token or regex to match against the next token.
     * @throws Error if there are no more tokens or if the next token does not match the expected value.
     */
    next(expected?: string | RegExp): Token;
    /**
     * Checks if there are more tokens in the iterator.
     * @returns true if there are more tokens, false otherwise.
     */
    hasNext(): boolean;
    /**
     * Peeks at the next token without consuming it.
     * @returns The next token or null if there are no more tokens.
     */
    peek(): Token | null;
}

function* regexIterator(tokenPattern: RegExp, str: string): Generator<Token> {
    const flags = tokenPattern.flags.includes('g') ? tokenPattern.flags : tokenPattern.flags + "g";
    const tokens = new RegExp(tokenPattern, flags);
    let match: RegExpExecArray | null;
    while ((match = tokens.exec(str)) !== null) {
        yield match[0];
    }
}

/**
 * Creates a TokenIterator from a token pattern and an input string.
 * @param tokenPattern - A regular expression to match tokens in the input string.
 * @param input - The input string to tokenize.
 * @returns A TokenIterator that can be used to iterate over the tokens in the input string.
 */
export function createTokenIterator(tokenPattern: RegExp, input: string): TokenIterator {
    const tokens = regexIterator(tokenPattern, input);
    let current: IteratorResult<Token> = tokens.next();
    return {
        next: (expected?: Token | RegExp) => {
            if (current.done)
                throw new Error('No more tokens');
            const token = current.value;
            if (typeof expected === 'string' && token !== expected)
                throw new Error(`Expected token "${expected}", got "${token}"`);
            if (expected instanceof RegExp && !expected.test(token))
                throw new Error(`Expected token matching ${expected}, got "${token}"`);
            current = tokens.next();
            return token;
        },
        hasNext: () => !current.done,
        peek: () => current.value ?? null,
    };
}