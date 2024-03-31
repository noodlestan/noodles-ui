import { SurfaceResource } from '@noodles-ui/core-types';
import { CompilerContext, NUI, SurfaceContext } from '@noodles-ui/support-types';
import expect from 'expect';

import { compilerFactory } from '../../../test-utils/compilerFactory';
import { contextFactory } from '../../../test-utils/contextFactory';
import { resourceFactory } from '../../../test-utils/resourceFactory';

import { addSurface } from './addSurface';

describe('addSurface', () => {
    let compiler: CompilerContext | undefined;
    let context: SurfaceContext;
    let resource: SurfaceResource;

    describe('given a valid context', () => {
        beforeEach(() => {
            compiler = compilerFactory();
            resource = resourceFactory(NUI.surface, { name: 'foo' });
            context = contextFactory(resource);
            addSurface(compiler, context, resource);
        });

        it('should store the entity', () => {
            expect(compiler?.entities.surface.size).toEqual(1);
        });
    });

    describe('given an entity with an empty name', () => {
        beforeEach(() => {
            compiler = compilerFactory();
            context = contextFactory();
            resource = resourceFactory('surface');
            addSurface(compiler, context, resource);
        });

        it('should not store the entity', () => {
            expect(compiler?.entities.surface.size).toEqual(0);
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
            resource = resourceFactory('surface', { name: 'foo' });
            addSurface(compiler, context, resource);
            addSurface(compiler, context, resource);
        });

        it('should not store duplicates', () => {
            expect(compiler?.entities.surface.size).toEqual(1);
        });

        it('should add a project error', () => {
            expect(compiler?.diagnostics.length).toEqual(1);
            expect(compiler?.diagnostics[0].severity).toBe('error');
            expect(compiler?.diagnostics[0].message).toContain('Duplicate entity key "/foo".');
        });
    });
});
