import { NUI, TokenContext, TokenEntity } from '@noodles-ui/core-entities';
import { TokenResource } from '@noodles-ui/core-resources';
import expect from 'expect';

import { compilerFactory } from '../../../test-utils/compilerFactory';
import { contextFactory } from '../../../test-utils/contextFactory';
import { resourceFactory } from '../../../test-utils/resourceFactory';
import { tokenFactory } from '../../../test-utils/tokenFactory';
import { CompilerContext } from '../../../types';

import { addToken } from './addToken';

describe('addToken()', () => {
    let compiler: CompilerContext;
    let context: TokenContext;
    let resource: TokenResource;
    let entity: TokenEntity;
    let result: TokenEntity | undefined;

    describe('given a valid context', () => {
        beforeEach(() => {
            compiler = compilerFactory();
            resource = resourceFactory(NUI.token, { name: 'foo' });
            context = contextFactory(resource);
            entity = tokenFactory(resource);

            result = addToken(compiler, context, entity);
        });

        it('should store the entity', () => {
            expect(compiler?.entities.token.size).toEqual(1);
            expect(compiler?.entities.token.get('/foo')?.entity.name).toEqual('foo');
        });

        it('should return the entity', () => {
            expect(typeof result).toBe('object');
            expect(result?.name).toEqual('foo');
        });
    });

    describe('given an entity with an empty name', () => {
        beforeEach(() => {
            compiler = compilerFactory();
            resource = resourceFactory(NUI.token);
            context = contextFactory(resource);
            entity = tokenFactory(resource);
            result = addToken(compiler, context, entity);
        });

        it('should not store the entity', () => {
            expect(compiler?.entities.token.size).toEqual(0);
        });

        it('should add a project error', () => {
            expect(compiler?.diagnostics.length).toEqual(1);
            expect(compiler?.diagnostics[0].severity).toBe('error');
            expect(compiler?.diagnostics[0].message).toContain('Entity name is empty.');
        });
    });

    describe('given an entity with a duplicate name', () => {
        beforeEach(() => {
            compiler = compilerFactory();
            resource = resourceFactory('token', { name: 'foo' });
            context = contextFactory(resource);
            context.consumers.add('variant-one');
            entity = tokenFactory(resource);
            addToken(compiler, context, entity);

            context = contextFactory(resource);
            context.consumers.add('variant-two');
            result = addToken(compiler, context, entity);
        });

        it('should not store the duplicated entity', () => {
            expect(compiler?.entities.token.size).toEqual(1);
        });

        it('should merge the consumers of the entity', () => {
            expect(compiler?.entities.token.get('/foo')?.context.consumers.size).toEqual(2);
            expect(compiler?.entities.token.get('/foo')?.context.consumers).toContain(
                'variant-one',
            );
            expect(compiler?.entities.token.get('/foo')?.context.consumers).toContain(
                'variant-two',
            );
        });
    });
});
