import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { PropertyDetails } from "./pages/details";

import { Layout } from "./components/layout";
import { NewProperty } from "./pages/dashboard/new";
import { Private } from "./routes/Private";
import { SobreNos } from "./pages/sobre";

import { Category } from "./pages/categorias";
import { Contato } from "./pages/contato";
import { HousesPropertiesRegister } from "./pages/casasregister/HousesPropertiesRegister";
import { BuildsPropertiesRegister } from "./pages/apartamentosregister/BuildsPropertiesRegister";
import { Houses } from "./pages/dashboard/houses";
import { PageStart } from "./pages/paginainicial";
import { DetalhesCasas } from "./pages/detalhescasas";
import { PlacesPropertiesRegister } from "./pages/lotesregister/PlacesPropertiesRegister";
import { FarmsPropertiesRegister } from "./pages/ruraisregister/FarmPropertiesRegister";
import { PropriedadesCasas } from "./pages/propriedadescasas/PropriedadesCasas";
import { PropriedadesAptos } from "./pages/propriedadesapartamentos/PropriedadesAptos";
import { DetalhesAptos } from "./pages/detalhesaptos";
import { PropriedadesLotes } from "./pages/propriedadeslotes/PropriedadesLotes";
import { DetalhesLotes } from "./pages/detalheslotes";
import { PropriedadesRurais } from "./pages/propriedadesrurais/PropriedadesRurais";
import { DetalhesRurais } from "./pages/detalhesrurais";
import { AllPropertiesRemax } from "./pages/todosimoveis";
import { SlidersRegister } from "./pages/bannersweb";






const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/todosimoveis',
        element: <AllPropertiesRemax/>
      },
      {
        path: '/propriedadescasas',
        element: <PropriedadesCasas/>
      },
      {
        path: '/propriedadesapartamentos',
        element: <PropriedadesAptos/>
      },
      {
        path: '/propriedadeslotes',
        element: <PropriedadesLotes/>
      },
      {
        path: '/propriedadesrurais',
        element: <PropriedadesRurais/>
      },



      {
        path: '/details/:id',
        element: <PropertyDetails/>
      },
      {
        path: '/detalhescasas/:id',
        element: <DetalhesCasas/>
      },
      {
        path: '/detalhesaptos/:id',
        element: <DetalhesAptos/>
      },
      {
        path: '/detalheslotes/:id',
        element: <DetalhesLotes/>
      },
      {
        path: '/detalhesrurais/:id',
        element: <DetalhesRurais/>
      },





      {
        path: '/dashboard',
        element: <Private><Dashboard/></Private>
      },
      {
        path: 'dashboard/new',
        element: <Private><NewProperty/></Private>
      },
      {
        path: 'dashboard/houses',
        element: <Private><Houses/></Private>
      },
      {
        path: 'bannersweb',
        element: <Private><SlidersRegister/></Private>
      },





      {
        path: 'casasregister',
        element: <Private><HousesPropertiesRegister/></Private>
      },
      {
        path: 'apartamentosregister',
        element: <Private><BuildsPropertiesRegister/></Private>
      },
      {
        path: 'lotesregister',
        element: <Private><PlacesPropertiesRegister/></Private>
      },
      {
        path: 'ruraisregister',
        element: <Private><FarmsPropertiesRegister/></Private>
      },




      {
        path: '/sobre',
        element: <SobreNos/>
      },
      {
        path: '/contato',
        element: <Contato/>
      },

      {
        path: '/categorias',
        element: <Category/>
      },
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])

export {router}
