import { build } from '@noodles-ui/lib-tools';

const main = async () => {
    await build('./src/nui/SandboxUI.nui.ts');
    // const project = await build('./src/nui/SandboxUI.nui.ts');
    // console.log(project.components.items.get('@noodles-ui/core-unstyled/Text')?.instance?.props);
    // console.log(project.components.items.get('@noodles-ui/core-styled/Text')?.instance?.props);
    // const Text = project.components.items.get('@noodles-ui/sandbox-ui/Text');
    // console.log('Text props:', Text?.instance?.props);
    // console.log('Text consumes:', Text?.consumes);
};

main();
