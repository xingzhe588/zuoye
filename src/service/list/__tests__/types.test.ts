import { ListItem, GetListResponse } from '../types';

describe('List Types', () => {
  describe('ListItem', () => {
    it('should have correct structure', () => {
      const listItem: ListItem = {
        id: 1,
        title: 'Test Title',
        description: 'Test Description',
      };

      expect(listItem).toHaveProperty('id');
      expect(listItem).toHaveProperty('title');
      expect(listItem).toHaveProperty('description');
      
      expect(typeof listItem.id).toBe('number');
      expect(typeof listItem.title).toBe('string');
      expect(typeof listItem.description).toBe('string');
    });

    it('should accept valid data', () => {
      const validItem: ListItem = {
        id: 42,
        title: 'Valid Title',
        description: 'Valid Description',
      };

      expect(validItem.id).toBe(42);
      expect(validItem.title).toBe('Valid Title');
      expect(validItem.description).toBe('Valid Description');
    });

    it('should work with empty strings', () => {
      const itemWithEmptyStrings: ListItem = {
        id: 0,
        title: '',
        description: '',
      };

      expect(itemWithEmptyStrings.id).toBe(0);
      expect(itemWithEmptyStrings.title).toBe('');
      expect(itemWithEmptyStrings.description).toBe('');
    });

    it('should work with long strings', () => {
      const longTitle = 'A'.repeat(1000);
      const longDescription = 'B'.repeat(2000);
      
      const itemWithLongStrings: ListItem = {
        id: 999,
        title: longTitle,
        description: longDescription,
      };

      expect(itemWithLongStrings.title).toHaveLength(1000);
      expect(itemWithLongStrings.description).toHaveLength(2000);
    });

    it('should work with special characters', () => {
      const itemWithSpecialChars: ListItem = {
        id: 123,
        title: 'Title with émojis 🎨 and spëcial chars!',
        description: 'Description with ñ, ü, and other spëcial characters: @#$%^&*()',
      };

      expect(itemWithSpecialChars.title).toContain('🎨');
      expect(itemWithSpecialChars.description).toContain('ñ');
    });
  });

  describe('GetListResponse', () => {
    it('should be an array of ListItem', () => {
      const response: GetListResponse = [
        {
          id: 1,
          title: 'Item 1',
          description: 'Description 1',
        },
        {
          id: 2,
          title: 'Item 2',
          description: 'Description 2',
        },
      ];

      expect(Array.isArray(response)).toBe(true);
      expect(response).toHaveLength(2);
      
      response.forEach((item, index) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('description');
        expect(item.id).toBe(index + 1);
      });
    });

    it('should work with empty array', () => {
      const emptyResponse: GetListResponse = [];
      
      expect(Array.isArray(emptyResponse)).toBe(true);
      expect(emptyResponse).toHaveLength(0);
    });

    it('should work with single item', () => {
      const singleItemResponse: GetListResponse = [
        {
          id: 42,
          title: 'Single Item',
          description: 'Only one item in the list',
        },
      ];

      expect(singleItemResponse).toHaveLength(1);
      expect(singleItemResponse[0].id).toBe(42);
    });

    it('should work with many items', () => {
      const manyItemsResponse: GetListResponse = Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        title: `Item ${index + 1}`,
        description: `Description for item ${index + 1}`,
      }));

      expect(manyItemsResponse).toHaveLength(100);
      expect(manyItemsResponse[0].id).toBe(1);
      expect(manyItemsResponse[99].id).toBe(100);
    });

    it('should maintain type safety', () => {
      const response: GetListResponse = [
        {
          id: 1,
          title: 'Test',
          description: 'Test Description',
        },
      ];

      // These should be type-safe operations
      const firstItem = response[0];
      const itemId: number = firstItem.id;
      const itemTitle: string = firstItem.title;
      const itemDescription: string = firstItem.description;

      expect(typeof itemId).toBe('number');
      expect(typeof itemTitle).toBe('string');
      expect(typeof itemDescription).toBe('string');
    });
  });
});
