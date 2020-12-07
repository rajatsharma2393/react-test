import React from "react";
import ReactDOM from "react-dom";
import VisitorRegistration from "./../visitor";
import * as axios from "axios";

import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

it("renders registeration form", () => {
    const div = document.createElement("div");
    const { getByTestId, queryByTestId } = render(<VisitorRegistration />, div);
    expect(getByTestId("submit-btn")).toHaveTextContent("Submit");
    expect(queryByTestId('firstName-error')).not.toBeInTheDocument();
});

it("submit registeration form with invalid firstName", () => {
    const div = document.createElement("div");
    const { getByTestId, queryByTestId } = render(<VisitorRegistration />, div);
    const loginBtn = queryByTestId("submit-btn");
    fireEvent.click(loginBtn);


    const firstNameError = queryByTestId('firstName-error');
    expect(firstNameError).toHaveTextContent("Field cant be empty");
});

it("submit registeration form with valid firstName", () => {
    const div = document.createElement("div");
    const { getByTestId, queryByTestId } = render(<VisitorRegistration />, div);

    const firstNameInput = queryByTestId('firstName-input');
    expect(firstNameInput).toBeInTheDocument();
    fireEvent.change(firstNameInput, { target: { name: "firstName", value: 'text' } });
    expect(firstNameInput).toHaveValue("text");

    const loginBtn = queryByTestId("submit-btn");
    fireEvent.click(loginBtn);


    expect(queryByTestId('firstName-error')).not.toBeInTheDocument();
});

it("submit registeration form with all valid fields", () => {
    const div = document.createElement("div");
    const { getByTestId, queryByTestId } = render(<VisitorRegistration />, div);

    const firstNameInput = queryByTestId('firstName-input');
    expect(firstNameInput).toBeInTheDocument();
    fireEvent.change(firstNameInput, { target: { name: "firstName", value: 'text' } });
    expect(firstNameInput).toHaveValue("text");

    const lastNameInput = queryByTestId('lastName-input');
    expect(lastNameInput).toBeInTheDocument();
    fireEvent.change(lastNameInput, { target: { name: "lastName", value: 'textLast' } });
    expect(lastNameInput).toHaveValue("textLast");

    const emailInput = queryByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { name: "email", value: 'email' } });
    expect(emailInput).toHaveValue("email");

    const phoneNumber = queryByTestId('phoneNumber-input');
    expect(phoneNumber).toBeInTheDocument();
    fireEvent.change(phoneNumber, { target: { name: "phoneNumber", value: '1234' } });
    expect(phoneNumber).toHaveValue("1234");

    const dateInput = queryByTestId('visitDate-input');
    expect(dateInput).toBeInTheDocument();
    fireEvent.change(dateInput, { target: { name: "visitDate", value: '2020-05-12' } });
    expect(dateInput).toHaveValue("2020-05-12");


    const timeInput = queryByTestId('visitTime-input');
    expect(timeInput).toBeInTheDocument();
    fireEvent.change(timeInput, { target: { name: "visitTime", value: '13:12' } });
    expect(timeInput).toHaveValue("13:12");


    const submitBtn = queryByTestId("submit-btn");
    fireEvent.click(submitBtn);


    expect(queryByTestId('firstName-error')).not.toBeInTheDocument();
    expect(axios.post).toHaveBeenCalled();
});