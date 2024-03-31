import { MixinContext, NUI } from '@noodles-ui/core-entities';
import { MixinResource } from '@noodles-ui/core-resources';
import expect from 'expect';

import { compilerFactory } from '../../../test-utils/compilerFactory';
import { contextFactory } from '../../../test-utils/contextFactory';
import { resourceFactory } from '../../../test-utils/resourceFactory';
import { CompilerContext } from '../../../types';

import { addMixin } from './addMixin';

describe('addMixin', () => {
    let compiler: CompilerContext | undefined;
    let context: MixinContext;
    let resource: MixinResource;

    describe('given a valid context', () => {
        beforeEach(() => {
            compiler = compilerFactory();
            resource = resourceFactory(NUI.mixin, { name: 'foo' });
            context = contextFactory(resource);
            addMixin(compiler, context, resource);
        });

        it('should store the entity', () => {
            expect(compiler?.entities.mixin.size).toEqual(1);
        });
    });

    describe('given an entity with an empty name', () => {
        beforeEach(() => {
            compiler = compilerFactory();
            context = contextFactory();
            resource = resourceFactory('mixin');
            addMixin(compiler, context, resource);
        });

        it('should not store the entity', () => {
            expect(compiler?.entities.mixin.size).toEqual(0);
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
            context = contextFactory();
            resource = resourceFactory('mixin', { name: 'foo' });
            addMixin(compiler, context, resource);
            addMixin(compiler, context, resource);
        });

        it('should not store duplicates', () => {
            expect(compiler?.entities.mixin.size).toEqual(1);
        });

        // TODO ????
        // it('should add a project diagnostics', () => {
        //     expect(project?.diagnostics.length).toEqual(1);
        //     expect(project?.diagnostics[0].message).toContain('Duplicate entity key "/foo".');
        // });
    });
});
