import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import toast from "react-hot-toast";
import Login from "./Login";
import * as api from "../helpers/api";
  
  jest.mock("react-hot-toast", () => ({
    success: jest.fn(),
    error: jest.fn(),
  }));

describe("Login Component", () => {
  it("renders form elements and submits successfully", async () => {
    const mockLogin = jest.spyOn(api, "login").mockResolvedValueOnce({ token: "someToken" });
    const { getByLabelText, getByText } = render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );
  
      const emailInput = getByLabelText("E-Mail:") as HTMLInputElement;
      const passwordInput = getByLabelText("Password:") as HTMLInputElement;
      const submitButton = getByText("Submit");
  
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);
  
      await waitFor(() => expect(mockLogin).toHaveBeenCalledWith({ email: "test@example.com", password: "password123" }));
      expect(mockLogin).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith("Login successful");
    });
  });

  it("validates form fields", () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = getByLabelText("E-Mail:") as HTMLInputElement;
    const passwordInput = getByLabelText("Password:") as HTMLInputElement;
    const submitButton = getByText("Submit");

    fireEvent.click(submitButton);

    expect(emailInput.nextElementSibling?.textContent).toBe("Required");
    expect(passwordInput.nextElementSibling?.textContent).toBe("Required");
  });

  it("handles form submission failure", async () => {
    const { container, getByLabelText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    
    const formElement = container.querySelector("form");
  
    fireEvent.change(getByLabelText("E-Mail:"), { target: { value: "test@example.com" } });
    fireEvent.change(getByLabelText("Password:"), { target: { value: "password123" } });
  
    jest.spyOn(api, "login").mockRejectedValueOnce({ message: "An error occurred while logging in" });
  
    fireEvent.submit(formElement as Element);
  
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("An error occurred while logging in"));
  });