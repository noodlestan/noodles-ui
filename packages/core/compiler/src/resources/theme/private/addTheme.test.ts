import { NUI, ThemeContext, ThemeEntity } from '@noodles-ui/core-entities';
import { ThemeResource } from '@noodles-ui/core-resources';
import expect from 'expect';

import { compilerFactory } from '../../../test-utils/compilerFactory';
import { contextFactory } from '../../../test-utils/contextFactory';
import { resourceFactory } from '../../../test-utils/resourceFactory';
import { themeFactory } from '../../../test-utils/themeFactory';
import { themeTokensFactory } from '../../../test-utils/themeTokensFactory';
import { CompilerContext } from '../../../types';

import { addTheme } from './addTheme';

describe('addTheme()', () => {
    let compiler: CompilerContext | undefined;
    let context: ThemeContext;
    let resource: ThemeResource;
    let entity: ThemeEntity;

    describe('given a valid context', () => {
        beforeEach(() => {
            compiler = compilerFactory();
            resource = resourceFactory('theme', { name: 'foo' });
            context = contextFactory(resource);
            entity = themeFactory(themeTokensFactory(), resource);
            addTheme(compiler, context, entity);
        });

        it('should store the entity', () => {
            expect(compiler?.entities.theme.size).toEqual(1);
        });
    });

    describe('given an entity with an empty name', () => {
        beforeEach(() => {
            compiler = compilerFactory();
            resource = resourceFactory(NUI.theme);
            context = contextFactory(resource);
            entity = themeFactory(themeTokensFactory(), resource);
            addTheme(compiler, context, entity);
        });

        it('should not store the entity', () => {
            expect(compiler?.entities.theme.size).toEqual(0);
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
            resource = resourceFactory('theme', { name: 'foo' });
            context = contextFactory(resource);
            entity = themeFactory(themeTokensFactory(), resource);
            addTheme(compiler, context, entity);
            addTheme(compiler, context, entity);
        });

        it('should not store the entity', () => {
            expect(compiler?.entities.theme.size).toEqual(1);
        });

        it('should add a project error', () => {
            expect(compiler?.diagnostics.length).toEqual(1);
            expect(compiler?.diagnostics[0].severity).toBe('error');
            expect(compiler?.diagnostics[0].message).toContain('Duplicate entity key "/foo".');
        });
    });
});
