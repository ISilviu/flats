
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import FlatCard from './FlatCard';

describe('FlatCard', () => {
    test('Title is displayed', () => {
        const component = render(<FlatCard title="foo" imageUrl="url" />);
        expect(component.queryByText('foo')).toBeInTheDocument();
    });
});