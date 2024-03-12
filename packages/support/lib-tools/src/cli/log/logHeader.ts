// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { blue, bold } from 'kleur';

const NUI = [`  _  _ _   _ ___`, ` | \\| | | | |_ _|`, ` | .\` | |_| || |`, ` |_|\\_|\\___/|___|`];

export const logHeader = (name: string): void => {
    const title = ' -- ' + bold(name.toUpperCase()) + ' -' + '-'.repeat(32 - name.length);
    const parts = [...NUI, '', title, ''];
    console.info(parts.map(blue).join('\n'));
};
