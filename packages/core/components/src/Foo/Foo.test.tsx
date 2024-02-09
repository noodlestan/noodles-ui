import { fireEvent, render } from '@solidjs/testing-library';
import { describe, expect, test } from 'vitest';

import { Foo } from '.';

describe('<Foo />', () => {
    test('renders', () => {
        const { container, unmount } = render(() => <Foo startAt={4} />);
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });

    test('updates', async () => {
        const { container, unmount } = render(() => <Foo startAt={4}>foo</Foo>);
        const buttonClicked = new Promise(resolve => {
            const handler = (ev: MouseEvent) => {
                container.removeEventListener('click', handler);
                resolve(ev);
            };
            container.addEventListener('click', handler);
        });
        fireEvent.click(container);
        await buttonClicked;
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });
});
