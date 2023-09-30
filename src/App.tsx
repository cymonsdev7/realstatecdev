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
import { CadastroSliders } from "./pages/cadastrosliders";
import { Categorias } from "./pages/categorias";
import { Contato } from "./pages/contato";
import { CasasProperties } from "./pages/casas";
import { AptoProperties } from "./pages/apartamentos";
import { LotesProperties } from "./pages/lotes";
import { RuralProperties } from "./pages/rural";
import { PropriedadesCasas } from "./pages/propriedadescasas";
import { PropriedadesApartamentos } from "./pages/propriedadesapartamentos";
import { PropriedadesLotes } from "./pages/propriedadeslotes";
import { PropriedadesRural } from "./pages/propriedadesrural";


const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/details/:id',
        element: <PropertyDetails/>
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
        path: '/casas',
        element: <Private><CasasProperties/></Private>
      },
      {
        path: '/apartamentos',
        element: <Private><AptoProperties/></Private>
      },
      {
        path: '/rural',
        element: <Private><RuralProperties/></Private>
      },
      {
        path: '/lotes',
        element: <Private><LotesProperties/></Private>
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
        path: '/cadastrosliders',
        element: <CadastroSliders/>
      },
      {
        path: '/categorias',
        element: <Categorias/>
      },
      {
        path: '/propriedadescasas',
        element: <PropriedadesCasas/>
      },
      {
        path: '/propriedadesapartamentos',
        element: <PropriedadesApartamentos/>
      },
      {
        path: '/propriedadeslotes',
        element: <PropriedadesLotes/>
      },
      {
        path: '/propriedadesrural',
        element: <PropriedadesRural/>
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
