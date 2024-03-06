import ts from 'typescript';

export const printTypescriptStatements = (statements: ts.Statement[]): string => {
    const resultFile = ts.createSourceFile(
        '',
        '',
        ts.ScriptTarget.Latest,
        /* setParentNodes */ false,
        ts.ScriptKind.TS,
    );
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    const content = statements
        .map(statement => printer.printNode(ts.EmitHint.Unspecified, statement, resultFile))
        .join('\n');

    return content;
};
