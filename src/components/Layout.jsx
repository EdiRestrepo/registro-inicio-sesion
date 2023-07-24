import { Suspense } from 'react'
import NavBar from './NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import LoadingPage from "../pages/Loading"

const Layout = () => {
  return (
      <>
          <NavBar />
          <div style={{maxWidth: 960, margin: " 0 auto"}}>
              <Suspense fallback={<LoadingPage/>}>
                  <Outlet/>
              </Suspense>
          </div>
      </>
  )
}

export default Layout;
