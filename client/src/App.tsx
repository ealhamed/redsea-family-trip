import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ScheduleCommand from "./pages/ScheduleCommand";

/**
 * Design philosophy: Red Sea Coral Atlas.
 * App-level structure should keep the experience focused, private, coastal, and family-ready:
 * a single clear command center, warm sand base, reef turquoise/coral accents, and no financial information.
 */

const repositoryBasePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function Router() {
  return (
    <WouterRouter base={repositoryBasePath || undefined}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/schedule"} component={ScheduleCommand} />
        <Route path={"/schedule/"} component={ScheduleCommand} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
