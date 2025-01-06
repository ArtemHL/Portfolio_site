import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Account.css'

const AccountGui = () => {

  return (
    <div className = 'account-gui'>
        <Link className = 'account-gui-button account-gui-link' to = "/account/orders">
            My Orders
        </Link>
        <Link className = 'account-gui-button account-gui-link' to = "/account/products">
            My Products
        </Link>
        <Link className = 'account-gui-button account-gui-link' to = "/account/basket">
            My Basket
        </Link>
    </div>
  )
}
export default AccountGui