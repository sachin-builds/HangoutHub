import Hero from "@/components/home/Hero";
import SearchSection from "@/components/home/SearchSection";
import CafeCard from "@/components/cards/CafeCard";

export default function Home() {
  return (
    <>
      <Hero />

      <SearchSection />

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="mb-10">

          <h2 className="text-4xl font-bold">
            Featured Cafes
          </h2>

          <p className="mt-3 text-gray-600">
            Handpicked cafes for every mood.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          <CafeCard />
          <CafeCard />
          <CafeCard />

        </div>

      </section>
    </>
  );
}