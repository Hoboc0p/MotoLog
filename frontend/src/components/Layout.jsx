import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export default function Layout() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.logo}>MotoLog</span>
          <nav className={styles.nav} data-testid="nav">
            <NavLink to="/" end className={navClass}>Acasă</NavLink>
            <NavLink to="/despre" className={navClass}>Despre</NavLink>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}