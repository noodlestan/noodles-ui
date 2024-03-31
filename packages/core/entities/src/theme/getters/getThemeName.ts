import { ThemeResource } from '@noodles-ui/core-resources';

const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

const safeName = (word: string): string => {
    return word.replace(/[^a-z0-9]/gi, '');
};

export function getThemeName(entity: ThemeResource): string {
    return capitalize(safeName(entity.name));
}
