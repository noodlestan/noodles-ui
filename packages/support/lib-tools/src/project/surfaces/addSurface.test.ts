import { SurfaceResource } from '@noodles-ui/core-types';
import {
    GeneratedSourceFile,
    ProjectContext,
    ProjectDiagnostic,
    ProjectDiagnosticSource,
    SurfaceContext,
} from '@noodles-ui/support-types';
import expect from 'expect';
import ts from 'typescript';

import { addSurface } from './addSurface';

const projectFactory = (overides?: Partial<ProjectContext>): ProjectContext => {
    const diagnostics: ProjectDiagnostic[] = [];
    const generatedSourceFiles = [];

    const addDiagnostic = (source: ProjectDiagnosticSource, message: string, data?: unknown) =>
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        diagnostics.push({
            message,
            source,
            data,
        });
    const compileProjectFile = async () => undefined;
    const addGeneratedSourceFile = (source: GeneratedSourceFile) =>
        generatedSourceFiles.push(source);

    return {
        projectFile: '',
        projectPath: '',
        build: {
            program: {} as ts.Program,
            success: true,
            result: {} as ts.EmitResult,
            diagnostics: [],
            timestamp: new Date(),
            files: [],
            modules: new Map(),
        },
        diagnostics,
        addDiagnostic,
        debug: [],
        rootPath: '',
        resource: {
            name: '',
            module: '',
        },
        compileProjectFile,
        generatedSourceFiles: [{ fileName: '' }],
        addGeneratedSourceFile,
        entities: {
            surface: new Map(),
            theme: new Map(),
            component: new Map(),
            variant: new Map(),
            token: new Map(),
        },
        ...overides,
    };
};

const resourceFactory = (overides?: Partial<SurfaceResource>): SurfaceResource => ({
    type: 'surface',
    name: '',
    module: '',
    extend: [],
    ...overides,
});
const contextFactory = (instance?: SurfaceResource): SurfaceContext => {
    return {
        key: '',
        resource: instance ?? resourceFactory(),
        public: true,
        consumes: new Set(),
        consumers: new Set(),
    };
};

describe('addSurface', () => {
    let project: ProjectContext | undefined;
    let context: SurfaceContext;
    let resource: SurfaceResource;
    describe('given valid context', () => {
        beforeEach(() => {
            project = projectFactory();
            resource = resourceFactory({ name: 'bar' });
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
            resource = resourceFactory();
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
            resource = resourceFactory({ name: 'foo' });
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
