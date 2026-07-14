import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Hakkimizda from "@/pages/Hakkimizda";
import NeoGenPlasma from "@/pages/NeoGenPlasma";
import UltraClearPage from "@/pages/UltraClearPage";
import Etkinliklerimiz from "@/pages/Etkinliklerimiz";
import SosyalMedyada from "@/pages/SosyalMedyada";
import TeknikDestek from "@/pages/TeknikDestek";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/hakkimizda" component={Hakkimizda} />
      <Route path="/urunler/neogen-plasma" component={NeoGenPlasma} />
      <Route path="/urunler/ultraclear" component={UltraClearPage} />
      <Route path="/etkinliklerimiz" component={Etkinliklerimiz} />
      <Route path="/basinda-biz/sosyal-medyada-biz" component={SosyalMedyada} />
      <Route path="/teknik-destek" component={TeknikDestek} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster theme="dark" position="top-center" richColors />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
