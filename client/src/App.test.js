import { render, fireEvent, screen, within } from "@testing-library/react";
import App from "./App";
// Material UI example 2 test
test("test AutoComplete selection", () => {
render(<App />);
const autocomplete = screen.getByTestId("autocomplete");
const input = within(autocomplete).getByLabelText("available words");
fireEvent.click(input); // sets focus
fireEvent.change(input, { target: { value: "Eraj" } });
fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
fireEvent.keyDown(autocomplete, { key: "Enter" });
fireEvent.change(input, { target: { value: "the" } });
fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
fireEvent.keyDown(autocomplete, { key: "Enter" });
fireEvent.change(input, { target: { value: "fox" } });
fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
fireEvent.keyDown(autocomplete, { key: "Enter" });
fireEvent.change(input, { target: { value: "came" } });
fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
fireEvent.keyDown(autocomplete, { key: "Enter" });
fireEvent.change(input, { target: { value: "down" } });
fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
fireEvent.keyDown(autocomplete, { key: "Enter" });
fireEvent.change(input, { target: { value: "from" } });
fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
fireEvent.keyDown(autocomplete, { key: "Enter" });
fireEvent.change(input, { target: { value: "this" } });
fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
fireEvent.keyDown(autocomplete, { key: "Enter" });
fireEvent.change(input, { target: { value: "hill" } });
fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
fireEvent.keyDown(autocomplete, { key: "Enter" });
expect(screen.getByText("Eraj the fox came down from this hill")).toBeInTheDocument();
// this just shows what the test sees, comment it out if there are no problems
// screen.debug();
})