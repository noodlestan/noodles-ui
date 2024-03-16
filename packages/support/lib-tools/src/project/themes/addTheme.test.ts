import { ThemeResource } from '@noodles-ui/core-types';
import { ProjectContext, ThemeContext } from '@noodles-ui/support-types';
import expect from 'expect';

import { contextFactory } from '../test-utils/contextFactory';
import { projectFactory } from '../test-utils/projectFactory';
import { resourceFactory } from '../test-utils/resourceFactory';

import { addTheme } from './addTheme';

describe('addTheme', () => {
    let project: ProjectContext | undefined;
    let context: ThemeContext;
    let resource: ThemeResource;
    describe('given valid context', () => {
        beforeEach(() => {
            project = projectFactory();
            resource = resourceFactory('theme', { name: 'bar' });
            context = contextFactory(resource);
            addTheme(project, context, resource);
        });
        it('Add context to projet themes items', () => {
            expect(project?.entities.theme.size).toEqual(1);
        });
    });
    // describe('given context without entity', () => {
    //     beforeEach(() => {
    //         project = projectFactory();
    //         resource = resourceFactory();
    //         context = contextFactory();
    //         addTheme(project, context);
    //     });
    //     it('it should not add themes items', () => {
    //         expect(project?.entities.theme.size).toEqual(0);
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
            resource = resourceFactory('theme');
            addTheme(project, context, resource);
        });

        it('it should not add themes items', () => {
            expect(project?.entities.theme.size).toEqual(0);
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
            resource = resourceFactory('theme', { name: 'foo' });
            addTheme(project, context, resource);
            addTheme(project, context, resource);
        });

        it('it should not add themes items', () => {
            expect(project?.entities.theme.size).toEqual(1);
        });

        it('it should add a project diagnostics', () => {
            expect(project?.diagnostics.length).toEqual(1);
            expect(project?.diagnostics[0].message).toContain('Duplicate entity key "/foo".');
        });
    });
});
