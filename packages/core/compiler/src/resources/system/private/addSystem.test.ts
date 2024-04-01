import { NUI, SystemContext, SystemEntity } from '@noodles-ui/core-entities';
import { SystemResource } from '@noodles-ui/core-resources';
import expect from 'expect';

import { compilerFactory } from '../../../test-utils/compilerFactory';
import { contextFactory } from '../../../test-utils/contextFactory';
import { resourceFactory } from '../../../test-utils/resourceFactory';
import { CompilerContext } from '../../../types';

import { addSystem } from './addSystem';

describe('addSystem()', () => {
    let compiler: CompilerContext;
    let context: SystemContext;
    let resource: SystemResource;
    let entity: SystemEntity;
    let result: SystemEntity | undefined;

    describe('given a valid context', () => {
        beforeEach(() => {
            compiler = compilerFactory();
            resource = resourceFactory(NUI.system, { name: 'foo' });
            context = contextFactory(resource);
            entity = resourceFactory(NUI.system, resource);

            result = addSystem(compiler, context, entity);
        });

        it('should store the entity', () => {
            expect(compiler?.entities.system.size).toEqual(1);
            expect(compiler?.entities.system.get('/foo')?.entity.name).toEqual('foo');
        });

        it('should return the entity', () => {
            expect(typeof result).toBe('object');
            expect(result?.name).toEqual('foo');
        });
    });

    describe('given an entity with an empty name', () => {
        beforeEach(() => {
            compiler = compilerFactory();
            resource = resourceFactory(NUI.system);
            context = contextFactory(resource);
            entity = resourceFactory(NUI.system, resource);
            result = addSystem(compiler, context, entity);
        });

        it('should not store the entity', () => {
            expect(compiler?.entities.system.size).toEqual(0);
        });

        it('should add a project error', () => {
            expect(compiler?.diagnostics.length).toEqual(1);
            expect(compiler?.diagnostics[0].severity).toBe('error');
            expect(compiler?.diagnostics[0].message).toContain('Entity name is empty.');
        });
    });

    describe('given two entities', () => {
        beforeEach(() => {
            compiler = compilerFactory();
            resource = resourceFactory('system', { name: 'foo' });
            context = contextFactory(resource);
            entity = resourceFactory(NUI.system, resource);
            addSystem(compiler, context, entity);

            resource = resourceFactory('system', { name: 'bar' });
            context = contextFactory(resource);
            entity = resourceFactory(NUI.system, resource);
            result = addSystem(compiler, context, entity);
        });

        it('should not store the second system', () => {
            expect(compiler?.entities.system.size).toEqual(1);
        });

        it('should add a project error', () => {
            expect(compiler?.diagnostics.length).toEqual(1);
            expect(compiler?.diagnostics[0].severity).toBe('error');
            expect(compiler?.diagnostics[0].message).toContain(
                'There can be only one system entity in the project.',
            );
        });
    });
});
