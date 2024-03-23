import { MixinResource } from '@noodles-ui/core-types';
import { NUI, ProjectContext, MixinContext } from '@noodles-ui/support-types';
import expect from 'expect';

import { contextFactory } from '../../../test-utils/contextFactory';
import { projectFactory } from '../../../test-utils/projectFactory';
import { resourceFactory } from '../../../test-utils/resourceFactory';

import { addMixin } from './addMixin';
import { todo } from 'node:test';

describe('addMixin', () => {
    let project: ProjectContext | undefined;
    let context: MixinContext;
    let resource: MixinResource;
    // let Result
    describe('given valid context', () => {
        beforeEach(() => {
            project = projectFactory();
            resource = resourceFactory(NUI.mixin, { name: 'bar' });
            context = contextFactory(resource);
            addMixin(project, context, resource);
            // result = addMixin
        });
        it('Add context to project mixins items', () => {
            expect(project?.entities.mixin.size).toEqual(1);
        });
        // it('Should return mixin')
    });
    // describe('given context without entity', () => {
    //     beforeEach(() => {
    //         project = projectFactory();
    //         resource = resourceFactory();
    //         context = contextFactory();
    //         addMixin(project, context);
    //     });
    //     it('it should not add mixins items', () => {
    //         expect(project?.entities.mixin.size).toEqual(0);
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
            resource = resourceFactory('mixin');
            addMixin(project, context, resource);
        });

        it('it should not add mixins items', () => {
            expect(project?.entities.mixin.size).toEqual(0);
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
            resource = resourceFactory('mixin', { name: 'foo' });
            addMixin(project, context, resource);
            addMixin(project, context, resource);
        });

        it('it should not add mixins items', () => {
            expect(project?.entities.mixin.size).toEqual(1);
        });

        // TODO ????
        // it('it should add a project diagnostics', () => {
        //     expect(project?.diagnostics.length).toEqual(1);
        //     expect(project?.diagnostics[0].message).toContain('Duplicate entity key "/foo".');
        // });
    });
});
