import { Link, NavLink } from 'react-router';
import { getHomeRoute, getNavRoutes } from '../routes/routes.config';
import { cn } from './ui/utils';

export function Navbar() {
  const home = getHomeRoute();
  const navRoutes = getNavRoutes();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#746f5c]/20 bg-[#0a0a0a]/85 backdrop-blur-md">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' /%3E%3C/svg%3E")',
        }}
        aria-hidden
      />
      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6"
        aria-label="Principal"
      >
        <Link
          to={home.href}
          className="group inline-flex items-center border border-[#746f5c]/40 bg-black/25 px-4 py-1.5 backdrop-blur-sm transition-colors hover:border-[#746f5c]/55 hover:bg-[#1a1a16]/50"
        >
          <span className="font-display text-xl font-semibold uppercase leading-none tracking-wide text-foreground">
            {home.navLabel}
          </span>
        </Link>

        <ul className="flex flex-wrap items-center justify-end gap-0 sm:gap-1">
          {navRoutes.map((route, i) => (
            <li key={route.id} className="flex items-center">
              {i > 0 ? (
                <span
                  className="mx-2 hidden h-4 w-px bg-[#746f5c]/30 sm:block"
                  aria-hidden
                />
              ) : null}
              <NavLink
                to={route.href}
                className={({ isActive }) =>
                  cn(
                    'rounded-sm px-2 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-all duration-300 hover:bg-primary/15 hover:text-foreground',
                    isActive && 'bg-primary/25 text-foreground',
                  )
                }
              >
                {route.navLabel}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
