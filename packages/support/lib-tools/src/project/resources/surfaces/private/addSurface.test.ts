import { SurfaceResource } from '@noodles-ui/core-types';
import { NUI, ProjectContext, SurfaceContext } from '@noodles-ui/support-types';
import expect from 'expect';

import { contextFactory } from '../../../test-utils/contextFactory';
import { projectFactory } from '../../../test-utils/projectFactory';
import { resourceFactory } from '../../../test-utils/resourceFactory';

import { addSurface } from './addSurface';

describe('addSurface', () => {
    let project: ProjectContext | undefined;
    let context: SurfaceContext;
    let resource: SurfaceResource;

    describe('given a valid context', () => {
        beforeEach(() => {
            project = projectFactory();
            resource = resourceFactory(NUI.surface, { name: 'foo' });
            context = contextFactory(resource);
            addSurface(project, context, resource);
        });

        it('should store the entity', () => {
            expect(project?.entities.surface.size).toEqual(1);
        });
    });

    describe('given an entity with an empty name', () => {
        beforeEach(() => {
            project = projectFactory();
            context = contextFactory();
            resource = resourceFactory('surface');
            addSurface(project, context, resource);
        });

        it('should not store the entity', () => {
            expect(project?.entities.surface.size).toEqual(0);
        });

        it('should add a project error', () => {
            expect(project?.diagnostics.length).toEqual(1);
            expect(project?.diagnostics[0].severity).toBe('error');
            expect(project?.diagnostics[0].message).toContain('Entity name is empty.');
        });
    });

    describe('given an entity with a duplicate name', () => {
        beforeEach(() => {
            project = projectFactory();
            context = contextFactory();
            resource = resourceFactory('surface', { name: 'foo' });
            addSurface(project, context, resource);
            addSurface(project, context, resource);
        });

        it('should not store duplicates', () => {
            expect(project?.entities.surface.size).toEqual(1);
        });

        it('should add a project error', () => {
            expect(project?.diagnostics.length).toEqual(1);
            expect(project?.diagnostics[0].severity).toBe('error');
            expect(project?.diagnostics[0].message).toContain('Duplicate entity key "/foo".');
        });
    });
});
