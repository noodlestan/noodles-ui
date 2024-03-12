import { build } from '@noodles-ui/lib-tools';

const main = async () => {
    const project = await build('./src/nui/SandboxUI.nui.ts');
    // const project = await build('./src/nui/SandboxUI.nui.ts');
    // console.log(project.components.items.get('@noodles-ui/sandbox-ui/Text')?.instance?.props);
    // console.log(project.components.items.get('@noodles-ui/core-styled/Text')?.instance?.props);

    // const Text = project.components.items.get('@noodles-ui/core-styled/Text');
    // console.log('Text props:', Text?.instance?.props);
    // console.log('Text consumes:', Text?.consumes);

    // const UnstyledText = project.components.items.get('@noodles-ui/core-unstyled/Text');
    // console.log('UnstyledText props:', UnstyledText?.instance?.props);
    // console.log('UnstyledText consumes:', UnstyledText?.consumes);

    // TODO provide an entry point via bin/build --project src/nui/SandboxUI.nui.ts
    if (!project.build.success || project.diagnostics.length) {
        process.exit(1);
    }
};

main();
