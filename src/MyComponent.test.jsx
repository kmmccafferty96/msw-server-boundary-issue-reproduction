import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MyComponent from './MyComponent';
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

it('renders data fetched on load', async () => {
    server.use(http.get(
        "/api/data",
        () => {
            return HttpResponse.json({ message: "in the document"}, { status: 200 });
        },
        ));

    render(<MyComponent />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    console.error("without server boundary works!");

    await waitFor(() => {
        expect(screen.queryByText("in the document")).toBeInTheDocument();
    });
});

it('renders data fetched on load with server boundary', async () => {
    server.boundary(async () => {
        server.use(http.get(
            "/api/data",
            () => {
                return HttpResponse.json({ message: "in the document"}, { status: 200 });
            },
            ));
    
        render(<MyComponent />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        console.error("with server boundary works!");
        
        await waitFor(() => {
            expect(screen.queryByText("this should fail")).toBeInTheDocument();
        });
    })
});

