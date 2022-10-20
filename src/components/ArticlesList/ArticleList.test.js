import renderAuthors from './renderAuthors';

test('Renders authors', () => {
    expect(renderAuthors(["Jacob Joyce", "Artie Dolittle"])).toBe("Jacob Joyce, Artie Dolittle");
});