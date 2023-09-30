
import { FooterTwo } from "../footer/footerTwo"
import { GoToTop } from "../gototop"
import { Header } from "../header"
import { Outlet } from "react-router-dom"
import { HeaderPrincipal } from "../headerprincipal"
import MenuResponsiveOne from "../menuresponsivo"

export const Layout = () => {
    return (
      <>


        <Header/>
        <Outlet/>
        <GoToTop/>
        <FooterTwo/>
      </>
    )
  }
