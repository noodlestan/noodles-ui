import { TokenResource } from '@noodles-ui/core-types';
import { NUI, ProjectContext, TokenContext } from '@noodles-ui/support-types';
import expect from 'expect';

import { contextFactory } from '../../../test-utils/contextFactory';
import { projectFactory } from '../../../test-utils/projectFactory';
import { resourceFactory } from '../../../test-utils/resourceFactory';

import { addToken } from './addToken';
import { todo } from 'node:test';

describe('addToken', () => {
    let project: ProjectContext | undefined;
    let context: TokenContext;
    let resource: TokenResource;
    // let Result
    describe('given valid context', () => {
        beforeEach(() => {
            project = projectFactory();
            resource = resourceFactory(NUI.token, { name: 'bar' });
            context = contextFactory(resource);
            addToken(project, context, resource);
            // result = addToken
        });
        it('Add context to project tokens items', () => {
            expect(project?.entities.token.size).toEqual(1);
        });
        // it('Should return token')
    });
    // describe('given context without entity', () => {
    //     beforeEach(() => {
    //         project = projectFactory();
    //         resource = resourceFactory();
    //         context = contextFactory();
    //         addToken(project, context);
    //     });
    //     it('it should not add tokens items', () => {
    //         expect(project?.entities.token.size).toEqual(0);
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
            resource = resourceFactory('token');
            addToken(project, context, resource);
        });

        it('it should not add tokens items', () => {
            expect(project?.entities.token.size).toEqual(0);
        });

        it('it should add a project diagnostics', () => {
            expect(project?.diagnostics.length).toEqual(1);
            expect(project?.diagnostics[0].message).toContain('No token name');
        });
    });
    describe('given context with a duplicate key', () => {
        beforeEach(() => {
            project = projectFactory();
            context = contextFactory();
            resource = resourceFactory('token', { name: 'foo' });
            addToken(project, context, resource);
            addToken(project, context, resource);
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
