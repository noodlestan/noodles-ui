import { TokenEntity, TokenResource } from '@noodles-ui/core-types';
import { NUI, ProjectContext, TokenContext } from '@noodles-ui/support-types';
import expect from 'expect';

import { contextFactory } from '../../../test-utils/contextFactory';
import { projectFactory } from '../../../test-utils/projectFactory';
import { resourceFactory } from '../../../test-utils/resourceFactory';
import { tokenFactory } from '../../../test-utils/tokenFactory';

import { addToken } from './addToken';

describe('addToken', () => {
    let project: ProjectContext | undefined;
    let context: TokenContext;
    let resource: TokenResource;
    let entity: TokenEntity;

    describe('given valid context', () => {
        beforeEach(() => {
            project = projectFactory();
            resource = resourceFactory(NUI.token, { name: 'bar' });
            context = contextFactory(resource);
            entity = tokenFactory(resource);

            addToken(project, context, entity);
        });
        it('should context to project tokens items', () => {
            expect(project?.entities.token.size).toEqual(1);
        });
    });
    describe('given context with a duplicate key', () => {
        beforeEach(() => {
            project = projectFactory();
            resource = resourceFactory('token', { name: 'foo' });
            context = contextFactory(resource);
            entity = tokenFactory(resource);

            addToken(project, context, entity);
            addToken(project, context, entity);
        });

        it('it should not add tokens items', () => {
            expect(project?.entities.token.size).toEqual(1);
        });

        // TODO ????
        // it('it should add a project diagnostics', () => {
        //     expect(project?.diagnostics.length).toEqual(1);
        //     expect(project?.diagnostics[0].message).toContain('Duplicate entity key "/foo".');
        // });
    });
});
