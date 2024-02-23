import { render } from '@solidjs/testing-library';
import { describe, expect, test } from 'vitest';

import { Heading } from '../Heading/Heading';

const content = 'Lorem ipsum';

describe('<Heading />', () => {
    test('renders', () => {
        const { container, unmount } = render(() => <Heading level={1}>{content}</Heading>);
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });
});
