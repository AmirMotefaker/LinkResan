import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پلن‌ها و قیمت‌ها",
  description: "پلن‌های کوتاه‌کننده لینک لینک رسان. از پلن رایگان شروع کنید و با پلن حرفه‌ای از دامنه اختصاصی و امکانات پیشرفته لذت ببرید.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}