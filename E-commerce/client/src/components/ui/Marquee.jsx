/* -------------------------------------------------------
   ANNOUNCEMENT MARQUEE
-------------------------------------------------------- */
export default function Marquee() {
  const items = [
    "Free shipping above ₹999",
    "New arrivals every Friday",
    "Secure payments with Razorpay",
    "Premium packaging included",
    "Easy 7-day returns",
  ];

  return (
    <div className="bg-black text-white overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap py-3 text-sm tracking-wide">
        {[...items, ...items].map((item, index) => (
          <span key={index} className="mx-6 flex items-center gap-6">
            <span>{item}</span>
            <span className="text-red-500">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}