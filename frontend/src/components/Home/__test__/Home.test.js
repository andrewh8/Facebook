import React from "react";
import { render, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom";  // optional
// import userEvent from "@testing-library/user-event";
// import TestComponent from "path-to-test-component";
import Home from '../Home';

describe("Home component", () => {
    it("checkDivRender", () => {
        const { queryByTitle } = render(<Home />)
        const dv = queryByTitle("divTest");
        expect(dv).toBeTruthy();
    });
});
