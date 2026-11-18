import { pairedQuiz } from './dairyQuizCore';
import type { DairyQuizSeed } from './dairyQuizCore';

/**
 * Knowledge check for Non-Alcoholic Beverages, Module 01, Lesson 1 ("What the Industry Includes").
 * `chapter` is the lesson-local chapter number, matching the five cards of NAB_DEFINITION_CARDS in order:
 * 1 What Is the Non-Alcoholic Beverage Industry?
 * 2 What Makes the Beverage Industry Unique?
 * 3 Where Does the Industry Begin and End?
 * 4 Exploring the Beverage Product Landscape
 * 5 Who Drinks What—and Why?
 * Five seeds render exactly 10 questions through the shared selectLessonQuestions helper.
 */
export const NAB_DEFINITION_CHAPTER_COUNT = 5;

export const NAB_DEFINITION_QUIZ_SEEDS: DairyQuizSeed[] = [
  {
    chapter: '1',
    objective: 'Define the non-alcoholic beverage industry by its alcohol threshold',
    question: 'What is the accepted alcohol threshold that defines a non-alcoholic beverage?',
    application: 'A commercially produced drink is being screened for a non-alcoholic beverage market study. Which alcohol-by-volume limit should the analyst apply?',
    correct: 'Below 0.5% alcohol by volume',
    wrong: ['Below 2.5% alcohol by volume', 'Exactly 0% alcohol by volume', 'Below 5% alcohol by volume'],
    explanation: 'The lesson defines a non-alcoholic beverage as a commercially produced drink with little to no alcohol, with the accepted threshold below 0.5% ABV. That single line separates the industry from beer, wine and spirits, and it does not require exactly zero alcohol.',
  },
  {
    chapter: '2',
    objective: 'Explain why packaging economics make beverages different from other consumer goods',
    question: 'Which block of a mass-market soft drink’s product cost does the lesson describe as frequently the single biggest?',
    application: 'Input prices are rising for a mass-market soft-drink maker. Which cost block does the lesson say moves margins most directly?',
    correct: 'Packaging, meaning the bottle or can',
    wrong: ['The treated water in the drink', 'Sweeteners and flavourings', 'Shop coolers and refrigeration'],
    explanation: 'The lesson notes that the liquid is cheap while the bottle or can is frequently the single biggest cost block, roughly a quarter to a third of a mass-market soft drink’s cost (International Aluminium Institute, 2024), so packaging prices move margins directly.',
  },
  {
    chapter: '3',
    objective: 'Identify which categories sit on the edge of the industry boundary',
    question: 'Which product group sits on the blurry edge of the industry, counted as a beverage by some sources and not by others?',
    application: 'Two market-size reports differ mostly because only one of them counts a product group that overlaps with another industry. Which group does the lesson cite as the classic example?',
    correct: 'Drinkable dairy, such as flavoured milk and drinkable yogurt',
    wrong: ['Bottled still water', 'Ready-to-drink tea and coffee', 'Energy and sports drinks'],
    explanation: 'Water, soft drinks, juices, RTD tea and coffee, and energy and sports drinks are clearly in scope. Drinkable dairy such as flavoured milk and drinkable yogurt is the classic blur between dairy and beverages, which is why reported market sizes range so widely: totals swing most on whether juices and dairy-based drinks are included.',
  },
  {
    chapter: '4',
    objective: 'Describe the distinctive product mix of the Vietnam beverage market',
    question: 'Which category led Vietnam’s soft-drink volume in 2023, at about 34.2%?',
    application: 'A portfolio planner checks Vietnam’s 2023 soft-drink volumes. Which category made up the largest share, about 1.594 billion of 4.658 billion litres?',
    correct: 'Ready-to-drink tea',
    wrong: ['Carbonated soft drinks', 'Bottled water', 'Energy drinks'],
    explanation: 'RTD tea was roughly 1.594 billion of 4.658 billion litres, about 34.2% of Vietnam’s soft-drink volume in 2023 (Research & Markets via GlobeNewsWire, 2024). Bottled water was around a fifth of volume and carbonated drinks were close behind, while RTD coffee was the fastest-growing category.',
  },
  {
    chapter: '5',
    objective: 'Name the motivations that drive the final beverage choice',
    question: 'Which list of purchase motivations does the lesson give for beverage choice?',
    application: 'A brand team plans research into why shoppers pick one drink over another. Which list of motivations should the research cover?',
    correct: 'Taste, availability, price, health perception and convenience',
    wrong: ['Brand age, plant capacity, retailer margin and packaging recyclability', 'Carbonation level, bottle colour, logo size and label language', 'Distributor margin, trade terms, shelf rental and delivery frequency'],
    explanation: 'The lesson names a handful of motivations behind the final choice: taste, availability (is it cold and nearby?), price, health perception and convenience. In impulse categories, availability and price can beat brand preference.',
  },
];

export const NAB_DEFINITION_QUIZ = pairedQuiz('nab-m1l1', NAB_DEFINITION_QUIZ_SEEDS);
