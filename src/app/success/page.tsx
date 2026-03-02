import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SuccessPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center bg-[var(--clr-surface)]/60 backdrop-blur-sm border border-[var(--clr-primary)]/20 rounded-2xl p-8">
        <h1 className="text-3xl font-display font-bold text-[var(--clr-text)] mb-3">
          Thank you for your purchase!
        </h1>
        <p className="text-[var(--clr-text-muted)] mb-8">
          Your order has been received. A confirmation will be sent to your
          email.
        </p>
        <Link
          href="/"
          className="bg-[var(--clr-accent)] text-[var(--clr-surface)] px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-medium inline-flex items-center uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return Home
        </Link>
      </div>
    </main>
  );
}
