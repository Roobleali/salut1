import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock, FileText, Mail, Cookie } from "lucide-react";

export default function Compliance() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#9747FF] via-[#8A43E6] to-[#6E35B9] bg-clip-text text-transparent">
            Privacy & Compliance
          </h1>
          <p className="text-lg text-muted-foreground">
            We are committed to protecting your privacy and ensuring compliance with GDPR regulations
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle>GDPR Compliance Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                At Salut Enterprise, we take data protection seriously. We process personal data in accordance with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>EU General Data Protection Regulation (GDPR)</li>
                <li>Romanian Data Protection Law (Law no. 190/2018)</li>
                <li>Applicable EU member state legislation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-primary" />
                <CardTitle>Data Security Measures</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We implement appropriate technical and organizational measures to ensure data security:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>End-to-end encryption for sensitive data transmission</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access control and authentication mechanisms</li>
                <li>Secure data centers within the EU</li>
                <li>Regular staff training on data protection</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <CardTitle>Your Rights Under GDPR</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Right to Access</h3>
                  <p className="text-muted-foreground">
                    You can request information about your personal data we process
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Right to Rectification</h3>
                  <p className="text-muted-foreground">
                    You can request corrections to your personal data
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Right to Erasure</h3>
                  <p className="text-muted-foreground">
                    You can request deletion of your personal data
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Right to Data Portability</h3>
                  <p className="text-muted-foreground">
                    You can request transfer of your personal data
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Cookie className="h-6 w-6 text-primary" />
                <CardTitle>Cookie Policy</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We use cookies and similar technologies for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Essential website functionality</li>
                <li>Authentication and security</li>
                <li>Performance monitoring</li>
                <li>User preferences</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                You can manage your cookie preferences through your browser settings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                <CardTitle>Contact Our DPO</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                For any privacy-related inquiries or to exercise your rights under GDPR, contact our Data Protection Officer:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">Email: privacy@saluttech.ro</p>
                <p className="text-sm text-muted-foreground mt-2">
                  We will respond to your request within 30 days as required by GDPR
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
