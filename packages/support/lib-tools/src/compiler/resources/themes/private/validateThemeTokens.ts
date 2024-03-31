import {
    SurfaceTokenMap,
    ThemeModeTokens,
    ThemeResource,
    ThemeTokens,
    TokenMap,
} from '@noodles-ui/core-types';
import { CompilerContext } from '@noodles-ui/support-types';

const themeTokenProps = ['base', 'alt'];
const themeModeTokenProps = ['global', 'surfaces'];
const emptyThemeMode = { global: {}, surfaces: {} };

const validateTokenMap = (
    compiler: CompilerContext,
    theme: ThemeResource,
    tokenContextKey: string,
    data: unknown,
): TokenMap => {
    if (typeof data !== 'object' && data !== null) {
        compiler.addError(theme, `Invalid token map "${tokenContextKey}".`);
        return {};
    }
    const tokenMap = data as { [key: string]: unknown };
    for (const key in tokenMap || {}) {
        if (typeof tokenMap[key] !== 'string') {
            compiler.addError(theme, `Invalid token value in "${tokenContextKey}.${key}".`);
            delete tokenMap[key];
        }
    }
    return tokenMap as TokenMap;
};

const validateSurfaceTokenMap = (
    compiler: CompilerContext,
    theme: ThemeResource,
    surfaceContextKey: string,
    data: unknown,
): SurfaceTokenMap => {
    const surfaces = Array.from(compiler.entities.surface.values());

    if (typeof data !== 'object' && data !== null) {
        compiler.addError(theme, `Invalid surface map "${surfaceContextKey}".`);
        return { global: {}, surfaces: {} };
    }
    const surfaceMap = data as { [key: string]: unknown };
    for (const key in surfaceMap || {}) {
        if (!surfaces.find(surface => surface.entity.name === key)) {
            compiler.addError(
                theme,
                `Unknown surface "${key}" in surface map "${surfaceContextKey}".`,
            );
            delete surfaceMap[key];
        } else {
            surfaceMap[key] = validateTokenMap(
                compiler,
                theme,
                `${surfaceContextKey}.surfaces.${key}`,
                surfaceMap[key],
            );
        }
    }

    return surfaceMap as SurfaceTokenMap;
};

const validateModeTokens = (
    compiler: CompilerContext,
    theme: ThemeResource,
    modeName: string,
    data: unknown,
): ThemeModeTokens => {
    if (typeof data !== 'object' && data !== null) {
        compiler.addError(theme, `Invalid mode tokens in "${modeName}".`);
        return { global: {}, surfaces: {} };
    }
    const themeModeTokens = data as { [key: string]: unknown };
    for (const key in themeModeTokens || {}) {
        if (!themeModeTokenProps.includes(key)) {
            compiler.addError(theme, `Unknown key "${key}" in "${modeName}".`);
            delete themeModeTokens[key];
        }
    }
    if (!('global' in themeModeTokens)) {
        compiler.addError(theme, `Missing "global" attribute in "${modeName}".`);
        themeModeTokens.global = {};
    } else {
        themeModeTokens.global = validateTokenMap(
            compiler,
            theme,
            `${modeName}.global`,
            themeModeTokens.global,
        );
    }
    if (!('surfaces' in themeModeTokens)) {
        compiler.addError(theme, `Missing "surfaces" attribute in "${modeName}".`);
        themeModeTokens.surfaces = {};
    } else {
        themeModeTokens.surfaces = validateSurfaceTokenMap(
            compiler,
            theme,
            modeName,
            themeModeTokens.surfaces,
        );
    }
    return themeModeTokens as ThemeModeTokens;
};

export const validateThemeTokens = (
    compiler: CompilerContext,
    theme: ThemeResource,
    data: unknown,
): ThemeTokens => {
    if (typeof data !== 'object' && data !== null) {
        compiler.addError(theme, `Invalid "tokens" object.`);
        return { base: emptyThemeMode, alt: emptyThemeMode };
    }
    const themeTokens = data as { [key: string]: unknown };
    for (const key in themeTokens || {}) {
        if (!themeTokenProps.includes(key)) {
            compiler.addError(theme, `Unknown key "${key}" in "tokens" object.`);
            delete themeTokens[key];
        }
    }
    for (const prop of themeTokenProps) {
        if (!(prop in themeTokens)) {
            compiler.addError(theme, `Missing "${prop}" attribute in "tokens" object.`);
            themeTokens[prop] = emptyThemeMode;
        } else {
            themeTokens[prop] = validateModeTokens(compiler, theme, prop, themeTokens[prop]);
        }
    }
    return themeTokens as ThemeTokens;
};
