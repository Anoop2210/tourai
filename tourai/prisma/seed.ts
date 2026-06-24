import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.destination.upsert({
    where: { slug: "goa-trip-cost" },
    update: {},
    create: {
      slug: "goa-trip-cost",
      name: "Goa",
      country: "India",
      heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200",
      summary: "Goa offers sun-soaked beaches, vibrant nightlife, and a relaxed budget for every type of traveler.",
      attractions: [
        { name: "Baga Beach", desc: "Popular beach with water sports and beach shacks." },
        { name: "Fort Aguada", desc: "17th-century Portuguese fort with great sunset views." },
      ],
      costs: [
        { label: "Flight (round trip)", amount: 6000 },
        { label: "3-star hotel (per night)", amount: 1800 },
        { label: "Food (per day)", amount: 800 },
      ],
      hotels: [
        { name: "Sea Breeze Resort", pricePerNight: 1800, rating: 4 },
        { name: "Calangute Residency", pricePerNight: 2200, rating: 4.2 },
      ],
      food: [
        { dish: "Goan Fish Curry", price: 250 },
        { dish: "Bebinca", price: 150 },
      ],
      faq: [
        { q: "What is the best time to visit Goa?", a: "November to February offers the most pleasant weather." },
        { q: "Is Goa budget-friendly?", a: "Yes, a 4-day trip can be planned for as low as ₹8,000 per person." },
      ],
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: "5-budget-tips-for-goa" },
    update: {},
    create: {
      slug: "5-budget-tips-for-goa",
      title: "5 Budget Tips for Your Goa Trip",
      excerpt: "Stretch your rupees further on your next Goa getaway.",
      content: "1. Travel by train instead of flight.\n2. Stay in North Goa hostels.\n3. Eat at local shacks.\n4. Rent a scooter instead of cabs.\n5. Visit free beaches and forts.",
    },
  });

  console.log("Seed completed.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
