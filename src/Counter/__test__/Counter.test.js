import Counter from "../Counter";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let getByTestId;

beforeEach(() => {
  const component = render(<Counter />);
  getByTestId = component.getByTestId;
});

afterEach(() => {
  cleanup();
});

test("header renders with correct text", () => {
  const headerEl = getByTestId("header");

  expect(headerEl.textContent).toBe("My Counter");
});

test("counter initally start with text of 0", () => {
  const counterEl = getByTestId("counter");

  expect(counterEl.textContent).toBe("0");
});

test("input contains initial value of 1", () => {
  const inputEl = getByTestId("input");

  expect(inputEl.value).toBe("1");
});

test("add button renders with correct +", () => {
  const addButtonEl = getByTestId("add-btn");

  expect(addButtonEl.textContent).toBe("+");
});

test("substract button renders with -", () => {
  const substractBtn = getByTestId("substract-btn");

  expect(substractBtn.textContent).toBe("-");
});

test("change value of input works correctly", () => {
  const inputEl = getByTestId("input");

  expect(inputEl.value).toBe("1");

  fireEvent.change(inputEl, { target: { value: "5" } });

  expect(inputEl.value).toBe("5");
});

test("click on plus btn adds 1 to counter", () => {
  const btnEl = getByTestId("add-btn");
  const counterEl = getByTestId("counter");

  expect(counterEl.textContent).toBe("0");

  fireEvent.click(btnEl);

  expect(counterEl.textContent).toBe("1");
});

test("click on substract btn substracts 1 to counter", () => {
  const btnEl = getByTestId("substract-btn");
  const counterEl = getByTestId("counter");

  expect(counterEl.textContent).toBe("0");

  fireEvent.click(btnEl);

  expect(counterEl.textContent).toBe("-1");
});

test("changing input value then clicking on add btn workks correctly", () => {
  const addBtnEl = getByTestId("add-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, { target: { value: "5" } });

  fireEvent.click(addBtnEl);

  expect(counterEl.textContent).toBe("5");
});

test("changing input value then clicking on substract btn workks correctly", () => {
  const substractBtnEl = getByTestId("substract-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, { target: { value: "5" } });

  fireEvent.click(substractBtnEl);

  expect(counterEl.textContent).toBe("-5");
});

test("counter contains correct className", () => {
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");
  const addBtnEl = getByTestId("add-btn");
  const subBtnEl = getByTestId("substract-btn");

  expect(counterEl.className).toBe("");

  fireEvent.change(inputEl, { target: { value: "50" } });

  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  expect(counterEl.className).toBe("green");

  fireEvent.click(subBtnEl);
  fireEvent.click(subBtnEl);
  expect(counterEl.className).toBe("");

  fireEvent.click(subBtnEl);
  fireEvent.click(subBtnEl);
  fireEvent.click(subBtnEl);
  fireEvent.click(subBtnEl);
  expect(counterEl.className).toBe("red");
});
