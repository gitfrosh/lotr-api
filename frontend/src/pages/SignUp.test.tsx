import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUp from "./SignUp";
import * as api from "../helpers/api";
import toast from "react-hot-toast";

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const mockRegister = jest.spyOn(api, "register");

describe("SignUp Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the sign-up form", () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    expect(getByLabelText("E-Mail:")).toBeInTheDocument();
    expect(getByLabelText("Password:")).toBeInTheDocument();
    expect(getByLabelText("Repeat Password:")).toBeInTheDocument();
    expect(getByText("Submit")).toBeInTheDocument();
  });

  it("submits the form with valid input", async () => {
    mockRegister.mockResolvedValueOnce({});

    const { getByLabelText, container } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText("E-Mail:"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText("Password:"), {
      target: { value: "password123" },
    });
    fireEvent.change(getByLabelText("Repeat Password:"), {
      target: { value: "password123" },
    });

    const formElement = container.querySelector("form");
    fireEvent.submit(formElement as Element);

    await waitFor(() => expect(mockRegister).toHaveBeenCalled());
    expect(mockRegister).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });

    expect(api.register).toHaveBeenCalledTimes(1);
    expect(api.register).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
    expect(toast.success).toHaveBeenCalledWith("Registered successfully");
  });

  it("handles form submission failure", async () => {
    const { container, getByLabelText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    
    const formElement = container.querySelector("form");
  
    fireEvent.change(getByLabelText("E-Mail:"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText("Password:"), {
      target: { value: "password123" },
    });
    fireEvent.change(getByLabelText("Repeat Password:"), {
      target: { value: "password123" },
    });
  
    jest.spyOn(api, "register").mockRejectedValueOnce({ message: "An error occurred while registering" });
  
    fireEvent.submit(formElement as Element);
  
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("An error occurred while registering"));
  });

  it("validates form fields", () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const emailInput = getByLabelText("E-Mail:") as HTMLInputElement;
    const passwordInput = getByLabelText("Password:") as HTMLInputElement;
    const repeatPasswordInput = getByLabelText("Repeat Password:") as HTMLInputElement;
    const submitButton = getByText("Submit");

    fireEvent.click(submitButton);

    expect(emailInput.nextElementSibling?.textContent).toBe("Required");
    expect(passwordInput.nextElementSibling?.textContent).toBe("Required");
    expect(repeatPasswordInput.nextElementSibling?.textContent).toBe("Required");
  });

  it("does not submit invalid form", async () => {
    const { getByLabelText, container } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText("E-Mail:"), { target: { value: "" } });
    fireEvent.change(getByLabelText("Password:"), { target: { value: "" } });
    fireEvent.change(getByLabelText("Repeat Password:"), {
      target: { value: "" },
    });

    const formElement = container.querySelector("form");
    fireEvent.submit(formElement as Element);

    expect(mockRegister).not.toHaveBeenCalled();
  });
});
