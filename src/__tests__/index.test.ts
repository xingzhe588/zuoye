import { describe, test, expect } from '@jest/globals';

export function sum(a, b) {
    return a + b;
}

describe('Тесты на функцию sum', () => {
    test('1 + 2 = 3', () => {
        const result = sum(1, 2);

        expect(result).toBe(3);
    });
});