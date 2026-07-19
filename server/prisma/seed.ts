import { PrismaClient, PriceRange } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.favorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.cafeVibe.deleteMany();
  await prisma.vibe.deleteMany();
  await prisma.cafe.deleteMany();
  await prisma.user.deleteMany();

  // -------------------------
  // USERS
  // -------------------------

  const password = await bcrypt.hash("password123", 10);

  const users = await prisma.user.createMany({
    data: [
      {
        name: "Sachin",
        email: "sachin@example.com",
        password,
      },
      {
        name: "Rahul",
        email: "rahul@example.com",
        password,
      },
      {
        name: "Priya",
        email: "priya@example.com",
        password,
      },
      {
        name: "Anjali",
        email: "anjali@example.com",
        password,
      },
      {
        name: "Rohit",
        email: "rohit@example.com",
        password,
      },
    ],
  });

  console.log("✅ Users Seeded");

  // -------------------------
  // VIBES
  // -------------------------

  const vibeNames = [
    "Study",
    "Cozy",
    "Romantic",
    "Outdoor",
    "Quiet",
    "Lively",
    "Work Friendly",
    "Pet Friendly",
  ];

  for (const name of vibeNames) {
    await prisma.vibe.create({
      data: { name },
    });
  }

  console.log("✅ Vibes Seeded");

  // -------------------------
  // CAFES
  // -------------------------

  const cafes = [
    {
      name: "Brew & Books",
      city: "Raipur",
      address: "Civil Lines",
      description: "Best study cafe.",
      latitude: 21.2514,
      longitude: 81.6296,
      imageUrl:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      averageCost: 250,
      wifi: true,
      isOpen: true,
      openingTime: "09:00 AM",
      closingTime: "11:00 PM",
      priceRange: PriceRange.LOW,
    },

    {
      name: "Urban Brew",
      city: "Delhi",
      address: "Connaught Place",
      description: "Premium coffee experience.",
      latitude: 28.6315,
      longitude: 77.2167,
      imageUrl:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      averageCost: 700,
      wifi: true,
      isOpen: true,
      openingTime: "08:00 AM",
      closingTime: "10:00 PM",
      priceRange: PriceRange.PREMIUM,
    },

    {
      name: "Cafe Connect",
      city: "Bangalore",
      address: "Indiranagar",
      description: "Perfect for remote work.",
      latitude: 12.9716,
      longitude: 77.5946,
      imageUrl:
        "https://images.unsplash.com/photo-1521017432531-fbd92d768814",
      averageCost: 450,
      wifi: true,
      isOpen: true,
      openingTime: "09:00 AM",
      closingTime: "09:00 PM",
      priceRange: PriceRange.MID,
    },

    {
      name: "Tea Trails",
      city: "Hyderabad",
      address: "Banjara Hills",
      description: "Tea and snacks.",
      latitude: 17.385,
      longitude: 78.4867,
      imageUrl:
        "https://images.unsplash.com/photo-1511920170033-f8396924c348",
      averageCost: 300,
      wifi: false,
      isOpen: true,
      openingTime: "10:00 AM",
      closingTime: "11:00 PM",
      priceRange: PriceRange.LOW,
    },

    {
      name: "Midnight Coffee",
      city: "Mumbai",
      address: "Bandra",
      description: "Open late night.",
      latitude: 19.076,
      longitude: 72.8777,
      imageUrl:
        "https://images.unsplash.com/photo-1445116572660-236099ec97a0",
      averageCost: 650,
      wifi: true,
      isOpen: true,
      openingTime: "05:00 PM",
      closingTime: "03:00 AM",
      priceRange: PriceRange.PREMIUM,
    }
  ];

  for (const cafe of cafes) {
    await prisma.cafe.create({
      data: cafe,
    });
  }

  console.log("✅ Cafes Seeded");

  console.log("🎉 Part 1 Complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });