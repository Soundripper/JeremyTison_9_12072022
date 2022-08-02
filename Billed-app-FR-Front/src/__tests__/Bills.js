/**
 * @jest-environment jsdom
 */

import {screen, waitFor} from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import Bills, { handleClickNewBill } from "../containers/Bills.js"
// import Bills from "../containers/Bills.js"
import { bills } from "../fixtures/bills.js"
import { ROUTES_PATH} from "../constants/routes.js";
import {localStorageMock} from "../__mocks__/localStorage.js";

import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import router from "../app/Router.js";

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", async () => {

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByTestId('icon-window'))
      const windowIcon = screen.getByTestId('icon-window')
      //to-do write expect expression
      expect(windowIcon).toHaveClass('active-icon')
    })
    test("Then bills should be ordered from earliest to latest", () => {
      document.body.innerHTML = BillsUI({ data: bills })
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })


    // test("Then btnNewBill should call handleClickNewBill", () => {
    //   const handleClickNewBillFN = jest.fn(handleClickNewBill)
    //   const btnNewBill = screen.getByTestId('btn-new-bill')
    //   btnNewBill.addEventListener('click', handleClickNewBillFN)
    //   // userEvent.click(btnNewBill)
    //   btnNewBill.click()
    //   // expect(btnNewBill).not.toBeNull()
    //   expect(handleClickNewBillFN).toHaveBeenCalled()
    // })
    // test("Then iconEye should call handleClickIconEye", () => {
    //   const handleClickIconEye = jest.fn(bills.handleClickIconEye)
    //   const iconEye = document.querySelectorAll(`div[data-testid="icon-eye"]`)[0]
    //   iconEye.addEventListener('click', handleClickIconEye())
    //   userEvent.click(iconEye)
    //   iconEye.click()
    //   expect(iconEye).not.toBeNull()
    //   expect(iconEye).toBeTruthy()
    //   expect(iconEye).toBeInTheDocument()
    //   expect(handleClickIconEye).toHaveBeenCalled()
    //   const modal = document.querySelector('.modal')
    //   expect(modal).toHaveClass('fade')
    // })

    // test("Then btnNewBill should call handleClickNewBill and load NewBill", () => {
    //   document.body.innerHTML = BillsUI(({ data: bills }));
    //   const btnNewBill = screen.getByTestId('btn-new-bill')
    //   const handleClickNewBill = jest.fn((e) => e.preventDefault());
    //   btnNewBill.addEventListener('click', handleClickNewBill)
    //   userEvent.click(btnNewBill)
    //   expect(btnNewBill).not.toBeNull()
    //   expect(handleClickNewBill).toHaveBeenCalled()

      // expect(screen.getAllByText("Envoyer une note de frais")).toBeTruthy();

      // const handleClickNewBillFN = jest.fn(handleClickNewBill)
      // const btnNewBill = screen.getByTestId('btn-new-bill')
      // btnNewBill.addEventListener('click', handleClickNewBillFN)
      // userEvent.click(btnNewBill)
      // btnNewBill.click()
      // expect(btnNewBill).not.toBeNull()
      // expect(handleClickNewBillFN).toHaveBeenCalled()
    // })
  })
})

describe('When I am on Bills page and I click on buttonNewBill', () => {
  test('Then, NewBill page should Appear',  () => {

    // const onNavigate = (pathname) => {
    //   document.body.innerHTML = ROUTES({ pathname })
    // }

    // Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    // window.localStorage.setItem('user', JSON.stringify({
    //   type: 'Employee'
    // }))

    const billsObj = new Bills({
      document, onNavigate, store: null, bills:bills, localStorage: window.localStorage
    })
    
    // document.body.innerHTML = BillsUI({ data: { bills } })
    // const handleClickNewBill = jest.fn((e) => billsObj.handleClickNewBill())
    // const buttonNewBill = screen.getByTestId('btn-new-bill')
    // buttonNewBill.addEventListener('click', handleClickNewBill)
    // userEvent.click(buttonNewBill)
    // expect(buttonNewBill).toHaveBeenCalled()

    // const handleClickIconEye = jest.fn((e) => billsObj.handleClickIconEye())
    // const IconEye = screen.getByTestId('icon-eye')
    // IconEye.addEventListener('click', handleClickNewBill)
    // userEvent.click(IconEye)
    // expect(handleClickIconEye).toHaveBeenCalled()
  })
})