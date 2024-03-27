import { blue, bold, green, red } from 'kleur';

const NUI = [`  _  _ _   _ ___`, ` | \\| | | | |_ _|`, ` | .\` | |_| || |`, ` |_|\\_|\\___/|___|`];

export const logHeader = (name: string, success?: boolean): void => {
    const title = ' -- ' + bold(name.toUpperCase()) + ' -' + '-'.repeat(32 - name.length);
    const parts = [...NUI, '', title, ''];
    const color = success === undefined ? blue : success ? green : red;
    console.info(parts.map(color).join('\n'));
};
