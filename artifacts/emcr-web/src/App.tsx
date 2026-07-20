import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
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
import TedaviEndikasyonlari from "@/pages/TedaviEndikasyonlari";
import BasindaBiz from "@/pages/BasindaBiz";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/hakkimizda" component={Hakkimizda} />
      <Route path="/urunler/neogen-plasma" component={NeoGenPlasma} />
      <Route path="/urunler/ultraclear" component={UltraClearPage} />
      <Route path="/etkinliklerimiz" component={Etkinliklerimiz} />
      <Route path="/basinda-biz" component={BasindaBiz} />
      <Route path="/basinda-biz/sosyal-medyada-biz" component={SosyalMedyada} />
      <Route path="/teknik-destek" component={TeknikDestek} />
      <Route path="/tedavi-endikasyonlari" component={TedaviEndikasyonlari} />
      <Route component={NotFound} />
    </Switch>
    </>
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
