import { useState, useEffect } from "react";
import Joyride, { Step, STATUS } from "react-joyride";
import { useLocalStorage } from "@/hooks/use-local-storage";

const tourSteps: Step[] = [
  {
    target: "body",
    content: "Welcome to SalutTech! Let's take a quick tour of our platform.",
    placement: "center",
    disableBeacon: true,
  },
  {
    target: ".nav-services",
    content: "Explore our comprehensive suite of enterprise solutions, from HORECA to Manufacturing.",
    placement: "bottom",
  },
  {
    target: "#horeca",
    content: "Check out our HORECA solutions that help streamline restaurant and hotel operations.",
    placement: "left",
  },
  {
    target: "#manufacturing",
    content: "Discover how our manufacturing solutions can optimize your production processes.",
    placement: "right",
  },
  {
    target: ".case-studies-section",
    content: "Read success stories from businesses that have transformed with SalutTech.",
    placement: "top",
  },
  {
    target: ".contact-sales",
    content: "Ready to transform your business? Get in touch with our sales team!",
    placement: "bottom",
  },
];

export function OnboardingTour() {
  const [run, setRun] = useState(false);
  const [hasSeenTour, setHasSeenTour] = useLocalStorage("has-seen-tour", false);

  useEffect(() => {
    if (!hasSeenTour) {
      setRun(true);
    }
  }, [hasSeenTour]);

  const handleTourCallback = (data: any) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setHasSeenTour(true);
    }
  };

  return (
    <Joyride
      steps={tourSteps}
      run={run}
      continuous
      showProgress
      showSkipButton
      callback={handleTourCallback}
      styles={{
        options: {
          primaryColor: "hsl(var(--primary))",
          textColor: "hsl(var(--foreground))",
          backgroundColor: "hsl(var(--background))",
        },
      }}
    />
  );
}
