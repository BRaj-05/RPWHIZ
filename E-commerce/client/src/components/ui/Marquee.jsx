export default function Marquee() {
  return (
    <div className="bg-black text-white overflow-hidden">
      <div className="whitespace-nowrap animate-marquee flex gap-12 py-3 text-sm tracking-wide">

        <span>Free shipping on orders above ₹499</span>
        <span className="text-red-500">◆</span>
        <span>New arrivals every Friday</span>
        <span className="text-red-500">◆</span>
        <span>Razorpay & Stripe secure payments</span>
        <span className="text-red-500">◆</span>
        <span>7-day easy returns</span>
        <span className="text-red-500">◆</span>

        {/* duplicate for smooth loop */}
        <span>Free shipping on orders above ₹499</span>
        <span className="text-red-500">◆</span>
        <span>New arrivals every Friday</span>
        <span className="text-red-500">◆</span>
        <span>Razorpay & Stripe secure payments</span>
        <span className="text-red-500">◆</span>
        <span>7-day easy returns</span>
        <span className="text-red-500">◆</span>

      </div>
    </div>
  );
}