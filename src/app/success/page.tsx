import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-[var(--clr-bg)]">
      <div className="max-w-xl w-full text-center bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-2xl p-10 shadow-sm">
        <h1 className="text-4xl font-display font-bold text-[var(--clr-text)] mb-3">
          Thank you for your purchase!
        </h1>
        <p className="text-[var(--clr-text-muted)] mb-8">
          Your order has been received. A confirmation will be sent to your
          email.
        </p>
        <Link
          href="/"
          className="bg-[var(--clr-button)] text-white px-6 py-3 rounded-full hover:bg-[var(--clr-button-hover)] transition-colors font-medium inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return Home
        </Link>
      </div>
    </main>
  );
}
