import { render, screen, fireEvent } from "@testing-library/react";
import { Parent } from "../Parent";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  MemoryRouter,
  useNavigate,
} from "react-router-dom";

// mock useNavigate
const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate, // Return an empty jest function to test whether it was called or not...I'm not depending on the results so no need to put in a return value
}));



export const renderComponent = () => {
  return <MemoryRouter initialEntries={["/"]}>{<Parent />}</MemoryRouter>;
};

describe("Parent component", () => {
  test("renders back button and child component", () => {
    render(renderComponent());
    const backButton = screen.getByText(/Go back to previous page/i);
    expect(backButton).toBeInTheDocument();
    const childComponent = screen.getByRole("play");
    expect(childComponent).toBeInTheDocument();
  });

  test("clicking back button without changes navigates back", () => {
    render(renderComponent());
    const backButton = screen.getByText(/Go back to previous page/i);
    fireEvent.click(backButton);
    expect(mockedNavigate).toHaveBeenCalledWith(-1);
  });

  test("clicking back button with changes opens dialog", () => {
    render(<Parent />);
    const backButton = screen.getByText(/Go back to previous page/i);
    const playCheckbox = screen.getByRole("play");
    fireEvent.click(playCheckbox);
    fireEvent.click(backButton);
    const dialogTitle = screen.getByText(/Use Google's location service\?/i);
    expect(dialogTitle).toBeInTheDocument();
  });

  // test("dialog 'Agree' button navigates back", () => {
  //   const navigate = jest.fn();
  //   jest.mock("react-router-dom", () => ({
  //     useNavigate: () => navigate,
  //   }));
  //   render(<Parent />);
  //   const backButton = screen.getByText(/Go back to previous page/i);
  //   const playCheckbox = screen.getByRole("checkbox", { name: /play/i });
  //   fireEvent.click(playCheckbox);
  //   fireEvent.click(backButton);
  //   const agreeButton = screen.getByText(/Agree/i);
  //   fireEvent.click(agreeButton);
  //   expect(navigate).toHaveBeenCalledWith(-1);
  // });

  // test("dialog 'Disagree' button closes dialog", () => {
  //   render(<Parent />);
  //   const backButton = screen.getByText(/Go back to previous page/i);
  //   const playCheckbox = screen.getByRole("checkbox", { name: /play/i });
  //   fireEvent.click(playCheckbox);
  //   fireEvent.click(backButton);
  //   const disagreeButton = screen.getByText(/Disagree/i);
  //   fireEvent.click(disagreeButton);
  //   const dialogTitle = screen.queryByText(/Use Google's location service\?/i);
  //   expect(dialogTitle).not.toBeInTheDocument();
  // });
});
