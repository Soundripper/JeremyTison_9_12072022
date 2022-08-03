/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"

import {waitFor} from "@testing-library/dom"
import BillsUI from "../views/BillsUI.js"
import {localStorageMock} from "../__mocks__/localStorage.js";
import { ROUTES_PATH } from "../constants/routes.js";
import router from "../app/Router.js";
import userEvent from "@testing-library/user-event"

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then NewBill should be instanciated", async () => {
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname })
      }
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Admin'
      }))
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
      const newBillObj = new NewBill({
        document, onNavigate, store: null, localStorage: window.localStorage
      })
      await waitFor(() => screen.getByText('Envoyer une note de frais'))
      const formNewBill = screen.getByTestId("form-new-bill")
      expect(formNewBill).toBeTruthy()

      const fileChengeBtn = screen.getByTestId("file")
      expect(fileChengeBtn).toBeTruthy()

      // const fileChengeFn = jest.fn(() => newBillObj.handleChangeFile)
      // fileChengeBtn.addEventListener('click', fileChengeFn)
      // userEvent.click()
      // expect(fileChengeFn).toHaveBeenCalled()
    })
  })
})
