import * as ts from 'typescript';

export const getSourceFileExports = (sourceFile: ts.SourceFile): ts.ExportDeclaration[] => {
    const exports: ts.ExportDeclaration[] = [];

    function visit(node: ts.Node) {
        if (ts.isExportDeclaration(node)) {
            exports.push(node);
        }

        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return exports;
};

// Example usage:
// const filePath = 'path/to/your/typescript/file.ts';
// const sourceCode = fs.readFileSync(filePath, 'utf-8');
// const sourceFile = ts.createSourceFile(filePath, sourceCode, ts.ScriptTarget.Latest, true);

// const exportDeclarations = findExports(sourceFile);
// console.log(exportDeclarations);
