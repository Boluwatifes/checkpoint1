import localStorageMock from '../../src/app/__mock__/localStorage';

describe('Local Storage', () => {
  it('add and get items from localStorage', () => {
    localStorageMock.setItem(0, 'hello');
    localStorageMock.setItem(1, 'world');
    expect(localStorageMock.getItem(0)).toBe('hello');
    expect(localStorageMock.getItem(1)).toBe('world');
  });

  it('should clear the local storage on clear', () => {
    localStorageMock.clear();
    expect(localStorageMock.getItem(0)).toBeUndefined();
  });
});
