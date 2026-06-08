import Link from "next/link";
import { Coffee, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}

          <div>
            <div className="flex items-center gap-2 text-2xl font-bold text-amber-500">
              <Coffee size={30} />
              HangoutHub
            </div>

            <p className="mt-4 text-sm leading-6">
              Discover the perfect cafes based on your budget,
              vibe, and mood. Whether you're studying,
              hanging out with friends, or enjoying a quiet
              coffee, HangoutHub helps you find your next
              favorite spot.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2">

              <Link href="/" className="hover:text-amber-400 transition">
                Home
              </Link>

              <Link href="/cafes" className="hover:text-amber-400 transition">
                Cafes
              </Link>

              <Link
                href="/recommendations"
                className="hover:text-amber-400 transition"
              >
                Recommendations
              </Link>

              <Link
                href="/favorites"
                className="hover:text-amber-400 transition"
              >
                Favorites
              </Link>

            </div>
          </div>

          {/* Popular Vibes */}

          <div>
            <h3 className="text-white font-semibold mb-4">
              Popular Vibes
            </h3>

            <div className="flex flex-col gap-2">

              <p>☕ Study Friendly</p>
              <p>🛋 Cozy</p>
              <p>💕 Romantic</p>
              <p>🎉 Lively</p>
              <p>💸 Budget Friendly</p>

            </div>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-white font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>support@hangouthub.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>Raipur, Chhattisgarh</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">

          <p>
            © {new Date().getFullYear()} HangoutHub. All Rights Reserved.
          </p>

          <p>
            Built with ❤️ for cafe lovers.
          </p>

        </div>

      </div>
    </footer>
  );
}