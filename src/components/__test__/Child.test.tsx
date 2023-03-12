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
import { Child, nameType } from "../Child";
import userEvent from "@testing-library/user-event";


const initialState:nameType[]=[];
const mockUseState=jest.fn();

jest.mock("react", ()=>({
    ...jest.requireActual("react"),
    useState:(initialState:any)=>[initialState, mockUseState]
}));

describe("Test child", ()=>{
    test("should render a child", ()=>{
        const mockSetHasChanged=jest.fn();
        render(<Child setHasChanged={mockSetHasChanged}/>);
        expect(screen.getByRole("child")).toBeTruthy();
        const playInput=screen.getByRole('play');
        expect(playInput).toBeTruthy();
        userEvent.click(playInput);
        expect(mockUseState).toHaveBeenCalled();
    });
});