import { ThemeTokens } from '@noodles-ui/core-types';
import { build } from '@noodles-ui/lib-tools';

const getThemeTokens = async (theme: string): Promise<ThemeTokens> => {
    console.log(theme);
    return {
        base: {
            global: {},
            surfaces: {},
        },
        alt: {
            global: {},
            surfaces: {},
        },
    };
};

const main = async () => {
    const project = await build('./src/nui/LabUI.nui.ts', { getThemeTokens });

    // const project = await build('./src/nui/LabUI.nui.ts');
    // console.log(project.components.get('@noodles-ui/lab-ui/Text')?.entity?.props);
    // console.log(project.components.get('@noodles-ui/core-styled/Text')?.entity?.props);

    // const Text = project.components.get('@noodles-ui/core-styled/Text');
    // console.log('Text props:', Text?.entity?.props);
    // console.log('Text consumes:', Text?.consumes);

    // const UnstyledText = project.components.get('@noodles-ui/core-unstyled/Text');
    // console.log('UnstyledText props:', UnstyledText?.entity?.props);
    // console.log('UnstyledText consumes:', UnstyledText?.consumes);

    // TODO provide an entry point via bin/build --project src/nui/LabUI.nui.ts
    if (!project.build.success || project.diagnostics.length) {
        process.exit(1);
    }
};

main();
