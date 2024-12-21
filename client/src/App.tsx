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
import { Sales } from "@/pages/enterprise/Sales";
import { Purchase } from "@/pages/enterprise/Purchase";
import { Manufacturing } from "@/pages/industries/Manufacturing";
import { RealEstate } from "@/pages/industries/RealEstate";
import { Retail } from "@/pages/industries/Retail";
import { Education } from "@/pages/industries/Education";
import { Services as IndustryServices } from "@/pages/industries/Services";
import { Hospitality } from "@/pages/industries/Hospitality";
import { OnboardingTour } from "@/components/onboarding/OnboardingTour";
import { Glossary } from "@/pages/Glossary";
import { GradientCustomizerPage } from "@/pages/GradientCustomizer";
import { Industries } from "@/pages/Industries";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/case-studies" component={CaseStudies} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          
          {/* Enterprise Routes */}
          <Route path="/enterprise" component={EnterpriseApps} />
          <Route path="/enterprise/crm" component={CRM} />
          <Route path="/enterprise/sales" component={Sales} />
          <Route path="/enterprise/purchase" component={Purchase} />
          
          {/* Industry Routes */}
          <Route path="/industries" component={Industries} />
          <Route path="/industries/manufacturing" component={Manufacturing} />
          <Route path="/industries/real-estate" component={RealEstate} />
          <Route path="/industries/retail" component={Retail} />
          <Route path="/industries/education" component={Education} />
          <Route path="/industries/services" component={IndustryServices} />
          <Route path="/industries/hospitality" component={Hospitality} />
          
          {/* Glossary Route */}
          <Route path="/glossary" component={Glossary} />
          
          {/* Gradient Customizer Route */}
          <Route path="/gradients" component={GradientCustomizerPage} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
