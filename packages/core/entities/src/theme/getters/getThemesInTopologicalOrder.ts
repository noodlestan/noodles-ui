import { ThemeResource, getResourceKey } from '@noodles-ui/core-resources';

import { ProjectEntities, ThemeBuildContext } from '../../project-entities';

const addTheme = (set: Set<string>, theme: ThemeResource) => {
    if (theme.extend) {
        theme.extend.forEach(extended => addTheme(set, extended));
    }
    const key = getResourceKey(theme);
    set.add(key);
};

export function getThemesInTopologicalOrder(context: ProjectEntities): ThemeBuildContext[] {
    const themes = Array.from(context.entities.theme.values());

    const ordered = themes.reduce(
        (acc, item) => {
            addTheme(acc.set, item.entity);
            const key = getResourceKey(item.entity);
            acc.table.set(key, item);
            return acc;
        },
        { set: new Set<string>(), table: new Map<string, ThemeBuildContext>() },
    );

    return Array.from(ordered.set.values()).map(key => ordered.table.get(key) as ThemeBuildContext);
}
