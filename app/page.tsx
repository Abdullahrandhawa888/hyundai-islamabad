import { DealerIntro } from "@/components/home/DealerIntro";
import { ElectricBanner } from "@/components/home/ElectricBanner";
import { FeatureTiles } from "@/components/home/FeatureTiles";
import { HeroSlider } from "@/components/home/HeroSlider";
import { ModelRange } from "@/components/home/ModelRange";
import { NewsStrip } from "@/components/home/NewsStrip";
import { QuickActions } from "@/components/home/QuickActions";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeatureTiles />
      <ModelRange />
      <ElectricBanner />
      <DealerIntro />
      <QuickActions />
      <NewsStrip />
    </>
  );
}
