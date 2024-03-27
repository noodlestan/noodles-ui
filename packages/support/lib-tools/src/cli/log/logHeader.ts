import { blue, bold } from 'kleur';

const NUI = [`  _  _ _   _ ___`, ` | \\| | | | |_ _|`, ` | .\` | |_| || |`, ` |_|\\_|\\___/|___|`];

export const logHeader = (name: string, color: (str: string) => string = blue): void => {
    const title = ' -- ' + bold(name.toUpperCase()) + ' -' + '-'.repeat(32 - name.length);
    const parts = [...NUI, '', title, ''];
    console.info(parts.map(color).join('\n'));
};
