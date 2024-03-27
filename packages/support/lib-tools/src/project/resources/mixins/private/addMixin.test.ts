import { MixinResource } from '@noodles-ui/core-types';
import { MixinContext, NUI, ProjectContext } from '@noodles-ui/support-types';
import expect from 'expect';

import { contextFactory } from '../../../test-utils/contextFactory';
import { projectFactory } from '../../../test-utils/projectFactory';
import { resourceFactory } from '../../../test-utils/resourceFactory';

import { addMixin } from './addMixin';

describe('addMixin', () => {
    let project: ProjectContext | undefined;
    let context: MixinContext;
    let resource: MixinResource;

    describe('given a valid context', () => {
        beforeEach(() => {
            project = projectFactory();
            resource = resourceFactory(NUI.mixin, { name: 'foo' });
            context = contextFactory(resource);
            addMixin(project, context, resource);
        });

        it('should store the entity', () => {
            expect(project?.entities.mixin.size).toEqual(1);
        });
    });

    describe('given an entity with an empty name', () => {
        beforeEach(() => {
            project = projectFactory();
            context = contextFactory();
            resource = resourceFactory('mixin');
            addMixin(project, context, resource);
        });

        it('should not store the entity', () => {
            expect(project?.entities.mixin.size).toEqual(0);
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
            resource = resourceFactory('mixin', { name: 'foo' });
            addMixin(project, context, resource);
            addMixin(project, context, resource);
        });

        it('should not store duplicates', () => {
            expect(project?.entities.mixin.size).toEqual(1);
        });

        // TODO ????
        // it('should add a project diagnostics', () => {
        //     expect(project?.diagnostics.length).toEqual(1);
        //     expect(project?.diagnostics[0].message).toContain('Duplicate entity key "/foo".');
        // });
    });
});
