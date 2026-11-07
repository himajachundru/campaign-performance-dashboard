
import { NavLink } from 'react-router'

function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>Campaign Insights</h2>

            <nav aria-label="Main navigation">
                <NavLink to="/overview">
                    Overview
                </NavLink>

                <NavLink to="/performance">
                    Performance
                </NavLink>
            </nav>
        </aside>
    )
}

export default Sidebar
