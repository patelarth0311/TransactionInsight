import { render, screen } from '@testing-library/react'
import { describe, it, afterEach } from 'node:test'
import { TransactionView } from '../components/TransactionView'
import { cleanup, } from '@testing-library/react'
import { assert } from 'node:console'
import { create } from 'node:domain'

afterEach(() => {
    cleanup()
})


test("Testing props-passing", () => {

  const transactionView = render(<TransactionView merchant_name={'Uber'} amount={3.41} date={'2023-01-20'} category={["Gaming"]} location={{region: "Georgia"}}/>)

  const merchantH1 = screen.getByTestId("merchant_name");
  const amountH1 = screen.getByTestId("amount");
  const dateH1 = screen.getByTestId("date");

  expect(merchantH1.textContent).toBe("Uber")
  expect(amountH1.textContent?.trim()).toBe("$3.41")
  expect(dateH1.textContent).toBe("2023-01-20")



})

test("Comparing snapshot", () => {  

  const transactionView = render(<TransactionView merchant_name={'Uber'} amount={3.41} date={'2023-09-20'} category={["Gaming"]} location={{region: "Georgia"}}/>)
  expect(transactionView).toMatchSnapshot()
})