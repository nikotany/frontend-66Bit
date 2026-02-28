import { Outlet } from "react-router"
import Header from "~/components/Header"
import Navigation from "~/components/Navigation"

const LayoutPages = () => {
    return(
        <>
            <Header/>
            <Navigation />
            <Outlet />
        </>
    )
}

export default LayoutPages