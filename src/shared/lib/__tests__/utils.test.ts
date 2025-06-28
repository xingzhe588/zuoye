// Utility functions tests
describe('Utility Functions', () => {
  describe('String utilities', () => {
    it('should handle empty strings', () => {
      const isEmpty = (str: string) => str.length === 0;
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('test')).toBe(false);
    });

    it('should capitalize strings', () => {
      const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('WORLD');
      expect(capitalize('')).toBe('');
    });

    it('should trim whitespace', () => {
      const trimString = (str: string) => str.trim();
      expect(trimString('  hello  ')).toBe('hello');
      expect(trimString('world')).toBe('world');
    });
  });

  describe('Array utilities', () => {
    it('should check if array is empty', () => {
      const isEmpty = (arr: any[]) => arr.length === 0;
      expect(isEmpty([])).toBe(true);
      expect(isEmpty([1, 2, 3])).toBe(false);
    });

    it('should get unique values', () => {
      const unique = (arr: any[]) => [...new Set(arr)];
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
      expect(unique(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('should filter falsy values', () => {
      const compact = (arr: any[]) => arr.filter(Boolean);
      expect(compact([1, 0, 2, false, 3, '', 4, null, 5, undefined])).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('Object utilities', () => {
    it('should check if object is empty', () => {
      const isEmpty = (obj: object) => Object.keys(obj).length === 0;
      expect(isEmpty({})).toBe(true);
      expect(isEmpty({ a: 1 })).toBe(false);
    });

    it('should get object keys', () => {
      const getKeys = (obj: object) => Object.keys(obj);
      expect(getKeys({ a: 1, b: 2 })).toEqual(['a', 'b']);
      expect(getKeys({})).toEqual([]);
    });

    it('should merge objects', () => {
      const merge = (obj1: object, obj2: object) => ({ ...obj1, ...obj2 });
      expect(merge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
      expect(merge({ a: 1, b: 2 }, { b: 3, c: 4 })).toEqual({ a: 1, b: 3, c: 4 });
    });
  });

  describe('Number utilities', () => {
    it('should check if number is even', () => {
      const isEven = (num: number) => num % 2 === 0;
      expect(isEven(2)).toBe(true);
      expect(isEven(3)).toBe(false);
      expect(isEven(0)).toBe(true);
    });

    it('should clamp numbers', () => {
      const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
      expect(clamp(5, 1, 10)).toBe(5);
      expect(clamp(-5, 1, 10)).toBe(1);
      expect(clamp(15, 1, 10)).toBe(10);
    });

    it('should format numbers', () => {
      const formatNumber = (num: number) => num.toLocaleString();
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1234567)).toBe('1,234,567');
    });
  });

  describe('Date utilities', () => {
    it('should format dates', () => {
      const formatDate = (date: Date) => date.toISOString().split('T')[0];
      const testDate = new Date('2023-12-25');
      expect(formatDate(testDate)).toBe('2023-12-25');
    });

    it('should check if date is today', () => {
      const isToday = (date: Date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
      };
      const today = new Date();
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      expect(isToday(today)).toBe(true);
      expect(isToday(yesterday)).toBe(false);
    });
  });

  describe('Validation utilities', () => {
    it('should validate email format', () => {
      const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
    });

    it('should validate URL format', () => {
      const isValidUrl = (url: string) => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      };
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('invalid-url')).toBe(false);
    });

    it('should validate password strength', () => {
      const isStrongPassword = (password: string) => {
        return password.length >= 8 && 
               /[A-Z]/.test(password) && 
               /[a-z]/.test(password) && 
               /[0-9]/.test(password);
      };
      expect(isStrongPassword('Password123')).toBe(true);
      expect(isStrongPassword('weak')).toBe(false);
      expect(isStrongPassword('NoNumbers')).toBe(false);
    });
  });
});
