import { extractSearchParam, parseIntWithDefault } from "./utilities";

describe('extractSearchParam', () => {
    test('returns default if query key is not found', () => {
        const url = new URL('http://example.com?foo=1&bar2');
        const result = extractSearchParam(new URLSearchParams(url.search), 'baz', 'defaultValue');
        expect(result).toBe('defaultValue');
    });

    test('returns actual value of query key', () => {
        const url = new URL('http://example.com?foo=1');
        const result = extractSearchParam(new URLSearchParams(url.search), 'foo', 'defaultValue');
        expect(result).toBe('1');
    });

    test('returns default if query key is found, but its value is empty', () => {
        const url = new URL('http://example.com?foo=');
        const result = extractSearchParam(new URLSearchParams(url.search), 'foo', 'defaultValue');
        expect(result).toBe('defaultValue');
    });
});

describe('parseIntWithDefault', () => {
    test('parses successfully',
        () => expect(parseIntWithDefault('20', 0)).toBe(20)
    );

    test('the parse failed, it returns the default value',
        () => expect(parseIntWithDefault('foo', 0)).toBe(0)
    );
});