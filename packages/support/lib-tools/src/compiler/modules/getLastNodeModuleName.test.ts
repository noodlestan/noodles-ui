import expect from 'expect';

import { getLastNodeModule } from './getLastNodeModule';

describe('getLastNodeModuleName()', () => {
    describe('given a filename without "node_modules"', () => {
        const file = '/path/file.ext';
        const result = getLastNodeModule(file);

        it('should return undefined', () => {
            expect(result === undefined);
        });
    });

    describe('given a filename with a simple module name', () => {
        it('should return a ProgramModule with expected name and path', () => {
            const file = '/path/node_modules/mod/src/file.ext';
            const result = getLastNodeModule(file);

            expect(typeof result === 'object');
            expect(result!.name === 'mod');
            expect(result!.path === '/path/node_modules/mod');
        });
    });

    describe('given a filename with @ns', () => {
        const file = '/path/node_modules/@ns/mod/src/file.ext';
        const result = getLastNodeModule(file);

        it('should return the module name including the @ns/ prefix', () => {
            expect(typeof result === 'object');
            expect(result!.name === '@ns/mod');
            expect(result!.path === '/path/node_modules/@ns/mod');
        });
    });

    describe('given a filename with 2 nested node_modules', () => {
        const file = '/path/node_modules/mod-one/node_modules/mod-two/src/file.ext';
        const result = getLastNodeModule(file);

        it('should return the name of the last module ', () => {
            expect(typeof result === 'object');
            expect(result!.name === 'mod-two');
            expect(result!.path === '/path/node_modules/mod-one/node_modules/mod-two');
        });
    });

    describe('given a filename with 2 nested node_modules, with the first having namespace', () => {
        const file = '/path/node_modules/@ns-one/mod-one/node_modules/mod-two/src/file.ext';
        const result = getLastNodeModule(file);

        it('should return the name of the last module', () => {
            expect(typeof result === 'object');
            expect(result!.name === 'mod-two');
            expect(result!.path === '/path/node_modules/@ns-one/mod-one/node_modules/mod-two');
        });
    });

    describe('given a filename with 2 nested node_modules, with the second having a namespace', () => {
        const file = '/path/node_modules/mod-one/node_modules/@ns-two/mod-two/src/file.ext';
        const result = getLastNodeModule(file);

        it('should return the name of the last module', () => {
            expect(typeof result === 'object');
            expect(result!.name === '@ns-two/mod-two');
            expect(result!.path === '/path/node_modules/mod-one/node_modules/@ns-two/mod-two');
        });
    });
});
