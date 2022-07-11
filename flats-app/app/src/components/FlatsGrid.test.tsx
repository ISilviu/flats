
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import FlatsGrid from './FlatsGrid';
import { range } from "lodash";
import { MemoryRouter } from "react-router";

describe('FlatsGrid', () => {
    test('Displays apartment cards', () => {
        const flats = range(1, 6).map(index => ({
            id: index,
            title: `For sale apartment ${index}`,
            image_url: `url${index}`,
        }));

        const component = render(
            <MemoryRouter>
                <FlatsGrid flats={flats} pageNumber={1} pagesCount={1} />
            </MemoryRouter>
        );
        flats.map(flat => flat.title).forEach(title => {
            expect(component.queryByText(title)).toBeInTheDocument();
        });
    });
});