import React from "react";
import ReactDOM from "react-dom";
import AdminLogin from "./../login";

import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("renders login form", () => {
    const div = document.createElement("div");
    const { getByTestId, queryByTestId } = render(<AdminLogin error={null} isLoading={true} handleLogin={() => { }} />, div);
    expect(getByTestId("login-btn")).toHaveTextContent("Login");
    expect(queryByTestId('parent-error')).not.toBeInTheDocument();
});

it("renders login form with credentials error", () => {
    const div = document.createElement("div");
    const { getByTestId, queryByTestId } = render(<AdminLogin error={"Invalid credentials"} isLoading={true} handleLogin={() => { }} />, div);
    expect(getByTestId("login-btn")).toHaveTextContent("Login");
    expect(queryByTestId('parent-error')).toBeInTheDocument();
    expect(queryByTestId("parent-error")).toHaveTextContent("Invalid credentials");
});

it("submit login form with invalid username", () => {
    const div = document.createElement("div");
    const { getByTestId, queryByTestId } = render(<AdminLogin error={null} isLoading={false} handleLogin={() => { }} />, div);

    const passwordInput = queryByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { name: "password", value: '23' } });
    expect(passwordInput).toHaveValue("23");

    const loginBtn = queryByTestId("login-btn");
    fireEvent.click(loginBtn);


    const usernameError = queryByTestId('username-error');
    expect(usernameError).toHaveTextContent("Field cant be empty");
});

it("submit login form with invalid password", () => {
    const div = document.createElement("div");
    const { getByTestId, queryByTestId } = render(<AdminLogin error={null} isLoading={false} handleLogin={() => { }} />, div);

    const usernameInput = queryByTestId('username-input');
    expect(usernameInput).toBeInTheDocument();
    fireEvent.change(usernameInput, { target: { name: "username", value: '23' } });
    expect(usernameInput).toHaveValue("23");

    const loginBtn = queryByTestId("login-btn");
    fireEvent.click(loginBtn);


    const passwordError = queryByTestId('password-error');
    expect(passwordError).toHaveTextContent("Field cant be empty");
});

it("submit login form with invalid username password", () => {
    const div = document.createElement("div");
    const { getByTestId, queryByTestId } = render(<AdminLogin error={null} isLoading={false} handleLogin={() => { }} />, div);

    const loginBtn = queryByTestId("login-btn");
    fireEvent.click(loginBtn);

    const usernameError = queryByTestId('username-error');
    expect(usernameError).toHaveTextContent("Field cant be empty");
    const passwordError = queryByTestId('password-error');
    expect(passwordError).toHaveTextContent("Field cant be empty");
});

it("submit login form with valid username and password", () => {
    const div = document.createElement("div");
    const handleLogin = jest.fn();
    const { getByTestId, queryByTestId } = render(<AdminLogin error={null} isLoading={false} handleLogin={handleLogin} />, div);

    const usernameInput = queryByTestId('username-input');
    expect(usernameInput).toBeInTheDocument();
    fireEvent.change(usernameInput, { target: { name: "username", value: '23' } });
    expect(usernameInput).toHaveValue("23");

    const passwordInput = queryByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { name: "password", value: '34' } });
    expect(passwordInput).toHaveValue("34");


    const loginBtn = queryByTestId("login-btn");
    fireEvent.click(loginBtn);

    expect(handleLogin).toHaveBeenCalled();
});