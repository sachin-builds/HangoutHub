import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GoogleGenAI } from '@google/genai';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RecommendationsService {
  private ai: GoogleGenAI;

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    this.ai = new GoogleGenAI({
      apiKey: this.config.get<string>('GEMINI_API_KEY')!,
    });
  }

  async recommend(prompt: string) {
    const cafes = await this.prisma.cafe.findMany({
      include: {
        reviews: true,
      },
    });

    const cafeData = cafes.map((cafe) => ({
      id: cafe.id,
      name: cafe.name,
      city: cafe.city,
      address: cafe.address,
      description: cafe.description,
      wifi: cafe.wifi,
      priceRange: cafe.priceRange,
      averageCost: cafe.averageCost,
      isOpen: cafe.isOpen,
    }));

    const fullPrompt = `
You are an AI cafe recommendation assistant.

Available cafes:

${JSON.stringify(cafeData, null, 2)}

User request:

"${prompt}"

Recommend the best cafes.

Return ONLY valid JSON.

Example:

[
 {
   "id":"",
   "reason":"..."
 }
]
`;

    const result = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });

    const text = result.text ?? '[]';

    return JSON.parse(
      text.replace(/```json|```/g, '').trim(),
    );
  }
}