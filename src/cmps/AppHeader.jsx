import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

export function AppHeader() {

    const toys = useSelector((storeState) => storeState.toys)


    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Toys App</h1>

                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>

                </nav>
            </section>
        </header>
    )
}
