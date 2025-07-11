import { getCurrentUser } from "@/actions/onbording";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Onboarding - HealthCare",
  description: "Complete your profile to get started with HealthCare",
};

export default async function OnboardingLayout({ children }) {
  // Get complete user profile
  const user = await getCurrentUser();

  // Redirect users who have already completed onboarding
  if (user) {
    if (user.role === "PATIENT") {
      redirect("/doctors");
    } else if (user.role === "DOCTOR") {
      // Check verification status for doctors
      if (user.verificationStatus === "VERIFIED") {
        redirect("/doctor");
      } else {
        redirect("/doctor/verification");
      }
    } else if (user.role === "ADMIN") {
      redirect("/admin");
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 text-blue-500" style={{ textShadow: '1px 1px 2px #fff' }}>
            Welcome to Health Care
          </h1>
          <p className="text-muted-foreground text-lg">
            Tell us how you want to use the platform !!
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
