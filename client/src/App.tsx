import { Switch, Route } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Home } from "@/pages/Home";
import { Services } from "@/pages/Services";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { CaseStudies } from "@/pages/CaseStudies";
import { EnterpriseApps } from "@/pages/enterprise/EnterpriseApps";
import { CRM } from "@/pages/enterprise/CRM";
import { OnboardingTour } from "@/components/onboarding/OnboardingTour";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <OnboardingTour />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/case-studies" component={CaseStudies} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/enterprise" component={EnterpriseApps} />
          <Route path="/enterprise/crm" component={CRM} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
