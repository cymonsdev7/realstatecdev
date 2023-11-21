import React from 'react'
import { PropertySellLandingPage } from '../../components/PropertySellLandingPage'
import { Header } from '../../components/header'
import DropDownClient from '../../components/dropdowncliente'
import { TopHeaderLandingPagesLeads } from '../../components/TopHeaderLandingPageLeads'

export const PropertySell = () => {
  return (
    <>
      <div className=''>
        <TopHeaderLandingPagesLeads/>
        <PropertySellLandingPage />
      </div><hr />
    </>
  )
}
