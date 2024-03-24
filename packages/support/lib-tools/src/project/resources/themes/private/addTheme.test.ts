import { ThemeEntity, ThemeResource } from '@noodles-ui/core-types';
import { NUI, ProjectContext, ThemeContext } from '@noodles-ui/support-types';
import expect from 'expect';

import { contextFactory } from '../../../test-utils/contextFactory';
import { projectFactory } from '../../../test-utils/projectFactory';
import { resourceFactory } from '../../../test-utils/resourceFactory';
import { themeFactory } from '../../../test-utils/themeFactory';
import { themeTokensFactory } from '../../../test-utils/themeTokensFactory';

import { addTheme } from './addTheme';

describe('addTheme', () => {
    let project: ProjectContext | undefined;
    let context: ThemeContext;
    let resource: ThemeResource;
    let entity: ThemeEntity;
    describe('given valid context', () => {
        beforeEach(() => {
            project = projectFactory();
            resource = resourceFactory('theme', { name: 'bar' });
            context = contextFactory(resource);
            entity = themeFactory(themeTokensFactory(), resource);
            addTheme(project, context, entity);
        });
        it('should add context to project themes items', () => {
            expect(project?.entities.theme.size).toEqual(1);
        });
    });
    describe('given context with an empty name', () => {
        beforeEach(() => {
            project = projectFactory();
            resource = resourceFactory(NUI.theme);
            context = contextFactory(resource);
            entity = themeFactory(themeTokensFactory(), resource);
            addTheme(project, context, entity);
        });

        it('should not add themes items', () => {
            expect(project?.entities.theme.size).toEqual(0);
        });

        it('should add a project diagnostics', () => {
            expect(project?.diagnostics.length).toEqual(1);
            expect(project?.diagnostics[0].message).toContain('Entity name is empty.');
        });
    });
    describe('given entity with a duplicate key', () => {
        beforeEach(() => {
            project = projectFactory();
            resource = resourceFactory('theme', { name: 'foo' });
            context = contextFactory(resource);
            entity = themeFactory(themeTokensFactory(), resource);
            addTheme(project, context, entity);
            addTheme(project, context, entity);
        });

        it('should not add themes items', () => {
            expect(project?.entities.theme.size).toEqual(1);
        });

        it('should add a project diagnostics', () => {
            expect(project?.diagnostics.length).toEqual(1);
            expect(project?.diagnostics[0].message).toContain('Duplicate entity key "/foo".');
        });
    });
});
