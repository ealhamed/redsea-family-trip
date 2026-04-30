import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, MapPin } from "lucide-react";
import { useLocation } from "wouter";

/**
 * Design philosophy: Red Sea Coral Atlas.
 * Even fallback pages should feel coastal, private, and family-ready: warm sand base,
 * reef turquoise/coral accents, deep sea contrast, and a direct route back to the trip command center.
 */
export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[radial-gradient(circle_at_20%_12%,rgba(25,169,184,0.22),transparent_28rem),radial-gradient(circle_at_88%_24%,rgba(231,83,63,0.14),transparent_24rem),linear-gradient(135deg,#fff3d8,#dff7f4)] p-4 text-[#073b4c]">
      <Card className="mx-4 w-full max-w-lg border-[#19a9b8]/25 bg-[#fff3d8]/85 text-[#073b4c] shadow-2xl backdrop-blur">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#19a9b8]/15">
              <div className="absolute inset-0 rounded-full bg-[#79d7db]/25 animate-pulse" />
              <MapPin className="relative h-8 w-8 text-[#e7533f]" />
            </div>
          </div>

          <h1 className="mb-2 font-serif text-5xl font-bold text-[#073b4c]">404</h1>

          <h2 className="mb-4 text-xl font-semibold text-[#0b6f8f]">
            Route not on the island map
          </h2>

          <p className="mb-8 leading-relaxed text-[#073b4c]/70">
            This page is not part of the family trip plan.
            <br />
            Head back to the Red Sea command center.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              onClick={() => setLocation("/")}
              className="bg-[#e7533f] px-6 py-2.5 text-[#fff3d8] shadow-md transition-all duration-200 hover:bg-[#b62f2a] hover:shadow-lg"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to trip plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
