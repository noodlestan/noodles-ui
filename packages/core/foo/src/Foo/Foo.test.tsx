import { fireEvent, render } from '@solidjs/testing-library';
import { describe, expect, test } from 'vitest';

import { Foo } from './Foo';

// NOTE! this file is preserved for sanity
// ts build ambient is brittle and when broken it's cool to have a minimum repro to work with
describe('<Foo />', () => {
    test('renders', () => {
        const { container, unmount } = render(() => <Foo num={4} />);
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });

    // Note: the below test is taken straight from the official docs
    // I am sure there must be a more ergonomic way of triggering events
    test('updates', async () => {
        const { container, unmount } = render(() => <Foo num={4}>foo</Foo>);
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
