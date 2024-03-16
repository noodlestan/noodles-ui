import { SurfaceResource } from '@noodles-ui/core-types';
import { ProjectContext, SurfaceContext } from '@noodles-ui/support-types';
import expect from 'expect';

import { contextFactory } from '../test-utils/contextFactory';
import { projectFactory } from '../test-utils/projectFactory';
import { resourceFactory } from '../test-utils/resourceFactory';

import { addSurface } from './addSurface';

describe('addSurface', () => {
    let project: ProjectContext | undefined;
    let context: SurfaceContext;
    let resource: SurfaceResource;
    describe('given valid context', () => {
        beforeEach(() => {
            project = projectFactory();
            resource = resourceFactory('surface', { name: 'bar' });
            context = contextFactory(resource);
            addSurface(project, context, resource);
        });
        it('Add context to projet surfaces items', () => {
            expect(project?.entities.surface.size).toEqual(1);
        });
    });
    // describe('given context without entity', () => {
    //     beforeEach(() => {
    //         project = projectFactory();
    //         resource = resourceFactory();
    //         context = contextFactory();
    //         addSurface(project, context);
    //     });
    //     it('it should not add surfaces items', () => {
    //         expect(project?.entities.surface.size).toEqual(0);
    //     });
    //     it('it should add a project diagnostics', () => {
    //         expect(project?.diagnostics.length).toEqual(1);
    //         expect(project?.diagnostics[0].message).toContain('No entity generated');
    //     });
    // });
    describe('given context with an empty name', () => {
        beforeEach(() => {
            project = projectFactory();
            context = contextFactory();
            resource = resourceFactory('surface');
            addSurface(project, context, resource);
        });

        it('it should not add surfaces items', () => {
            expect(project?.entities.surface.size).toEqual(0);
        });

        it('it should add a project diagnostics', () => {
            expect(project?.diagnostics.length).toEqual(1);
            expect(project?.diagnostics[0].message).toContain('Entity name is empty.');
        });
    });
    describe('given context with a duplicate key', () => {
        beforeEach(() => {
            project = projectFactory();
            context = contextFactory();
            resource = resourceFactory('surface', { name: 'foo' });
            addSurface(project, context, resource);
            addSurface(project, context, resource);
        });

        it('it should not add surfaces items', () => {
            expect(project?.entities.surface.size).toEqual(1);
        });

        it('it should add a project diagnostics', () => {
            expect(project?.diagnostics.length).toEqual(1);
            expect(project?.diagnostics[0].message).toContain('Duplicate entity key "/foo"');
        });
    });
});
