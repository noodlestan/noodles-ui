import { TokenEntity, TokenResource } from '@noodles-ui/core-types';
import { NUI, ProjectContext, TokenContext } from '@noodles-ui/support-types';
import expect from 'expect';

import { contextFactory } from '../../../test-utils/contextFactory';
import { projectFactory } from '../../../test-utils/projectFactory';
import { resourceFactory } from '../../../test-utils/resourceFactory';
import { tokenFactory } from '../../../test-utils/tokenFactory';

import { addToken } from './addToken';

describe('addToken()', () => {
    let project: ProjectContext;
    let context: TokenContext;
    let resource: TokenResource;
    let entity: TokenEntity;
    let result: TokenEntity | undefined;

    describe('given a valid context', () => {
        beforeEach(() => {
            project = projectFactory();
            resource = resourceFactory(NUI.token, { name: 'foo' });
            context = contextFactory(resource);
            entity = tokenFactory(resource);

            result = addToken(project, context, entity);
        });

        it('should store the entity', () => {
            expect(project?.entities.token.size).toEqual(1);
            expect(project?.entities.token.get('/foo')?.entity.name).toEqual('foo');
        });

        it('should return the entity', () => {
            expect(typeof result).toBe('object');
            expect(result?.name).toEqual('foo');
        });
    });

    describe('given an entity with an empty name', () => {
        beforeEach(() => {
            project = projectFactory();
            resource = resourceFactory(NUI.token);
            context = contextFactory(resource);
            entity = tokenFactory(resource);
            result = addToken(project, context, entity);
        });

        it('should not store the entity', () => {
            expect(project?.entities.token.size).toEqual(0);
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
            resource = resourceFactory('token', { name: 'foo' });
            context = contextFactory(resource);
            context.consumers.add('variant-one');
            entity = tokenFactory(resource);
            addToken(project, context, entity);

            context = contextFactory(resource);
            context.consumers.add('variant-two');
            result = addToken(project, context, entity);
        });

        it('should not store the duplicated entity', () => {
            expect(project?.entities.token.size).toEqual(1);
        });

        it('should merge the consumers of the entity', () => {
            expect(project?.entities.token.get('/foo')?.context.consumers.size).toEqual(2);
            expect(project?.entities.token.get('/foo')?.context.consumers).toContain('variant-one');
            expect(project?.entities.token.get('/foo')?.context.consumers).toContain('variant-two');
        });
    });
});
