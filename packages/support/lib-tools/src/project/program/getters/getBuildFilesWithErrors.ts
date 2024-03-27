import { BuildContext } from '@noodles-ui/support-types';

export const getBuildFilesWithErrors = (build: BuildContext): string[] => {
    const { diagnostics = [] } = build;

    const set = diagnostics.reduce((acc, item) => {
        if (item && item.file) {
            acc.add(item.file.fileName);
        }
        return acc;
    }, new Set<string>());

    return Array.from(set.values());
};
