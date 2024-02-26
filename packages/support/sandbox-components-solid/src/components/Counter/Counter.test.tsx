import { render } from '@solidjs/testing-library';
import { describe, expect, test } from 'vitest';

import { Counter } from './Counter';

describe('<Counter />', () => {
    test('renders', () => {
        const { container, unmount } = render(() => <Counter />);
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });
});
