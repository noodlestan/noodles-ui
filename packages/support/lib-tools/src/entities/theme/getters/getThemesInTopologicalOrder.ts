import { ThemeResource } from '@noodles-ui/core-types';
import { CompilerContext, ThemeBuildContext } from '@noodles-ui/support-types';

import { getResourceKey } from '../../../compiler/resources/getters/getResourceKey';

const addTheme = (set: Set<string>, theme: ThemeResource) => {
    if (theme.extend) {
        theme.extend.forEach(extended => addTheme(set, extended));
    }
    const key = getResourceKey(theme);
    set.add(key);
};

export function getThemesInTopologicalOrder(compiler: CompilerContext): ThemeBuildContext[] {
    const themes = Array.from(compiler.entities.theme.values());

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
