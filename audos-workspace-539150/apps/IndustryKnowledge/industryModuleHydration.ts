import type { ReactNode } from 'react';
import { applyReviewHolds } from './reviewHolds';

type AnyMap = Record<string, any>;
type LessonRow = any;
type VisualRenderer = (kind: any) => ReactNode;

const emptyVisual: VisualRenderer = () => null;

export const NAB_MODULE02_DECKS: AnyMap = {};
export const NAB_MODULE02_QUIZZES: AnyMap = {};
export const NAB_MODULE02_TAKEAWAYS: AnyMap = {};
export const NAB_MODULE03_DECKS: AnyMap = {};
export const NAB_MODULE03_QUIZZES: AnyMap = {};
export const NAB_MODULE03_TAKEAWAYS: AnyMap = {};
export const NAB_MODULE04_DECKS: AnyMap = {};
export const NAB_MODULE04_QUIZZES: AnyMap = {};
export const NAB_MODULE04_TAKEAWAYS: AnyMap = {};
export const NAB_MODULE05_DECKS: AnyMap = {};
export const NAB_MODULE05_QUIZZES: AnyMap = {};
export const NAB_MODULE05_TAKEAWAYS: AnyMap = {};

export const BEER_MODULE01_DECKS: AnyMap = {};
export const BEER_MODULE01_QUIZZES: AnyMap = {};
export const BEER_MODULE01_TAKEAWAYS: AnyMap = {};
export const BEER_MODULE02_DECKS: AnyMap = {};
export const BEER_MODULE02_QUIZZES: AnyMap = {};
export const BEER_MODULE02_TAKEAWAYS: AnyMap = {};
export const BEER_MODULE03_DECKS: AnyMap = {};
export const BEER_MODULE03_QUIZZES: AnyMap = {};
export const BEER_MODULE03_TAKEAWAYS: AnyMap = {};
export const BEER_MODULE04_DECKS: AnyMap = {};
export const BEER_MODULE04_QUIZZES: AnyMap = {};
export const BEER_MODULE04_TAKEAWAYS: AnyMap = {};
export const BEER_MODULE05_DECKS: AnyMap = {};
export const BEER_MODULE05_QUIZZES: AnyMap = {};
export const BEER_MODULE05_TAKEAWAYS: AnyMap = {};

export const PACKAGED_FOOD_MODULE01_DECKS: AnyMap = {};
export const PACKAGED_FOOD_MODULE01_QUIZZES: AnyMap = {};
export const PACKAGED_FOOD_MODULE01_TAKEAWAYS: AnyMap = {};
export const PACKAGED_FOOD_MODULE02_DECKS: AnyMap = {};
export const PACKAGED_FOOD_MODULE02_QUIZZES: AnyMap = {};
export const PACKAGED_FOOD_MODULE02_TAKEAWAYS: AnyMap = {};
export const PACKAGED_FOOD_MODULE03_DECKS: AnyMap = {};
export const PACKAGED_FOOD_MODULE03_QUIZZES: AnyMap = {};
export const PACKAGED_FOOD_MODULE03_TAKEAWAYS: AnyMap = {};
export const PACKAGED_FOOD_MODULE04_DECKS: AnyMap = {};
export const PACKAGED_FOOD_MODULE04_QUIZZES: AnyMap = {};
export const PACKAGED_FOOD_MODULE04_TAKEAWAYS: AnyMap = {};
export const PACKAGED_FOOD_MODULE05_DECKS: AnyMap = {};
export const PACKAGED_FOOD_MODULE05_QUIZZES: AnyMap = {};
export const PACKAGED_FOOD_MODULE05_TAKEAWAYS: AnyMap = {};

export const FASHION_MODULE01_DECKS: AnyMap = {};
export const FASHION_MODULE01_QUIZZES: AnyMap = {};
export const FASHION_MODULE01_TAKEAWAYS: AnyMap = {};
export const FASHION_MODULE02_DECKS: AnyMap = {};
export const FASHION_MODULE02_QUIZZES: AnyMap = {};
export const FASHION_MODULE02_TAKEAWAYS: AnyMap = {};
export const FASHION_MODULE03_DECKS: AnyMap = {};
export const FASHION_MODULE03_QUIZZES: AnyMap = {};
export const FASHION_MODULE03_TAKEAWAYS: AnyMap = {};
export const FASHION_MODULE04_DECKS: AnyMap = {};
export const FASHION_MODULE04_QUIZZES: AnyMap = {};
export const FASHION_MODULE04_TAKEAWAYS: AnyMap = {};
export const FASHION_MODULE05_DECKS: AnyMap = {};
export const FASHION_MODULE05_QUIZZES: AnyMap = {};
export const FASHION_MODULE05_TAKEAWAYS: AnyMap = {};

export const GROCERY_MODULE01_DECKS: AnyMap = {};
export const GROCERY_MODULE01_QUIZZES: AnyMap = {};
export const GROCERY_MODULE01_TAKEAWAYS: AnyMap = {};
export const GROCERY_MODULE02_DECKS: AnyMap = {};
export const GROCERY_MODULE02_QUIZZES: AnyMap = {};
export const GROCERY_MODULE02_TAKEAWAYS: AnyMap = {};
export const GROCERY_MODULE03_DECKS: AnyMap = {};
export const GROCERY_MODULE03_QUIZZES: AnyMap = {};
export const GROCERY_MODULE03_TAKEAWAYS: AnyMap = {};
export const GROCERY_MODULE04_DECKS: AnyMap = {};
export const GROCERY_MODULE04_QUIZZES: AnyMap = {};
export const GROCERY_MODULE04_TAKEAWAYS: AnyMap = {};
export const GROCERY_MODULE05_DECKS: AnyMap = {};
export const GROCERY_MODULE05_QUIZZES: AnyMap = {};
export const GROCERY_MODULE05_TAKEAWAYS: AnyMap = {};

export const PHARMACY_MODULE01_DECKS: AnyMap = {};
export const PHARMACY_MODULE01_QUIZZES: AnyMap = {};
export const PHARMACY_MODULE01_TAKEAWAYS: AnyMap = {};
export const PHARMACY_MODULE02_DECKS: AnyMap = {};
export const PHARMACY_MODULE02_QUIZZES: AnyMap = {};
export const PHARMACY_MODULE02_TAKEAWAYS: AnyMap = {};
export const PHARMACY_MODULE03_DECKS: AnyMap = {};
export const PHARMACY_MODULE03_QUIZZES: AnyMap = {};
export const PHARMACY_MODULE03_TAKEAWAYS: AnyMap = {};
export const PHARMACY_MODULE04_DECKS: AnyMap = {};
export const PHARMACY_MODULE04_QUIZZES: AnyMap = {};
export const PHARMACY_MODULE04_TAKEAWAYS: AnyMap = {};
export const PHARMACY_MODULE05_DECKS: AnyMap = {};
export const PHARMACY_MODULE05_QUIZZES: AnyMap = {};
export const PHARMACY_MODULE05_TAKEAWAYS: AnyMap = {};

export const COFFEE_MODULE01_DECKS: AnyMap = {};
export const COFFEE_MODULE01_QUIZZES: AnyMap = {};
export const COFFEE_MODULE01_TAKEAWAYS: AnyMap = {};
export const COFFEE_MODULE02_DECKS: AnyMap = {};
export const COFFEE_MODULE02_QUIZZES: AnyMap = {};
export const COFFEE_MODULE02_TAKEAWAYS: AnyMap = {};
export const COFFEE_MODULE03_DECKS: AnyMap = {};
export const COFFEE_MODULE03_QUIZZES: AnyMap = {};
export const COFFEE_MODULE03_TAKEAWAYS: AnyMap = {};
export const COFFEE_MODULE04_DECKS: AnyMap = {};
export const COFFEE_MODULE04_QUIZZES: AnyMap = {};
export const COFFEE_MODULE04_TAKEAWAYS: AnyMap = {};
export const COFFEE_MODULE05_DECKS: AnyMap = {};
export const COFFEE_MODULE05_QUIZZES: AnyMap = {};
export const COFFEE_MODULE05_TAKEAWAYS: AnyMap = {};

export const ENT_MODULE01_DECKS: AnyMap = {};
export const ENT_MODULE01_QUIZZES: AnyMap = {};
export const ENT_MODULE01_TAKEAWAYS: AnyMap = {};
export const ENT_MODULE02_DECKS: AnyMap = {};
export const ENT_MODULE02_QUIZZES: AnyMap = {};
export const ENT_MODULE02_TAKEAWAYS: AnyMap = {};
export const ENT_MODULE03_DECKS: AnyMap = {};
export const ENT_MODULE03_QUIZZES: AnyMap = {};
export const ENT_MODULE03_TAKEAWAYS: AnyMap = {};
export const ENT_MODULE04_DECKS: AnyMap = {};
export const ENT_MODULE04_QUIZZES: AnyMap = {};
export const ENT_MODULE04_TAKEAWAYS: AnyMap = {};
export const ENT_MODULE05_DECKS: AnyMap = {};
export const ENT_MODULE05_QUIZZES: AnyMap = {};
export const ENT_MODULE05_TAKEAWAYS: AnyMap = {};

export const ECOM_MODULE01_DECKS: AnyMap = {};
export const ECOM_MODULE01_QUIZZES: AnyMap = {};
export const ECOM_MODULE01_TAKEAWAYS: AnyMap = {};
export const ECOM_MODULE02_DECKS: AnyMap = {};
export const ECOM_MODULE02_QUIZZES: AnyMap = {};
export const ECOM_MODULE02_TAKEAWAYS: AnyMap = {};
export const ECOM_MODULE03_DECKS: AnyMap = {};
export const ECOM_MODULE03_QUIZZES: AnyMap = {};
export const ECOM_MODULE03_TAKEAWAYS: AnyMap = {};
export const ECOM_MODULE04_DECKS: AnyMap = {};
export const ECOM_MODULE04_QUIZZES: AnyMap = {};
export const ECOM_MODULE04_TAKEAWAYS: AnyMap = {};
export const ECOM_MODULE05_DECKS: AnyMap = {};
export const ECOM_MODULE05_QUIZZES: AnyMap = {};
export const ECOM_MODULE05_TAKEAWAYS: AnyMap = {};

export const GAMING_MODULE01_DECKS: AnyMap = {};
export const GAMING_MODULE01_QUIZZES: AnyMap = {};
export const GAMING_MODULE01_TAKEAWAYS: AnyMap = {};
export const GAMING_MODULE02_DECKS: AnyMap = {};
export const GAMING_MODULE02_QUIZZES: AnyMap = {};
export const GAMING_MODULE02_TAKEAWAYS: AnyMap = {};
export const GAMING_MODULE03_DECKS: AnyMap = {};
export const GAMING_MODULE03_QUIZZES: AnyMap = {};
export const GAMING_MODULE03_TAKEAWAYS: AnyMap = {};
export const GAMING_MODULE04_DECKS: AnyMap = {};
export const GAMING_MODULE04_QUIZZES: AnyMap = {};
export const GAMING_MODULE04_TAKEAWAYS: AnyMap = {};
export const GAMING_MODULE05_DECKS: AnyMap = {};
export const GAMING_MODULE05_QUIZZES: AnyMap = {};
export const GAMING_MODULE05_TAKEAWAYS: AnyMap = {};

export const ELECTRONICS_MODULE01_DECKS: AnyMap = {};
export const ELECTRONICS_MODULE01_QUIZZES: AnyMap = {};
export const ELECTRONICS_MODULE01_TAKEAWAYS: AnyMap = {};
export const ELECTRONICS_MODULE02_DECKS: AnyMap = {};
export const ELECTRONICS_MODULE02_QUIZZES: AnyMap = {};
export const ELECTRONICS_MODULE02_TAKEAWAYS: AnyMap = {};
export const ELECTRONICS_MODULE03_DECKS: AnyMap = {};
export const ELECTRONICS_MODULE03_QUIZZES: AnyMap = {};
export const ELECTRONICS_MODULE03_TAKEAWAYS: AnyMap = {};
export const ELECTRONICS_MODULE04_DECKS: AnyMap = {};
export const ELECTRONICS_MODULE04_QUIZZES: AnyMap = {};
export const ELECTRONICS_MODULE04_TAKEAWAYS: AnyMap = {};
export const ELECTRONICS_MODULE05_DECKS: AnyMap = {};
export const ELECTRONICS_MODULE05_QUIZZES: AnyMap = {};
export const ELECTRONICS_MODULE05_TAKEAWAYS: AnyMap = {};

export const TELECOM_MODULE01_DECKS: AnyMap = {};
export const TELECOM_MODULE01_QUIZZES: AnyMap = {};
export const TELECOM_MODULE01_TAKEAWAYS: AnyMap = {};
export const TELECOM_MODULE02_DECKS: AnyMap = {};
export const TELECOM_MODULE02_QUIZZES: AnyMap = {};
export const TELECOM_MODULE02_TAKEAWAYS: AnyMap = {};
export const TELECOM_MODULE03_DECKS: AnyMap = {};
export const TELECOM_MODULE03_QUIZZES: AnyMap = {};
export const TELECOM_MODULE03_TAKEAWAYS: AnyMap = {};
export const TELECOM_MODULE04_DECKS: AnyMap = {};
export const TELECOM_MODULE04_QUIZZES: AnyMap = {};
export const TELECOM_MODULE04_TAKEAWAYS: AnyMap = {};
export const TELECOM_MODULE05_DECKS: AnyMap = {};
export const TELECOM_MODULE05_QUIZZES: AnyMap = {};
export const TELECOM_MODULE05_TAKEAWAYS: AnyMap = {};

export const ADTECH_MODULE01_DECKS: AnyMap = {};
export const ADTECH_MODULE01_QUIZZES: AnyMap = {};
export const ADTECH_MODULE01_TAKEAWAYS: AnyMap = {};
export const ADTECH_MODULE02_DECKS: AnyMap = {};
export const ADTECH_MODULE02_QUIZZES: AnyMap = {};
export const ADTECH_MODULE02_TAKEAWAYS: AnyMap = {};
export const ADTECH_MODULE03_DECKS: AnyMap = {};
export const ADTECH_MODULE03_QUIZZES: AnyMap = {};
export const ADTECH_MODULE03_TAKEAWAYS: AnyMap = {};
export const ADTECH_MODULE04_DECKS: AnyMap = {};
export const ADTECH_MODULE04_QUIZZES: AnyMap = {};
export const ADTECH_MODULE04_TAKEAWAYS: AnyMap = {};
export const ADTECH_MODULE05_DECKS: AnyMap = {};
export const ADTECH_MODULE05_QUIZZES: AnyMap = {};
export const ADTECH_MODULE05_TAKEAWAYS: AnyMap = {};

export const MFG_ELECTRONICS_MODULE01_DECKS: AnyMap = {};
export const MFG_ELECTRONICS_MODULE01_QUIZZES: AnyMap = {};
export const MFG_ELECTRONICS_MODULE01_TAKEAWAYS: AnyMap = {};
export const MFG_ELECTRONICS_MODULE02_DECKS: AnyMap = {};
export const MFG_ELECTRONICS_MODULE02_QUIZZES: AnyMap = {};
export const MFG_ELECTRONICS_MODULE02_TAKEAWAYS: AnyMap = {};
export const MFG_ELECTRONICS_MODULE03_DECKS: AnyMap = {};
export const MFG_ELECTRONICS_MODULE03_QUIZZES: AnyMap = {};
export const MFG_ELECTRONICS_MODULE03_TAKEAWAYS: AnyMap = {};
export const MFG_ELECTRONICS_MODULE04_DECKS: AnyMap = {};
export const MFG_ELECTRONICS_MODULE04_QUIZZES: AnyMap = {};
export const MFG_ELECTRONICS_MODULE04_TAKEAWAYS: AnyMap = {};
export const MFG_ELECTRONICS_MODULE05_DECKS: AnyMap = {};
export const MFG_ELECTRONICS_MODULE05_QUIZZES: AnyMap = {};
export const MFG_ELECTRONICS_MODULE05_TAKEAWAYS: AnyMap = {};

export const MFG_MACHINERY_MODULE01_DECKS: AnyMap = {};
export const MFG_MACHINERY_MODULE01_QUIZZES: AnyMap = {};
export const MFG_MACHINERY_MODULE01_TAKEAWAYS: AnyMap = {};
export const MFG_MACHINERY_MODULE02_DECKS: AnyMap = {};
export const MFG_MACHINERY_MODULE02_QUIZZES: AnyMap = {};
export const MFG_MACHINERY_MODULE02_TAKEAWAYS: AnyMap = {};
export const MFG_MACHINERY_MODULE03_DECKS: AnyMap = {};
export const MFG_MACHINERY_MODULE03_QUIZZES: AnyMap = {};
export const MFG_MACHINERY_MODULE03_TAKEAWAYS: AnyMap = {};
export const MFG_MACHINERY_MODULE04_DECKS: AnyMap = {};
export const MFG_MACHINERY_MODULE04_QUIZZES: AnyMap = {};
export const MFG_MACHINERY_MODULE04_TAKEAWAYS: AnyMap = {};
export const MFG_MACHINERY_MODULE05_DECKS: AnyMap = {};
export const MFG_MACHINERY_MODULE05_QUIZZES: AnyMap = {};
export const MFG_MACHINERY_MODULE05_TAKEAWAYS: AnyMap = {};

export const MFG_ELECTRICAL_MODULE01_DECKS: AnyMap = {};
export const MFG_ELECTRICAL_MODULE01_QUIZZES: AnyMap = {};
export const MFG_ELECTRICAL_MODULE01_TAKEAWAYS: AnyMap = {};
export const MFG_ELECTRICAL_MODULE02_DECKS: AnyMap = {};
export const MFG_ELECTRICAL_MODULE02_QUIZZES: AnyMap = {};
export const MFG_ELECTRICAL_MODULE02_TAKEAWAYS: AnyMap = {};
export const MFG_ELECTRICAL_MODULE03_DECKS: AnyMap = {};
export const MFG_ELECTRICAL_MODULE03_QUIZZES: AnyMap = {};
export const MFG_ELECTRICAL_MODULE03_TAKEAWAYS: AnyMap = {};
export const MFG_ELECTRICAL_MODULE04_DECKS: AnyMap = {};
export const MFG_ELECTRICAL_MODULE04_QUIZZES: AnyMap = {};
export const MFG_ELECTRICAL_MODULE04_TAKEAWAYS: AnyMap = {};
export const MFG_ELECTRICAL_MODULE05_DECKS: AnyMap = {};
export const MFG_ELECTRICAL_MODULE05_QUIZZES: AnyMap = {};
export const MFG_ELECTRICAL_MODULE05_TAKEAWAYS: AnyMap = {};

export const MFG_TEXTILES_MODULE01_DECKS: AnyMap = {};
export const MFG_TEXTILES_MODULE01_QUIZZES: AnyMap = {};
export const MFG_TEXTILES_MODULE01_TAKEAWAYS: AnyMap = {};
export const MFG_TEXTILES_MODULE02_DECKS: AnyMap = {};
export const MFG_TEXTILES_MODULE02_QUIZZES: AnyMap = {};
export const MFG_TEXTILES_MODULE02_TAKEAWAYS: AnyMap = {};
export const MFG_TEXTILES_MODULE03_DECKS: AnyMap = {};
export const MFG_TEXTILES_MODULE03_QUIZZES: AnyMap = {};
export const MFG_TEXTILES_MODULE03_TAKEAWAYS: AnyMap = {};
export const MFG_TEXTILES_MODULE04_DECKS: AnyMap = {};
export const MFG_TEXTILES_MODULE04_QUIZZES: AnyMap = {};
export const MFG_TEXTILES_MODULE04_TAKEAWAYS: AnyMap = {};
export const MFG_TEXTILES_MODULE05_DECKS: AnyMap = {};
export const MFG_TEXTILES_MODULE05_QUIZZES: AnyMap = {};
export const MFG_TEXTILES_MODULE05_TAKEAWAYS: AnyMap = {};

export const MFG_BUILDING_MODULE01_DECKS: AnyMap = {};
export const MFG_BUILDING_MODULE01_QUIZZES: AnyMap = {};
export const MFG_BUILDING_MODULE01_TAKEAWAYS: AnyMap = {};
export const MFG_BUILDING_MODULE02_DECKS: AnyMap = {};
export const MFG_BUILDING_MODULE02_QUIZZES: AnyMap = {};
export const MFG_BUILDING_MODULE02_TAKEAWAYS: AnyMap = {};
export const MFG_BUILDING_MODULE03_DECKS: AnyMap = {};
export const MFG_BUILDING_MODULE03_QUIZZES: AnyMap = {};
export const MFG_BUILDING_MODULE03_TAKEAWAYS: AnyMap = {};
export const MFG_BUILDING_MODULE04_DECKS: AnyMap = {};
export const MFG_BUILDING_MODULE04_QUIZZES: AnyMap = {};
export const MFG_BUILDING_MODULE04_TAKEAWAYS: AnyMap = {};
export const MFG_BUILDING_MODULE05_DECKS: AnyMap = {};
export const MFG_BUILDING_MODULE05_QUIZZES: AnyMap = {};
export const MFG_BUILDING_MODULE05_TAKEAWAYS: AnyMap = {};

export const MFG_PACKAGING_MODULE01_DECKS: AnyMap = {};
export const MFG_PACKAGING_MODULE01_QUIZZES: AnyMap = {};
export const MFG_PACKAGING_MODULE01_TAKEAWAYS: AnyMap = {};
export const MFG_PACKAGING_MODULE02_DECKS: AnyMap = {};
export const MFG_PACKAGING_MODULE02_QUIZZES: AnyMap = {};
export const MFG_PACKAGING_MODULE02_TAKEAWAYS: AnyMap = {};
export const MFG_PACKAGING_MODULE03_DECKS: AnyMap = {};
export const MFG_PACKAGING_MODULE03_QUIZZES: AnyMap = {};
export const MFG_PACKAGING_MODULE03_TAKEAWAYS: AnyMap = {};
export const MFG_PACKAGING_MODULE04_DECKS: AnyMap = {};
export const MFG_PACKAGING_MODULE04_QUIZZES: AnyMap = {};
export const MFG_PACKAGING_MODULE04_TAKEAWAYS: AnyMap = {};
export const MFG_PACKAGING_MODULE05_DECKS: AnyMap = {};
export const MFG_PACKAGING_MODULE05_QUIZZES: AnyMap = {};
export const MFG_PACKAGING_MODULE05_TAKEAWAYS: AnyMap = {};

export const LOGISTICS_FREIGHT_MODULE01_DECKS: AnyMap = {};
export const LOGISTICS_FREIGHT_MODULE01_QUIZZES: AnyMap = {};
export const LOGISTICS_FREIGHT_MODULE01_TAKEAWAYS: AnyMap = {};
export const LOGISTICS_FREIGHT_MODULE02_DECKS: AnyMap = {};
export const LOGISTICS_FREIGHT_MODULE02_QUIZZES: AnyMap = {};
export const LOGISTICS_FREIGHT_MODULE02_TAKEAWAYS: AnyMap = {};
export const LOGISTICS_FREIGHT_MODULE03_DECKS: AnyMap = {};
export const LOGISTICS_FREIGHT_MODULE03_QUIZZES: AnyMap = {};
export const LOGISTICS_FREIGHT_MODULE03_TAKEAWAYS: AnyMap = {};
export const LOGISTICS_FREIGHT_MODULE04_DECKS: AnyMap = {};
export const LOGISTICS_FREIGHT_MODULE04_QUIZZES: AnyMap = {};
export const LOGISTICS_FREIGHT_MODULE04_TAKEAWAYS: AnyMap = {};
export const LOGISTICS_FREIGHT_MODULE05_DECKS: AnyMap = {};
export const LOGISTICS_FREIGHT_MODULE05_QUIZZES: AnyMap = {};
export const LOGISTICS_FREIGHT_MODULE05_TAKEAWAYS: AnyMap = {};

export const LOGISTICS_CONTRACT_MODULE01_DECKS: AnyMap = {};
export const LOGISTICS_CONTRACT_MODULE01_QUIZZES: AnyMap = {};
export const LOGISTICS_CONTRACT_MODULE01_TAKEAWAYS: AnyMap = {};
export const LOGISTICS_CONTRACT_MODULE02_DECKS: AnyMap = {};
export const LOGISTICS_CONTRACT_MODULE02_QUIZZES: AnyMap = {};
export const LOGISTICS_CONTRACT_MODULE02_TAKEAWAYS: AnyMap = {};
export const LOGISTICS_CONTRACT_MODULE03_DECKS: AnyMap = {};
export const LOGISTICS_CONTRACT_MODULE03_QUIZZES: AnyMap = {};
export const LOGISTICS_CONTRACT_MODULE03_TAKEAWAYS: AnyMap = {};
export const LOGISTICS_CONTRACT_MODULE04_DECKS: AnyMap = {};
export const LOGISTICS_CONTRACT_MODULE04_QUIZZES: AnyMap = {};
export const LOGISTICS_CONTRACT_MODULE04_TAKEAWAYS: AnyMap = {};
export const LOGISTICS_CONTRACT_MODULE05_DECKS: AnyMap = {};
export const LOGISTICS_CONTRACT_MODULE05_QUIZZES: AnyMap = {};
export const LOGISTICS_CONTRACT_MODULE05_TAKEAWAYS: AnyMap = {};

export const LOGISTICS_EXPRESS_MODULE01_DECKS: AnyMap = {};
export const LOGISTICS_EXPRESS_MODULE01_QUIZZES: AnyMap = {};
export const LOGISTICS_EXPRESS_MODULE01_TAKEAWAYS: AnyMap = {};
export const LOGISTICS_EXPRESS_MODULE02_DECKS: AnyMap = {};
export const LOGISTICS_EXPRESS_MODULE02_QUIZZES: AnyMap = {};
export const LOGISTICS_EXPRESS_MODULE02_TAKEAWAYS: AnyMap = {};
export const LOGISTICS_EXPRESS_MODULE03_DECKS: AnyMap = {};
export const LOGISTICS_EXPRESS_MODULE03_QUIZZES: AnyMap = {};
export const LOGISTICS_EXPRESS_MODULE03_TAKEAWAYS: AnyMap = {};
export const LOGISTICS_EXPRESS_MODULE04_DECKS: AnyMap = {};
export const LOGISTICS_EXPRESS_MODULE04_QUIZZES: AnyMap = {};
export const LOGISTICS_EXPRESS_MODULE04_TAKEAWAYS: AnyMap = {};
export const LOGISTICS_EXPRESS_MODULE05_DECKS: AnyMap = {};
export const LOGISTICS_EXPRESS_MODULE05_QUIZZES: AnyMap = {};
export const LOGISTICS_EXPRESS_MODULE05_TAKEAWAYS: AnyMap = {};

export const LOGISTICS_DISTRIBUTION_MODULE01_DECKS: AnyMap = {};
export const LOGISTICS_DISTRIBUTION_MODULE01_QUIZZES: AnyMap = {};
export const LOGISTICS_DISTRIBUTION_MODULE01_TAKEAWAYS: AnyMap = {};
export const LOGISTICS_DISTRIBUTION_MODULE02_DECKS: AnyMap = {};
export const LOGISTICS_DISTRIBUTION_MODULE02_QUIZZES: AnyMap = {};
export const LOGISTICS_DISTRIBUTION_MODULE02_TAKEAWAYS: AnyMap = {};
export const LOGISTICS_DISTRIBUTION_MODULE03_DECKS: AnyMap = {};
export const LOGISTICS_DISTRIBUTION_MODULE03_QUIZZES: AnyMap = {};
export const LOGISTICS_DISTRIBUTION_MODULE03_TAKEAWAYS: AnyMap = {};
export const LOGISTICS_DISTRIBUTION_MODULE04_DECKS: AnyMap = {};
export const LOGISTICS_DISTRIBUTION_MODULE04_QUIZZES: AnyMap = {};
export const LOGISTICS_DISTRIBUTION_MODULE04_TAKEAWAYS: AnyMap = {};
export const LOGISTICS_DISTRIBUTION_MODULE05_DECKS: AnyMap = {};
export const LOGISTICS_DISTRIBUTION_MODULE05_QUIZZES: AnyMap = {};
export const LOGISTICS_DISTRIBUTION_MODULE05_TAKEAWAYS: AnyMap = {};

export const AGRI_LIVESTOCK_MODULE01_DECKS: AnyMap = {};
export const AGRI_LIVESTOCK_MODULE01_QUIZZES: AnyMap = {};
export const AGRI_LIVESTOCK_MODULE01_TAKEAWAYS: AnyMap = {};
export const AGRI_LIVESTOCK_MODULE02_DECKS: AnyMap = {};
export const AGRI_LIVESTOCK_MODULE02_QUIZZES: AnyMap = {};
export const AGRI_LIVESTOCK_MODULE02_TAKEAWAYS: AnyMap = {};
export const AGRI_LIVESTOCK_MODULE03_DECKS: AnyMap = {};
export const AGRI_LIVESTOCK_MODULE03_QUIZZES: AnyMap = {};
export const AGRI_LIVESTOCK_MODULE03_TAKEAWAYS: AnyMap = {};
export const AGRI_LIVESTOCK_MODULE04_DECKS: AnyMap = {};
export const AGRI_LIVESTOCK_MODULE04_QUIZZES: AnyMap = {};
export const AGRI_LIVESTOCK_MODULE04_TAKEAWAYS: AnyMap = {};
export const AGRI_LIVESTOCK_MODULE05_DECKS: AnyMap = {};
export const AGRI_LIVESTOCK_MODULE05_QUIZZES: AnyMap = {};
export const AGRI_LIVESTOCK_MODULE05_TAKEAWAYS: AnyMap = {};

export const AGRI_COMMODITIES_MODULE01_DECKS: AnyMap = {};
export const AGRI_COMMODITIES_MODULE01_QUIZZES: AnyMap = {};
export const AGRI_COMMODITIES_MODULE01_TAKEAWAYS: AnyMap = {};
export const AGRI_COMMODITIES_MODULE02_DECKS: AnyMap = {};
export const AGRI_COMMODITIES_MODULE02_QUIZZES: AnyMap = {};
export const AGRI_COMMODITIES_MODULE02_TAKEAWAYS: AnyMap = {};
export const AGRI_COMMODITIES_MODULE03_DECKS: AnyMap = {};
export const AGRI_COMMODITIES_MODULE03_QUIZZES: AnyMap = {};
export const AGRI_COMMODITIES_MODULE03_TAKEAWAYS: AnyMap = {};
export const AGRI_COMMODITIES_MODULE04_DECKS: AnyMap = {};
export const AGRI_COMMODITIES_MODULE04_QUIZZES: AnyMap = {};
export const AGRI_COMMODITIES_MODULE04_TAKEAWAYS: AnyMap = {};
export const AGRI_COMMODITIES_MODULE05_DECKS: AnyMap = {};
export const AGRI_COMMODITIES_MODULE05_QUIZZES: AnyMap = {};
export const AGRI_COMMODITIES_MODULE05_TAKEAWAYS: AnyMap = {};

export const AGRI_CROP_MODULE01_DECKS: AnyMap = {};
export const AGRI_CROP_MODULE01_QUIZZES: AnyMap = {};
export const AGRI_CROP_MODULE01_TAKEAWAYS: AnyMap = {};
export const AGRI_CROP_MODULE02_DECKS: AnyMap = {};
export const AGRI_CROP_MODULE02_QUIZZES: AnyMap = {};
export const AGRI_CROP_MODULE02_TAKEAWAYS: AnyMap = {};
export const AGRI_CROP_MODULE03_DECKS: AnyMap = {};
export const AGRI_CROP_MODULE03_QUIZZES: AnyMap = {};
export const AGRI_CROP_MODULE03_TAKEAWAYS: AnyMap = {};
export const AGRI_CROP_MODULE04_DECKS: AnyMap = {};
export const AGRI_CROP_MODULE04_QUIZZES: AnyMap = {};
export const AGRI_CROP_MODULE04_TAKEAWAYS: AnyMap = {};
export const AGRI_CROP_MODULE05_DECKS: AnyMap = {};
export const AGRI_CROP_MODULE05_QUIZZES: AnyMap = {};
export const AGRI_CROP_MODULE05_TAKEAWAYS: AnyMap = {};

export const REAL_ESTATE_DEVELOPMENT_MODULE01_DECKS: AnyMap = {};
export const REAL_ESTATE_DEVELOPMENT_MODULE01_QUIZZES: AnyMap = {};
export const REAL_ESTATE_DEVELOPMENT_MODULE01_TAKEAWAYS: AnyMap = {};
export const REAL_ESTATE_DEVELOPMENT_MODULE02_DECKS: AnyMap = {};
export const REAL_ESTATE_DEVELOPMENT_MODULE02_QUIZZES: AnyMap = {};
export const REAL_ESTATE_DEVELOPMENT_MODULE02_TAKEAWAYS: AnyMap = {};
export const REAL_ESTATE_DEVELOPMENT_MODULE03_DECKS: AnyMap = {};
export const REAL_ESTATE_DEVELOPMENT_MODULE03_QUIZZES: AnyMap = {};
export const REAL_ESTATE_DEVELOPMENT_MODULE03_TAKEAWAYS: AnyMap = {};
export const REAL_ESTATE_DEVELOPMENT_MODULE04_DECKS: AnyMap = {};
export const REAL_ESTATE_DEVELOPMENT_MODULE04_QUIZZES: AnyMap = {};
export const REAL_ESTATE_DEVELOPMENT_MODULE04_TAKEAWAYS: AnyMap = {};
export const REAL_ESTATE_DEVELOPMENT_MODULE05_DECKS: AnyMap = {};
export const REAL_ESTATE_DEVELOPMENT_MODULE05_QUIZZES: AnyMap = {};
export const REAL_ESTATE_DEVELOPMENT_MODULE05_TAKEAWAYS: AnyMap = {};

export const REAL_ESTATE_ADVISORY_MODULE01_DECKS: AnyMap = {};
export const REAL_ESTATE_ADVISORY_MODULE01_QUIZZES: AnyMap = {};
export const REAL_ESTATE_ADVISORY_MODULE01_TAKEAWAYS: AnyMap = {};
export const REAL_ESTATE_ADVISORY_MODULE02_DECKS: AnyMap = {};
export const REAL_ESTATE_ADVISORY_MODULE02_QUIZZES: AnyMap = {};
export const REAL_ESTATE_ADVISORY_MODULE02_TAKEAWAYS: AnyMap = {};
export const REAL_ESTATE_ADVISORY_MODULE03_DECKS: AnyMap = {};
export const REAL_ESTATE_ADVISORY_MODULE03_QUIZZES: AnyMap = {};
export const REAL_ESTATE_ADVISORY_MODULE03_TAKEAWAYS: AnyMap = {};
export const REAL_ESTATE_ADVISORY_MODULE04_DECKS: AnyMap = {};
export const REAL_ESTATE_ADVISORY_MODULE04_QUIZZES: AnyMap = {};
export const REAL_ESTATE_ADVISORY_MODULE04_TAKEAWAYS: AnyMap = {};
export const REAL_ESTATE_ADVISORY_MODULE05_DECKS: AnyMap = {};
export const REAL_ESTATE_ADVISORY_MODULE05_QUIZZES: AnyMap = {};
export const REAL_ESTATE_ADVISORY_MODULE05_TAKEAWAYS: AnyMap = {};

export const REAL_ESTATE_PROPTECH_MODULE01_DECKS: AnyMap = {};
export const REAL_ESTATE_PROPTECH_MODULE01_QUIZZES: AnyMap = {};
export const REAL_ESTATE_PROPTECH_MODULE01_TAKEAWAYS: AnyMap = {};
export const REAL_ESTATE_PROPTECH_MODULE02_DECKS: AnyMap = {};
export const REAL_ESTATE_PROPTECH_MODULE02_QUIZZES: AnyMap = {};
export const REAL_ESTATE_PROPTECH_MODULE02_TAKEAWAYS: AnyMap = {};
export const REAL_ESTATE_PROPTECH_MODULE03_DECKS: AnyMap = {};
export const REAL_ESTATE_PROPTECH_MODULE03_QUIZZES: AnyMap = {};
export const REAL_ESTATE_PROPTECH_MODULE03_TAKEAWAYS: AnyMap = {};
export const REAL_ESTATE_PROPTECH_MODULE04_DECKS: AnyMap = {};
export const REAL_ESTATE_PROPTECH_MODULE04_QUIZZES: AnyMap = {};
export const REAL_ESTATE_PROPTECH_MODULE04_TAKEAWAYS: AnyMap = {};
export const REAL_ESTATE_PROPTECH_MODULE05_DECKS: AnyMap = {};
export const REAL_ESTATE_PROPTECH_MODULE05_QUIZZES: AnyMap = {};
export const REAL_ESTATE_PROPTECH_MODULE05_TAKEAWAYS: AnyMap = {};

export const HOSPITALITY_HOTELS_MODULE01_DECKS: AnyMap = {};
export const HOSPITALITY_HOTELS_MODULE01_QUIZZES: AnyMap = {};
export const HOSPITALITY_HOTELS_MODULE01_TAKEAWAYS: AnyMap = {};
export const HOSPITALITY_HOTELS_MODULE02_DECKS: AnyMap = {};
export const HOSPITALITY_HOTELS_MODULE02_QUIZZES: AnyMap = {};
export const HOSPITALITY_HOTELS_MODULE02_TAKEAWAYS: AnyMap = {};
export const HOSPITALITY_HOTELS_MODULE03_DECKS: AnyMap = {};
export const HOSPITALITY_HOTELS_MODULE03_QUIZZES: AnyMap = {};
export const HOSPITALITY_HOTELS_MODULE03_TAKEAWAYS: AnyMap = {};
export const HOSPITALITY_HOTELS_MODULE04_DECKS: AnyMap = {};
export const HOSPITALITY_HOTELS_MODULE04_QUIZZES: AnyMap = {};
export const HOSPITALITY_HOTELS_MODULE04_TAKEAWAYS: AnyMap = {};
export const HOSPITALITY_HOTELS_MODULE05_DECKS: AnyMap = {};
export const HOSPITALITY_HOTELS_MODULE05_QUIZZES: AnyMap = {};
export const HOSPITALITY_HOTELS_MODULE05_TAKEAWAYS: AnyMap = {};

export const HOSPITALITY_RESTAURANTS_MODULE01_DECKS: AnyMap = {};
export const HOSPITALITY_RESTAURANTS_MODULE01_QUIZZES: AnyMap = {};
export const HOSPITALITY_RESTAURANTS_MODULE01_TAKEAWAYS: AnyMap = {};
export const HOSPITALITY_RESTAURANTS_MODULE02_DECKS: AnyMap = {};
export const HOSPITALITY_RESTAURANTS_MODULE02_QUIZZES: AnyMap = {};
export const HOSPITALITY_RESTAURANTS_MODULE02_TAKEAWAYS: AnyMap = {};
export const HOSPITALITY_RESTAURANTS_MODULE03_DECKS: AnyMap = {};
export const HOSPITALITY_RESTAURANTS_MODULE03_QUIZZES: AnyMap = {};
export const HOSPITALITY_RESTAURANTS_MODULE03_TAKEAWAYS: AnyMap = {};
export const HOSPITALITY_RESTAURANTS_MODULE04_DECKS: AnyMap = {};
export const HOSPITALITY_RESTAURANTS_MODULE04_QUIZZES: AnyMap = {};
export const HOSPITALITY_RESTAURANTS_MODULE04_TAKEAWAYS: AnyMap = {};
export const HOSPITALITY_RESTAURANTS_MODULE05_DECKS: AnyMap = {};
export const HOSPITALITY_RESTAURANTS_MODULE05_QUIZZES: AnyMap = {};
export const HOSPITALITY_RESTAURANTS_MODULE05_TAKEAWAYS: AnyMap = {};

export const HEALTHCARE_PRODUCTS_MODULE01_DECKS: AnyMap = {};
export const HEALTHCARE_PRODUCTS_MODULE01_QUIZZES: AnyMap = {};
export const HEALTHCARE_PRODUCTS_MODULE01_TAKEAWAYS: AnyMap = {};
export const HEALTHCARE_PRODUCTS_MODULE02_DECKS: AnyMap = {};
export const HEALTHCARE_PRODUCTS_MODULE02_QUIZZES: AnyMap = {};
export const HEALTHCARE_PRODUCTS_MODULE02_TAKEAWAYS: AnyMap = {};
export const HEALTHCARE_PRODUCTS_MODULE03_DECKS: AnyMap = {};
export const HEALTHCARE_PRODUCTS_MODULE03_QUIZZES: AnyMap = {};
export const HEALTHCARE_PRODUCTS_MODULE03_TAKEAWAYS: AnyMap = {};
export const HEALTHCARE_PRODUCTS_MODULE04_DECKS: AnyMap = {};
export const HEALTHCARE_PRODUCTS_MODULE04_QUIZZES: AnyMap = {};
export const HEALTHCARE_PRODUCTS_MODULE04_TAKEAWAYS: AnyMap = {};
export const HEALTHCARE_PRODUCTS_MODULE05_DECKS: AnyMap = {};
export const HEALTHCARE_PRODUCTS_MODULE05_QUIZZES: AnyMap = {};
export const HEALTHCARE_PRODUCTS_MODULE05_TAKEAWAYS: AnyMap = {};

export const PROFESSIONAL_AUDIT_MODULE01_DECKS: AnyMap = {};
export const PROFESSIONAL_AUDIT_MODULE01_QUIZZES: AnyMap = {};
export const PROFESSIONAL_AUDIT_MODULE01_TAKEAWAYS: AnyMap = {};
export const PROFESSIONAL_AUDIT_MODULE02_DECKS: AnyMap = {};
export const PROFESSIONAL_AUDIT_MODULE02_QUIZZES: AnyMap = {};
export const PROFESSIONAL_AUDIT_MODULE02_TAKEAWAYS: AnyMap = {};
export const PROFESSIONAL_AUDIT_MODULE03_DECKS: AnyMap = {};
export const PROFESSIONAL_AUDIT_MODULE03_QUIZZES: AnyMap = {};
export const PROFESSIONAL_AUDIT_MODULE03_TAKEAWAYS: AnyMap = {};
export const PROFESSIONAL_AUDIT_MODULE04_DECKS: AnyMap = {};
export const PROFESSIONAL_AUDIT_MODULE04_QUIZZES: AnyMap = {};
export const PROFESSIONAL_AUDIT_MODULE04_TAKEAWAYS: AnyMap = {};
export const PROFESSIONAL_AUDIT_MODULE05_DECKS: AnyMap = {};
export const PROFESSIONAL_AUDIT_MODULE05_QUIZZES: AnyMap = {};
export const PROFESSIONAL_AUDIT_MODULE05_TAKEAWAYS: AnyMap = {};

export const PROFESSIONAL_CONSULTING_MODULE01_DECKS: AnyMap = {};
export const PROFESSIONAL_CONSULTING_MODULE01_QUIZZES: AnyMap = {};
export const PROFESSIONAL_CONSULTING_MODULE01_TAKEAWAYS: AnyMap = {};
export const PROFESSIONAL_CONSULTING_MODULE02_DECKS: AnyMap = {};
export const PROFESSIONAL_CONSULTING_MODULE02_QUIZZES: AnyMap = {};
export const PROFESSIONAL_CONSULTING_MODULE02_TAKEAWAYS: AnyMap = {};
export const PROFESSIONAL_CONSULTING_MODULE03_DECKS: AnyMap = {};
export const PROFESSIONAL_CONSULTING_MODULE03_QUIZZES: AnyMap = {};
export const PROFESSIONAL_CONSULTING_MODULE03_TAKEAWAYS: AnyMap = {};
export const PROFESSIONAL_CONSULTING_MODULE04_DECKS: AnyMap = {};
export const PROFESSIONAL_CONSULTING_MODULE04_QUIZZES: AnyMap = {};
export const PROFESSIONAL_CONSULTING_MODULE04_TAKEAWAYS: AnyMap = {};
export const PROFESSIONAL_CONSULTING_MODULE05_DECKS: AnyMap = {};
export const PROFESSIONAL_CONSULTING_MODULE05_QUIZZES: AnyMap = {};
export const PROFESSIONAL_CONSULTING_MODULE05_TAKEAWAYS: AnyMap = {};

export const PROFESSIONAL_ADVISORY_MODULE01_DECKS: AnyMap = {};
export const PROFESSIONAL_ADVISORY_MODULE01_QUIZZES: AnyMap = {};
export const PROFESSIONAL_ADVISORY_MODULE01_TAKEAWAYS: AnyMap = {};
export const PROFESSIONAL_ADVISORY_MODULE02_DECKS: AnyMap = {};
export const PROFESSIONAL_ADVISORY_MODULE02_QUIZZES: AnyMap = {};
export const PROFESSIONAL_ADVISORY_MODULE02_TAKEAWAYS: AnyMap = {};
export const PROFESSIONAL_ADVISORY_MODULE03_DECKS: AnyMap = {};
export const PROFESSIONAL_ADVISORY_MODULE03_QUIZZES: AnyMap = {};
export const PROFESSIONAL_ADVISORY_MODULE03_TAKEAWAYS: AnyMap = {};
export const PROFESSIONAL_ADVISORY_MODULE04_DECKS: AnyMap = {};
export const PROFESSIONAL_ADVISORY_MODULE04_QUIZZES: AnyMap = {};
export const PROFESSIONAL_ADVISORY_MODULE04_TAKEAWAYS: AnyMap = {};
export const PROFESSIONAL_ADVISORY_MODULE05_DECKS: AnyMap = {};
export const PROFESSIONAL_ADVISORY_MODULE05_QUIZZES: AnyMap = {};
export const PROFESSIONAL_ADVISORY_MODULE05_TAKEAWAYS: AnyMap = {};

export const SOCIAL_MODULE01_DECKS: AnyMap = {};
export const SOCIAL_MODULE01_QUIZZES: AnyMap = {};
export const SOCIAL_MODULE01_TAKEAWAYS: AnyMap = {};
export const SOCIAL_MODULE02_DECKS: AnyMap = {};
export const SOCIAL_MODULE02_QUIZZES: AnyMap = {};
export const SOCIAL_MODULE02_TAKEAWAYS: AnyMap = {};
export const SOCIAL_MODULE03_DECKS: AnyMap = {};
export const SOCIAL_MODULE03_QUIZZES: AnyMap = {};
export const SOCIAL_MODULE03_TAKEAWAYS: AnyMap = {};
export const SOCIAL_MODULE04_DECKS: AnyMap = {};
export const SOCIAL_MODULE04_QUIZZES: AnyMap = {};
export const SOCIAL_MODULE04_TAKEAWAYS: AnyMap = {};
export const SOCIAL_MODULE05_DECKS: AnyMap = {};
export const SOCIAL_MODULE05_QUIZZES: AnyMap = {};
export const SOCIAL_MODULE05_TAKEAWAYS: AnyMap = {};

export const COMMERCIAL_BANKING_MODULE01_DECKS: AnyMap = {};
export const COMMERCIAL_BANKING_MODULE01_QUIZZES: AnyMap = {};
export const COMMERCIAL_BANKING_MODULE01_TAKEAWAYS: AnyMap = {};
export const COMMERCIAL_BANKING_MODULE02_DECKS: AnyMap = {};
export const COMMERCIAL_BANKING_MODULE02_QUIZZES: AnyMap = {};
export const COMMERCIAL_BANKING_MODULE02_TAKEAWAYS: AnyMap = {};
export const COMMERCIAL_BANKING_MODULE03_DECKS: AnyMap = {};
export const COMMERCIAL_BANKING_MODULE03_QUIZZES: AnyMap = {};
export const COMMERCIAL_BANKING_MODULE03_TAKEAWAYS: AnyMap = {};
export const COMMERCIAL_BANKING_MODULE04_DECKS: AnyMap = {};
export const COMMERCIAL_BANKING_MODULE04_QUIZZES: AnyMap = {};
export const COMMERCIAL_BANKING_MODULE04_TAKEAWAYS: AnyMap = {};
export const COMMERCIAL_BANKING_MODULE05_DECKS: AnyMap = {};
export const COMMERCIAL_BANKING_MODULE05_QUIZZES: AnyMap = {};
export const COMMERCIAL_BANKING_MODULE05_TAKEAWAYS: AnyMap = {};

export const CONSUMER_FINANCE_MODULE01_DECKS: AnyMap = {};
export const CONSUMER_FINANCE_MODULE01_QUIZZES: AnyMap = {};
export const CONSUMER_FINANCE_MODULE01_TAKEAWAYS: AnyMap = {};
export const CONSUMER_FINANCE_MODULE02_DECKS: AnyMap = {};
export const CONSUMER_FINANCE_MODULE02_QUIZZES: AnyMap = {};
export const CONSUMER_FINANCE_MODULE02_TAKEAWAYS: AnyMap = {};
export const CONSUMER_FINANCE_MODULE03_DECKS: AnyMap = {};
export const CONSUMER_FINANCE_MODULE03_QUIZZES: AnyMap = {};
export const CONSUMER_FINANCE_MODULE03_TAKEAWAYS: AnyMap = {};
export const CONSUMER_FINANCE_MODULE04_DECKS: AnyMap = {};
export const CONSUMER_FINANCE_MODULE04_QUIZZES: AnyMap = {};
export const CONSUMER_FINANCE_MODULE04_TAKEAWAYS: AnyMap = {};
export const CONSUMER_FINANCE_MODULE05_DECKS: AnyMap = {};
export const CONSUMER_FINANCE_MODULE05_QUIZZES: AnyMap = {};
export const CONSUMER_FINANCE_MODULE05_TAKEAWAYS: AnyMap = {};

export const LIFE_INSURANCE_MODULE01_DECKS: AnyMap = {};
export const LIFE_INSURANCE_MODULE01_QUIZZES: AnyMap = {};
export const LIFE_INSURANCE_MODULE01_TAKEAWAYS: AnyMap = {};
export const LIFE_INSURANCE_MODULE02_DECKS: AnyMap = {};
export const LIFE_INSURANCE_MODULE02_QUIZZES: AnyMap = {};
export const LIFE_INSURANCE_MODULE02_TAKEAWAYS: AnyMap = {};
export const LIFE_INSURANCE_MODULE03_DECKS: AnyMap = {};
export const LIFE_INSURANCE_MODULE03_QUIZZES: AnyMap = {};
export const LIFE_INSURANCE_MODULE03_TAKEAWAYS: AnyMap = {};
export const LIFE_INSURANCE_MODULE04_DECKS: AnyMap = {};
export const LIFE_INSURANCE_MODULE04_QUIZZES: AnyMap = {};
export const LIFE_INSURANCE_MODULE04_TAKEAWAYS: AnyMap = {};
export const LIFE_INSURANCE_MODULE05_DECKS: AnyMap = {};
export const LIFE_INSURANCE_MODULE05_QUIZZES: AnyMap = {};
export const LIFE_INSURANCE_MODULE05_TAKEAWAYS: AnyMap = {};

export const PAYMENTS_FINTECH_MODULE01_DECKS: AnyMap = {};
export const PAYMENTS_FINTECH_MODULE01_QUIZZES: AnyMap = {};
export const PAYMENTS_FINTECH_MODULE01_TAKEAWAYS: AnyMap = {};
export const PAYMENTS_FINTECH_MODULE02_DECKS: AnyMap = {};
export const PAYMENTS_FINTECH_MODULE02_QUIZZES: AnyMap = {};
export const PAYMENTS_FINTECH_MODULE02_TAKEAWAYS: AnyMap = {};
export const PAYMENTS_FINTECH_MODULE03_DECKS: AnyMap = {};
export const PAYMENTS_FINTECH_MODULE03_QUIZZES: AnyMap = {};
export const PAYMENTS_FINTECH_MODULE03_TAKEAWAYS: AnyMap = {};
export const PAYMENTS_FINTECH_MODULE04_DECKS: AnyMap = {};
export const PAYMENTS_FINTECH_MODULE04_QUIZZES: AnyMap = {};
export const PAYMENTS_FINTECH_MODULE04_TAKEAWAYS: AnyMap = {};
export const PAYMENTS_FINTECH_MODULE05_DECKS: AnyMap = {};
export const PAYMENTS_FINTECH_MODULE05_QUIZZES: AnyMap = {};
export const PAYMENTS_FINTECH_MODULE05_TAKEAWAYS: AnyMap = {};

export const NAB_MODULE02_LESSONS: LessonRow[] = []; 
export const NAB_MODULE03_LESSONS: LessonRow[] = [];
export const NAB_MODULE04_LESSONS: LessonRow[] = [];
export const NAB_MODULE05_LESSONS: LessonRow[] = [];
export const BEER_MODULE02_LESSONS: LessonRow[] = [];
export const BEER_MODULE03_LESSONS: LessonRow[] = [];
export const BEER_MODULE04_LESSONS: LessonRow[] = [];
export const BEER_MODULE05_LESSONS: LessonRow[] = [];
export const PACKAGED_FOOD_MODULE02_LESSONS: LessonRow[] = [];
export const PACKAGED_FOOD_MODULE03_LESSONS: LessonRow[] = [];
export const PACKAGED_FOOD_MODULE04_LESSONS: LessonRow[] = [];
export const PACKAGED_FOOD_MODULE05_LESSONS: LessonRow[] = [];
export const COMMERCIAL_BANKING_MODULE01_LESSONS: LessonRow[] = [];
export const COMMERCIAL_BANKING_MODULE02_LESSONS: LessonRow[] = [];
export const COMMERCIAL_BANKING_MODULE03_LESSONS: LessonRow[] = [];
export const COMMERCIAL_BANKING_MODULE04_LESSONS: LessonRow[] = [];
export const COMMERCIAL_BANKING_MODULE05_LESSONS: LessonRow[] = [];

export let COMMERCIAL_BANKING_MODULE05_LEGAL_STATUS = '';

export let renderNabModule02Visual: VisualRenderer = emptyVisual;
export let renderNabModule03Visual: VisualRenderer = emptyVisual;
export let renderNabModule04Visual: VisualRenderer = emptyVisual;
export let renderNabModule05Visual: VisualRenderer = emptyVisual;
export let renderBeerModule01Visual: VisualRenderer = emptyVisual;
export let renderBeerModule02Visual: VisualRenderer = emptyVisual;
export let renderBeerModule03Visual: VisualRenderer = emptyVisual;
export let renderBeerModule04Visual: VisualRenderer = emptyVisual;
export let renderBeerModule05Visual: VisualRenderer = emptyVisual;
export let renderPackagedFoodModule01Visual: VisualRenderer = emptyVisual;
export let renderPackagedFoodM2Visual: VisualRenderer = emptyVisual;
export let renderPackagedFoodM3Visual: VisualRenderer = emptyVisual;
export let renderPackagedFoodM4Visual: VisualRenderer = emptyVisual;
export let renderPackagedFoodM5Visual: VisualRenderer = emptyVisual;
export let renderFashionModule01Visual: VisualRenderer = emptyVisual;
export let renderFashionModule02Visual: VisualRenderer = emptyVisual;
export let renderFashionModule03Visual: VisualRenderer = emptyVisual;
export let renderFashionModule04Visual: VisualRenderer = emptyVisual;
export let renderFashionModule05Visual: VisualRenderer = emptyVisual;
export let renderGroceryModule01Visual: VisualRenderer = emptyVisual;
export let renderGroceryModule02Visual: VisualRenderer = emptyVisual;
export let renderGroceryModule03Visual: VisualRenderer = emptyVisual;
export let renderGroceryModule04Visual: VisualRenderer = emptyVisual;
export let renderGroceryModule05Visual: VisualRenderer = emptyVisual;
export let renderPharmacyModule01Visual: VisualRenderer = emptyVisual;
export let renderPharmacyModule02Visual: VisualRenderer = emptyVisual;
export let renderPharmacyModule03Visual: VisualRenderer = emptyVisual;
export let renderPharmacyModule04Visual: VisualRenderer = emptyVisual;
export let renderPharmacyModule05Visual: VisualRenderer = emptyVisual;
export let renderCoffeeModule01Visual: VisualRenderer = emptyVisual;
export let renderCoffeeModule02Visual: VisualRenderer = emptyVisual;
export let renderCoffeeModule03Visual: VisualRenderer = emptyVisual;
export let renderCoffeeModule04Visual: VisualRenderer = emptyVisual;
export let renderCoffeeModule05Visual: VisualRenderer = emptyVisual;
export let renderEntModule01Visual: VisualRenderer = emptyVisual;
export let renderEntModule02Visual: VisualRenderer = emptyVisual;
export let renderEntModule03Visual: VisualRenderer = emptyVisual;
export let renderEntModule04Visual: VisualRenderer = emptyVisual;
export let renderEntModule05Visual: VisualRenderer = emptyVisual;
export let renderEcomModule01Visual: VisualRenderer = emptyVisual;
export let renderEcomModule02Visual: VisualRenderer = emptyVisual;
export let renderEcomModule03Visual: VisualRenderer = emptyVisual;
export let renderEcomModule04Visual: VisualRenderer = emptyVisual;
export let renderEcomModule05Visual: VisualRenderer = emptyVisual;
export let renderGamingModule01Visual: VisualRenderer = emptyVisual;
export let renderGamingModule02Visual: VisualRenderer = emptyVisual;
export let renderGamingModule03Visual: VisualRenderer = emptyVisual;
export let renderGamingModule04Visual: VisualRenderer = emptyVisual;
export let renderGamingModule05Visual: VisualRenderer = emptyVisual;
export let renderElectronicsModule01Visual: VisualRenderer = emptyVisual;
export let renderElectronicsModule02Visual: VisualRenderer = emptyVisual;
export let renderElectronicsModule03Visual: VisualRenderer = emptyVisual;
export let renderElectronicsModule04Visual: VisualRenderer = emptyVisual;
export let renderElectronicsModule05Visual: VisualRenderer = emptyVisual;
export let renderTelecomModule01Visual: VisualRenderer = emptyVisual;
export let renderTelecomModule02Visual: VisualRenderer = emptyVisual;
export let renderTelecomModule03Visual: VisualRenderer = emptyVisual;
export let renderTelecomModule04Visual: VisualRenderer = emptyVisual;
export let renderTelecomModule05Visual: VisualRenderer = emptyVisual;
export let renderAdtechModule01Visual: VisualRenderer = emptyVisual;
export let renderAdtechModule02Visual: VisualRenderer = emptyVisual;
export let renderAdtechModule03Visual: VisualRenderer = emptyVisual;
export let renderAdtechModule04Visual: VisualRenderer = emptyVisual;
export let renderAdtechModule05Visual: VisualRenderer = emptyVisual;
export let renderMfgElectronicsModule01Visual: VisualRenderer = emptyVisual;
export let renderMfgElectronicsModule02Visual: VisualRenderer = emptyVisual;
export let renderMfgElectronicsModule03Visual: VisualRenderer = emptyVisual;
export let renderMfgElectronicsModule04Visual: VisualRenderer = emptyVisual;
export let renderMfgElectronicsModule05Visual: VisualRenderer = emptyVisual;
export let renderMfgMachineryModule01Visual: VisualRenderer = emptyVisual;
export let renderMfgMachineryModule02Visual: VisualRenderer = emptyVisual;
export let renderMfgMachineryModule03Visual: VisualRenderer = emptyVisual;
export let renderMfgMachineryModule04Visual: VisualRenderer = emptyVisual;
export let renderMfgMachineryModule05Visual: VisualRenderer = emptyVisual;
export let renderMfgElectricalModule01Visual: VisualRenderer = emptyVisual;
export let renderMfgElectricalModule02Visual: VisualRenderer = emptyVisual;
export let renderMfgElectricalModule03Visual: VisualRenderer = emptyVisual;
export let renderMfgElectricalModule04Visual: VisualRenderer = emptyVisual;
export let renderMfgElectricalModule05Visual: VisualRenderer = emptyVisual;
export let renderMfgTextilesModule01Visual: VisualRenderer = emptyVisual;
export let renderMfgTextilesModule02Visual: VisualRenderer = emptyVisual;
export let renderMfgTextilesModule03Visual: VisualRenderer = emptyVisual;
export let renderMfgTextilesModule04Visual: VisualRenderer = emptyVisual;
export let renderMfgTextilesModule05Visual: VisualRenderer = emptyVisual;
export let renderMfgBuildingModule01Visual: VisualRenderer = emptyVisual;
export let renderMfgBuildingModule02Visual: VisualRenderer = emptyVisual;
export let renderMfgBuildingModule03Visual: VisualRenderer = emptyVisual;
export let renderMfgBuildingModule04Visual: VisualRenderer = emptyVisual;
export let renderMfgBuildingModule05Visual: VisualRenderer = emptyVisual;
export let renderMfgPackagingModule01Visual: VisualRenderer = emptyVisual;
export let renderMfgPackagingModule02Visual: VisualRenderer = emptyVisual;
export let renderMfgPackagingModule03Visual: VisualRenderer = emptyVisual;
export let renderMfgPackagingModule04Visual: VisualRenderer = emptyVisual;
export let renderMfgPackagingModule05Visual: VisualRenderer = emptyVisual;
export let renderLogisticsFreightModule01Visual: VisualRenderer = emptyVisual;
export let renderLogisticsFreightModule02Visual: VisualRenderer = emptyVisual;
export let renderLogisticsFreightModule03Visual: VisualRenderer = emptyVisual;
export let renderLogisticsFreightModule04Visual: VisualRenderer = emptyVisual;
export let renderLogisticsFreightModule05Visual: VisualRenderer = emptyVisual;
export let renderLogisticsContractModule01Visual: VisualRenderer = emptyVisual;
export let renderLogisticsContractModule02Visual: VisualRenderer = emptyVisual;
export let renderLogisticsContractModule03Visual: VisualRenderer = emptyVisual;
export let renderLogisticsContractModule04Visual: VisualRenderer = emptyVisual;
export let renderLogisticsContractModule05Visual: VisualRenderer = emptyVisual;
export let renderLogisticsExpressModule01Visual: VisualRenderer = emptyVisual;
export let renderLogisticsExpressModule02Visual: VisualRenderer = emptyVisual;
export let renderLogisticsExpressModule03Visual: VisualRenderer = emptyVisual;
export let renderLogisticsExpressModule04Visual: VisualRenderer = emptyVisual;
export let renderLogisticsExpressModule05Visual: VisualRenderer = emptyVisual;
export let renderLogisticsDistributionModule01Visual: VisualRenderer = emptyVisual;
export let renderLogisticsDistributionModule02Visual: VisualRenderer = emptyVisual;
export let renderLogisticsDistributionModule03Visual: VisualRenderer = emptyVisual;
export let renderLogisticsDistributionModule04Visual: VisualRenderer = emptyVisual;
export let renderLogisticsDistributionModule05Visual: VisualRenderer = emptyVisual;
export let renderAgriLivestockModule01Visual: VisualRenderer = emptyVisual;
export let renderAgriLivestockModule02Visual: VisualRenderer = emptyVisual;
export let renderAgriLivestockModule03Visual: VisualRenderer = emptyVisual;
export let renderAgriLivestockModule04Visual: VisualRenderer = emptyVisual;
export let renderAgriLivestockModule05Visual: VisualRenderer = emptyVisual;
export let renderAgriCommoditiesModule01Visual: VisualRenderer = emptyVisual;
export let renderAgriCommoditiesModule02Visual: VisualRenderer = emptyVisual;
export let renderAgriCommoditiesModule03Visual: VisualRenderer = emptyVisual;
export let renderAgriCommoditiesModule04Visual: VisualRenderer = emptyVisual;
export let renderAgriCommoditiesModule05Visual: VisualRenderer = emptyVisual;
export let renderAgriCropModule01Visual: VisualRenderer = emptyVisual;
export let renderAgriCropModule02Visual: VisualRenderer = emptyVisual;
export let renderAgriCropModule03Visual: VisualRenderer = emptyVisual;
export let renderAgriCropModule04Visual: VisualRenderer = emptyVisual;
export let renderAgriCropModule05Visual: VisualRenderer = emptyVisual;
export let renderRealEstateDevelopmentModule01Visual: VisualRenderer = emptyVisual;
export let renderRealEstateDevelopmentModule02Visual: VisualRenderer = emptyVisual;
export let renderRealEstateDevelopmentModule03Visual: VisualRenderer = emptyVisual;
export let renderRealEstateDevelopmentModule04Visual: VisualRenderer = emptyVisual;
export let renderRealEstateDevelopmentModule05Visual: VisualRenderer = emptyVisual;
export let renderRealEstateAdvisoryModule01Visual: VisualRenderer = emptyVisual;
export let renderRealEstateAdvisoryModule02Visual: VisualRenderer = emptyVisual;
export let renderRealEstateAdvisoryModule03Visual: VisualRenderer = emptyVisual;
export let renderRealEstateAdvisoryModule04Visual: VisualRenderer = emptyVisual;
export let renderRealEstateAdvisoryModule05Visual: VisualRenderer = emptyVisual;
export let renderRealEstateProptechModule01Visual: VisualRenderer = emptyVisual;
export let renderRealEstateProptechModule02Visual: VisualRenderer = emptyVisual;
export let renderRealEstateProptechModule03Visual: VisualRenderer = emptyVisual;
export let renderRealEstateProptechModule04Visual: VisualRenderer = emptyVisual;
export let renderRealEstateProptechModule05Visual: VisualRenderer = emptyVisual;
export let renderHospitalityHotelsModule01Visual: VisualRenderer = emptyVisual;
export let renderHospitalityHotelsModule02Visual: VisualRenderer = emptyVisual;
export let renderHospitalityHotelsModule03Visual: VisualRenderer = emptyVisual;
export let renderHospitalityHotelsModule04Visual: VisualRenderer = emptyVisual;
export let renderHospitalityHotelsModule05Visual: VisualRenderer = emptyVisual;
export let renderHospitalityRestaurantsModule01Visual: VisualRenderer = emptyVisual;
export let renderHospitalityRestaurantsModule02Visual: VisualRenderer = emptyVisual;
export let renderHospitalityRestaurantsModule03Visual: VisualRenderer = emptyVisual;
export let renderHospitalityRestaurantsModule04Visual: VisualRenderer = emptyVisual;
export let renderHospitalityRestaurantsModule05Visual: VisualRenderer = emptyVisual;
export let renderHealthcareProductsModule01Visual: VisualRenderer = emptyVisual;
export let renderHealthcareProductsModule02Visual: VisualRenderer = emptyVisual;
export let renderHealthcareProductsModule03Visual: VisualRenderer = emptyVisual;
export let renderHealthcareProductsModule04Visual: VisualRenderer = emptyVisual;
export let renderHealthcareProductsModule05Visual: VisualRenderer = emptyVisual;
export let renderProfessionalAuditModule01Visual: VisualRenderer = emptyVisual;
export let renderProfessionalAuditModule02Visual: VisualRenderer = emptyVisual;
export let renderProfessionalAuditModule03Visual: VisualRenderer = emptyVisual;
export let renderProfessionalAuditModule04Visual: VisualRenderer = emptyVisual;
export let renderProfessionalAuditModule05Visual: VisualRenderer = emptyVisual;
export let renderProfessionalConsultingModule01Visual: VisualRenderer = emptyVisual;
export let renderProfessionalConsultingModule02Visual: VisualRenderer = emptyVisual;
export let renderProfessionalConsultingModule03Visual: VisualRenderer = emptyVisual;
export let renderProfessionalConsultingModule04Visual: VisualRenderer = emptyVisual;
export let renderProfessionalConsultingModule05Visual: VisualRenderer = emptyVisual;
export let renderProfessionalAdvisoryModule01Visual: VisualRenderer = emptyVisual;
export let renderProfessionalAdvisoryModule02Visual: VisualRenderer = emptyVisual;
export let renderProfessionalAdvisoryModule03Visual: VisualRenderer = emptyVisual;
export let renderProfessionalAdvisoryModule04Visual: VisualRenderer = emptyVisual;
export let renderProfessionalAdvisoryModule05Visual: VisualRenderer = emptyVisual;
export let renderSocialModule01Visual: VisualRenderer = emptyVisual;
export let renderSocialModule02Visual: VisualRenderer = emptyVisual;
export let renderSocialModule03Visual: VisualRenderer = emptyVisual;
export let renderSocialModule04Visual: VisualRenderer = emptyVisual;
export let renderSocialModule05Visual: VisualRenderer = emptyVisual;
export let renderConsumerFinanceModule01Visual: VisualRenderer = emptyVisual;
export let renderConsumerFinanceModule02Visual: VisualRenderer = emptyVisual;
export let renderConsumerFinanceModule03Visual: VisualRenderer = emptyVisual;
export let renderConsumerFinanceModule04Visual: VisualRenderer = emptyVisual;
export let renderConsumerFinanceModule05Visual: VisualRenderer = emptyVisual;
export let renderLifeInsuranceModule01Visual: VisualRenderer = emptyVisual;
export let renderLifeInsuranceModule02Visual: VisualRenderer = emptyVisual;
export let renderLifeInsuranceModule03Visual: VisualRenderer = emptyVisual;
export let renderLifeInsuranceModule04Visual: VisualRenderer = emptyVisual;
export let renderLifeInsuranceModule05Visual: VisualRenderer = emptyVisual;
export let renderPaymentsFintechModule01Visual: VisualRenderer = emptyVisual;
export let renderPaymentsFintechModule02Visual: VisualRenderer = emptyVisual;
export let renderPaymentsFintechModule03Visual: VisualRenderer = emptyVisual;
export let renderPaymentsFintechModule04Visual: VisualRenderer = emptyVisual;
export let renderPaymentsFintechModule05Visual: VisualRenderer = emptyVisual;
export let renderCommercialBankingVisual: VisualRenderer = emptyVisual;

const MODULE_TITLES = [
  'How the Industry Works',
  'How Value Moves Through the Industry',
  'How Companies Make Money',
  'Who Competes—and Why They Win',
  'What Is Changing Next',
] as const;

type Target = {
  load: () => Promise<any>;
  prefix: string;
  decks: AnyMap;
  quizzes: AnyMap;
  takeaways: AnyMap;
  lessons?: LessonRow[];
  setVisual?: (renderer: VisualRenderer) => void;
  setExtra?: (mod: AnyMap) => void;
  banking?: boolean;
};

function target(
  load: () => Promise<any>,
  prefix: string,
  decks: AnyMap,
  quizzes: AnyMap,
  takeaways: AnyMap,
  options: Omit<Target, 'load' | 'prefix' | 'decks' | 'quizzes' | 'takeaways'> = {},
): Target {
  return { load, prefix, decks, quizzes, takeaways, ...options };
}

function route(industryId: string, moduleIndex: number) {
  return `${industryId}::${MODULE_TITLES[moduleIndex - 1]}`;
}

const TARGETS: Record<string, Target> = {
  [route('banking-commercial', 1)]: target(() => import('./commercialBankingM01'), 'COMMERCIAL_BANKING_MODULE01', COMMERCIAL_BANKING_MODULE01_DECKS, COMMERCIAL_BANKING_MODULE01_QUIZZES, COMMERCIAL_BANKING_MODULE01_TAKEAWAYS, { lessons: COMMERCIAL_BANKING_MODULE01_LESSONS, banking: true }),
  [route('banking-commercial', 2)]: target(() => import('./commercialBankingM02'), 'COMMERCIAL_BANKING_MODULE02', COMMERCIAL_BANKING_MODULE02_DECKS, COMMERCIAL_BANKING_MODULE02_QUIZZES, COMMERCIAL_BANKING_MODULE02_TAKEAWAYS, { lessons: COMMERCIAL_BANKING_MODULE02_LESSONS, banking: true }),
  [route('banking-commercial', 3)]: target(() => import('./commercialBankingM03'), 'COMMERCIAL_BANKING_MODULE03', COMMERCIAL_BANKING_MODULE03_DECKS, COMMERCIAL_BANKING_MODULE03_QUIZZES, COMMERCIAL_BANKING_MODULE03_TAKEAWAYS, { lessons: COMMERCIAL_BANKING_MODULE03_LESSONS, banking: true }),
  [route('banking-commercial', 4)]: target(() => import('./commercialBankingM04'), 'COMMERCIAL_BANKING_MODULE04', COMMERCIAL_BANKING_MODULE04_DECKS, COMMERCIAL_BANKING_MODULE04_QUIZZES, COMMERCIAL_BANKING_MODULE04_TAKEAWAYS, { lessons: COMMERCIAL_BANKING_MODULE04_LESSONS, banking: true }),
  [route('banking-commercial', 5)]: target(() => import('./commercialBankingM05'), 'COMMERCIAL_BANKING_MODULE05', COMMERCIAL_BANKING_MODULE05_DECKS, COMMERCIAL_BANKING_MODULE05_QUIZZES, COMMERCIAL_BANKING_MODULE05_TAKEAWAYS, { lessons: COMMERCIAL_BANKING_MODULE05_LESSONS, banking: true, setExtra: (mod) => { COMMERCIAL_BANKING_MODULE05_LEGAL_STATUS = String(mod.COMMERCIAL_BANKING_MODULE05_LEGAL_STATUS ?? ''); } }),
  [route('banking-consumer-finance', 1)]: target(() => import('./consumerFinanceModule01'), 'CONSUMER_FINANCE_MODULE01', CONSUMER_FINANCE_MODULE01_DECKS, CONSUMER_FINANCE_MODULE01_QUIZZES, CONSUMER_FINANCE_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderConsumerFinanceModule01Visual = renderer; } }),
  [route('banking-consumer-finance', 2)]: target(() => import('./consumerFinanceModule02'), 'CONSUMER_FINANCE_MODULE02', CONSUMER_FINANCE_MODULE02_DECKS, CONSUMER_FINANCE_MODULE02_QUIZZES, CONSUMER_FINANCE_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderConsumerFinanceModule02Visual = renderer; } }),
  [route('banking-consumer-finance', 3)]: target(() => import('./consumerFinanceModule03'), 'CONSUMER_FINANCE_MODULE03', CONSUMER_FINANCE_MODULE03_DECKS, CONSUMER_FINANCE_MODULE03_QUIZZES, CONSUMER_FINANCE_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderConsumerFinanceModule03Visual = renderer; } }),
  [route('banking-consumer-finance', 4)]: target(() => import('./consumerFinanceModule04'), 'CONSUMER_FINANCE_MODULE04', CONSUMER_FINANCE_MODULE04_DECKS, CONSUMER_FINANCE_MODULE04_QUIZZES, CONSUMER_FINANCE_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderConsumerFinanceModule04Visual = renderer; } }),
  [route('banking-consumer-finance', 5)]: target(() => import('./consumerFinanceModule05'), 'CONSUMER_FINANCE_MODULE05', CONSUMER_FINANCE_MODULE05_DECKS, CONSUMER_FINANCE_MODULE05_QUIZZES, CONSUMER_FINANCE_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderConsumerFinanceModule05Visual = renderer; } }),
  [route('banking-insurance', 1)]: target(() => import('./lifeInsuranceModule01'), 'LIFE_INSURANCE_MODULE01', LIFE_INSURANCE_MODULE01_DECKS, LIFE_INSURANCE_MODULE01_QUIZZES, LIFE_INSURANCE_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderLifeInsuranceModule01Visual = renderer; } }),
  [route('banking-insurance', 2)]: target(() => import('./lifeInsuranceModule02'), 'LIFE_INSURANCE_MODULE02', LIFE_INSURANCE_MODULE02_DECKS, LIFE_INSURANCE_MODULE02_QUIZZES, LIFE_INSURANCE_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderLifeInsuranceModule02Visual = renderer; } }),
  [route('banking-insurance', 3)]: target(() => import('./lifeInsuranceModule03'), 'LIFE_INSURANCE_MODULE03', LIFE_INSURANCE_MODULE03_DECKS, LIFE_INSURANCE_MODULE03_QUIZZES, LIFE_INSURANCE_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderLifeInsuranceModule03Visual = renderer; } }),
  [route('banking-insurance', 4)]: target(() => import('./lifeInsuranceModule04'), 'LIFE_INSURANCE_MODULE04', LIFE_INSURANCE_MODULE04_DECKS, LIFE_INSURANCE_MODULE04_QUIZZES, LIFE_INSURANCE_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderLifeInsuranceModule04Visual = renderer; } }),
  [route('banking-insurance', 5)]: target(() => import('./lifeInsuranceModule05'), 'LIFE_INSURANCE_MODULE05', LIFE_INSURANCE_MODULE05_DECKS, LIFE_INSURANCE_MODULE05_QUIZZES, LIFE_INSURANCE_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderLifeInsuranceModule05Visual = renderer; } }),
  [route('banking-fintech', 1)]: target(() => import('./paymentsFintechModule01'), 'PAYMENTS_FINTECH_MODULE01', PAYMENTS_FINTECH_MODULE01_DECKS, PAYMENTS_FINTECH_MODULE01_QUIZZES, PAYMENTS_FINTECH_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderPaymentsFintechModule01Visual = renderer; } }),
  [route('banking-fintech', 2)]: target(() => import('./paymentsFintechModule02'), 'PAYMENTS_FINTECH_MODULE02', PAYMENTS_FINTECH_MODULE02_DECKS, PAYMENTS_FINTECH_MODULE02_QUIZZES, PAYMENTS_FINTECH_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderPaymentsFintechModule02Visual = renderer; } }),
  [route('banking-fintech', 3)]: target(() => import('./paymentsFintechModule03'), 'PAYMENTS_FINTECH_MODULE03', PAYMENTS_FINTECH_MODULE03_DECKS, PAYMENTS_FINTECH_MODULE03_QUIZZES, PAYMENTS_FINTECH_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderPaymentsFintechModule03Visual = renderer; } }),
  [route('banking-fintech', 4)]: target(() => import('./paymentsFintechModule04'), 'PAYMENTS_FINTECH_MODULE04', PAYMENTS_FINTECH_MODULE04_DECKS, PAYMENTS_FINTECH_MODULE04_QUIZZES, PAYMENTS_FINTECH_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderPaymentsFintechModule04Visual = renderer; } }),
  [route('banking-fintech', 5)]: target(() => import('./paymentsFintechModule05'), 'PAYMENTS_FINTECH_MODULE05', PAYMENTS_FINTECH_MODULE05_DECKS, PAYMENTS_FINTECH_MODULE05_QUIZZES, PAYMENTS_FINTECH_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderPaymentsFintechModule05Visual = renderer; } }),

  [route('fmcg-beverages-na', 2)]: target(() => import('./nabModule02'), 'NAB_MODULE02', NAB_MODULE02_DECKS, NAB_MODULE02_QUIZZES, NAB_MODULE02_TAKEAWAYS, { lessons: NAB_MODULE02_LESSONS, setVisual: (renderer) => { renderNabModule02Visual = renderer; } }),
  [route('fmcg-beverages-na', 3)]: target(() => import('./nabModule03'), 'NAB_MODULE03', NAB_MODULE03_DECKS, NAB_MODULE03_QUIZZES, NAB_MODULE03_TAKEAWAYS, { lessons: NAB_MODULE03_LESSONS, setVisual: (renderer) => { renderNabModule03Visual = renderer; } }),
  [route('fmcg-beverages-na', 4)]: target(() => import('./nabModule04'), 'NAB_MODULE04', NAB_MODULE04_DECKS, NAB_MODULE04_QUIZZES, NAB_MODULE04_TAKEAWAYS, { lessons: NAB_MODULE04_LESSONS, setVisual: (renderer) => { renderNabModule04Visual = renderer; } }),
  [route('fmcg-beverages-na', 5)]: target(() => import('./nabModule05'), 'NAB_MODULE05', NAB_MODULE05_DECKS, NAB_MODULE05_QUIZZES, NAB_MODULE05_TAKEAWAYS, { lessons: NAB_MODULE05_LESSONS, setVisual: (renderer) => { renderNabModule05Visual = renderer; } }),

  [route('fmcg-beverages-alc', 1)]: target(() => import('./beerModule01'), 'BEER_MODULE01', BEER_MODULE01_DECKS, BEER_MODULE01_QUIZZES, BEER_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderBeerModule01Visual = renderer; } }),
  [route('fmcg-beverages-alc', 2)]: target(() => import('./beerModule02'), 'BEER_MODULE02', BEER_MODULE02_DECKS, BEER_MODULE02_QUIZZES, BEER_MODULE02_TAKEAWAYS, { lessons: BEER_MODULE02_LESSONS, setVisual: (renderer) => { renderBeerModule02Visual = renderer; } }),
  [route('fmcg-beverages-alc', 3)]: target(() => import('./beerModule03'), 'BEER_MODULE03', BEER_MODULE03_DECKS, BEER_MODULE03_QUIZZES, BEER_MODULE03_TAKEAWAYS, { lessons: BEER_MODULE03_LESSONS, setVisual: (renderer) => { renderBeerModule03Visual = renderer; } }),
  [route('fmcg-beverages-alc', 4)]: target(() => import('./beerModule04'), 'BEER_MODULE04', BEER_MODULE04_DECKS, BEER_MODULE04_QUIZZES, BEER_MODULE04_TAKEAWAYS, { lessons: BEER_MODULE04_LESSONS, setVisual: (renderer) => { renderBeerModule04Visual = renderer; } }),
  [route('fmcg-beverages-alc', 5)]: target(() => import('./beerModule05'), 'BEER_MODULE05', BEER_MODULE05_DECKS, BEER_MODULE05_QUIZZES, BEER_MODULE05_TAKEAWAYS, { lessons: BEER_MODULE05_LESSONS, setVisual: (renderer) => { renderBeerModule05Visual = renderer; } }),

  [route('fmcg-packaged-food', 1)]: target(() => import('./packagedFoodModule01'), 'PACKAGED_FOOD_MODULE01', PACKAGED_FOOD_MODULE01_DECKS, PACKAGED_FOOD_MODULE01_QUIZZES, PACKAGED_FOOD_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderPackagedFoodModule01Visual = renderer; } }),
  [route('fmcg-packaged-food', 2)]: target(() => import('./packagedFoodModule02'), 'PACKAGED_FOOD_MODULE02', PACKAGED_FOOD_MODULE02_DECKS, PACKAGED_FOOD_MODULE02_QUIZZES, PACKAGED_FOOD_MODULE02_TAKEAWAYS, { lessons: PACKAGED_FOOD_MODULE02_LESSONS, setVisual: (renderer) => { renderPackagedFoodM2Visual = renderer; } }),
  [route('fmcg-packaged-food', 3)]: target(() => import('./packagedFoodModule03'), 'PACKAGED_FOOD_MODULE03', PACKAGED_FOOD_MODULE03_DECKS, PACKAGED_FOOD_MODULE03_QUIZZES, PACKAGED_FOOD_MODULE03_TAKEAWAYS, { lessons: PACKAGED_FOOD_MODULE03_LESSONS, setVisual: (renderer) => { renderPackagedFoodM3Visual = renderer; } }),
  [route('fmcg-packaged-food', 4)]: target(() => import('./packagedFoodModule04'), 'PACKAGED_FOOD_MODULE04', PACKAGED_FOOD_MODULE04_DECKS, PACKAGED_FOOD_MODULE04_QUIZZES, PACKAGED_FOOD_MODULE04_TAKEAWAYS, { lessons: PACKAGED_FOOD_MODULE04_LESSONS, setVisual: (renderer) => { renderPackagedFoodM4Visual = renderer; } }),
  [route('fmcg-packaged-food', 5)]: target(() => import('./packagedFoodModule05'), 'PACKAGED_FOOD_MODULE05', PACKAGED_FOOD_MODULE05_DECKS, PACKAGED_FOOD_MODULE05_QUIZZES, PACKAGED_FOOD_MODULE05_TAKEAWAYS, { lessons: PACKAGED_FOOD_MODULE05_LESSONS, setVisual: (renderer) => { renderPackagedFoodM5Visual = renderer; } }),

  [route('retail-fashion', 1)]: target(() => import('./fashionModule01'), 'FASHION_MODULE01', FASHION_MODULE01_DECKS, FASHION_MODULE01_QUIZZES, FASHION_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderFashionModule01Visual = renderer; } }),
  [route('retail-fashion', 2)]: target(() => import('./fashionModule02'), 'FASHION_MODULE02', FASHION_MODULE02_DECKS, FASHION_MODULE02_QUIZZES, FASHION_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderFashionModule02Visual = renderer; } }),
  [route('retail-fashion', 3)]: target(() => import('./fashionModule03'), 'FASHION_MODULE03', FASHION_MODULE03_DECKS, FASHION_MODULE03_QUIZZES, FASHION_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderFashionModule03Visual = renderer; } }),
  [route('retail-fashion', 4)]: target(() => import('./fashionModule04'), 'FASHION_MODULE04', FASHION_MODULE04_DECKS, FASHION_MODULE04_QUIZZES, FASHION_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderFashionModule04Visual = renderer; } }),
  [route('retail-fashion', 5)]: target(() => import('./fashionModule05'), 'FASHION_MODULE05', FASHION_MODULE05_DECKS, FASHION_MODULE05_QUIZZES, FASHION_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderFashionModule05Visual = renderer; } }),

  [route('retail-grocery', 1)]: target(() => import('./groceryModule01'), 'GROCERY_MODULE01', GROCERY_MODULE01_DECKS, GROCERY_MODULE01_QUIZZES, GROCERY_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderGroceryModule01Visual = renderer; } }),
  [route('retail-grocery', 2)]: target(() => import('./groceryModule02'), 'GROCERY_MODULE02', GROCERY_MODULE02_DECKS, GROCERY_MODULE02_QUIZZES, GROCERY_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderGroceryModule02Visual = renderer; } }),
  [route('retail-grocery', 3)]: target(() => import('./groceryModule03'), 'GROCERY_MODULE03', GROCERY_MODULE03_DECKS, GROCERY_MODULE03_QUIZZES, GROCERY_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderGroceryModule03Visual = renderer; } }),
  [route('retail-grocery', 4)]: target(() => import('./groceryModule04'), 'GROCERY_MODULE04', GROCERY_MODULE04_DECKS, GROCERY_MODULE04_QUIZZES, GROCERY_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderGroceryModule04Visual = renderer; } }),
  [route('retail-grocery', 5)]: target(() => import('./groceryModule05'), 'GROCERY_MODULE05', GROCERY_MODULE05_DECKS, GROCERY_MODULE05_QUIZZES, GROCERY_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderGroceryModule05Visual = renderer; } }),

  [route('retail-pharmacy', 1)]: target(() => import('./pharmacyModule01'), 'PHARMACY_MODULE01', PHARMACY_MODULE01_DECKS, PHARMACY_MODULE01_QUIZZES, PHARMACY_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderPharmacyModule01Visual = renderer; } }),
  [route('retail-pharmacy', 2)]: target(() => import('./pharmacyModule02'), 'PHARMACY_MODULE02', PHARMACY_MODULE02_DECKS, PHARMACY_MODULE02_QUIZZES, PHARMACY_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderPharmacyModule02Visual = renderer; } }),
  [route('retail-pharmacy', 3)]: target(() => import('./pharmacyModule03'), 'PHARMACY_MODULE03', PHARMACY_MODULE03_DECKS, PHARMACY_MODULE03_QUIZZES, PHARMACY_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderPharmacyModule03Visual = renderer; } }),
  [route('retail-pharmacy', 4)]: target(() => import('./pharmacyModule04'), 'PHARMACY_MODULE04', PHARMACY_MODULE04_DECKS, PHARMACY_MODULE04_QUIZZES, PHARMACY_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderPharmacyModule04Visual = renderer; } }),
  [route('retail-pharmacy', 5)]: target(() => import('./pharmacyModule05'), 'PHARMACY_MODULE05', PHARMACY_MODULE05_DECKS, PHARMACY_MODULE05_QUIZZES, PHARMACY_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderPharmacyModule05Visual = renderer; } }),

  [route('retail-coffee', 1)]: target(() => import('./coffeeModule01'), 'COFFEE_MODULE01', COFFEE_MODULE01_DECKS, COFFEE_MODULE01_QUIZZES, COFFEE_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderCoffeeModule01Visual = renderer; } }),
  [route('retail-coffee', 2)]: target(() => import('./coffeeModule02'), 'COFFEE_MODULE02', COFFEE_MODULE02_DECKS, COFFEE_MODULE02_QUIZZES, COFFEE_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderCoffeeModule02Visual = renderer; } }),
  [route('retail-coffee', 3)]: target(() => import('./coffeeModule03'), 'COFFEE_MODULE03', COFFEE_MODULE03_DECKS, COFFEE_MODULE03_QUIZZES, COFFEE_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderCoffeeModule03Visual = renderer; } }),
  [route('retail-coffee', 4)]: target(() => import('./coffeeModule04'), 'COFFEE_MODULE04', COFFEE_MODULE04_DECKS, COFFEE_MODULE04_QUIZZES, COFFEE_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderCoffeeModule04Visual = renderer; } }),
  [route('retail-coffee', 5)]: target(() => import('./coffeeModule05'), 'COFFEE_MODULE05', COFFEE_MODULE05_DECKS, COFFEE_MODULE05_QUIZZES, COFFEE_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderCoffeeModule05Visual = renderer; } }),

  [route('tech-enterprise-sw', 1)]: target(() => import('./entModule01'), 'ENT_MODULE01', ENT_MODULE01_DECKS, ENT_MODULE01_QUIZZES, ENT_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderEntModule01Visual = renderer; } }),
  [route('tech-enterprise-sw', 2)]: target(() => import('./entModule02'), 'ENT_MODULE02', ENT_MODULE02_DECKS, ENT_MODULE02_QUIZZES, ENT_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderEntModule02Visual = renderer; } }),
  [route('tech-enterprise-sw', 3)]: target(() => import('./entModule03'), 'ENT_MODULE03', ENT_MODULE03_DECKS, ENT_MODULE03_QUIZZES, ENT_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderEntModule03Visual = renderer; } }),
  [route('tech-enterprise-sw', 4)]: target(() => import('./entModule04'), 'ENT_MODULE04', ENT_MODULE04_DECKS, ENT_MODULE04_QUIZZES, ENT_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderEntModule04Visual = renderer; } }),
  [route('tech-enterprise-sw', 5)]: target(() => import('./entModule05'), 'ENT_MODULE05', ENT_MODULE05_DECKS, ENT_MODULE05_QUIZZES, ENT_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderEntModule05Visual = renderer; } }),

  [route('tech-ecommerce', 1)]: target(() => import('./ecomModule01'), 'ECOM_MODULE01', ECOM_MODULE01_DECKS, ECOM_MODULE01_QUIZZES, ECOM_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderEcomModule01Visual = renderer; } }),
  [route('tech-ecommerce', 2)]: target(() => import('./ecomModule02'), 'ECOM_MODULE02', ECOM_MODULE02_DECKS, ECOM_MODULE02_QUIZZES, ECOM_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderEcomModule02Visual = renderer; } }),
  [route('tech-ecommerce', 3)]: target(() => import('./ecomModule03'), 'ECOM_MODULE03', ECOM_MODULE03_DECKS, ECOM_MODULE03_QUIZZES, ECOM_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderEcomModule03Visual = renderer; } }),
  [route('tech-ecommerce', 4)]: target(() => import('./ecomModule04'), 'ECOM_MODULE04', ECOM_MODULE04_DECKS, ECOM_MODULE04_QUIZZES, ECOM_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderEcomModule04Visual = renderer; } }),
  [route('tech-ecommerce', 5)]: target(() => import('./ecomModule05'), 'ECOM_MODULE05', ECOM_MODULE05_DECKS, ECOM_MODULE05_QUIZZES, ECOM_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderEcomModule05Visual = renderer; } }),
  [route('tech-gaming', 1)]: target(() => import('./gamingModule01'), 'GAMING_MODULE01', GAMING_MODULE01_DECKS, GAMING_MODULE01_QUIZZES, GAMING_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderGamingModule01Visual = renderer; } }),
  [route('tech-gaming', 2)]: target(() => import('./gamingModule02'), 'GAMING_MODULE02', GAMING_MODULE02_DECKS, GAMING_MODULE02_QUIZZES, GAMING_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderGamingModule02Visual = renderer; } }),
  [route('tech-gaming', 3)]: target(() => import('./gamingModule03'), 'GAMING_MODULE03', GAMING_MODULE03_DECKS, GAMING_MODULE03_QUIZZES, GAMING_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderGamingModule03Visual = renderer; } }),
  [route('tech-gaming', 4)]: target(() => import('./gamingModule04'), 'GAMING_MODULE04', GAMING_MODULE04_DECKS, GAMING_MODULE04_QUIZZES, GAMING_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderGamingModule04Visual = renderer; } }),
  [route('tech-gaming', 5)]: target(() => import('./gamingModule05'), 'GAMING_MODULE05', GAMING_MODULE05_DECKS, GAMING_MODULE05_QUIZZES, GAMING_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderGamingModule05Visual = renderer; } }),
  [route('tech-electronics', 1)]: target(() => import('./electronicsModule01'), 'ELECTRONICS_MODULE01', ELECTRONICS_MODULE01_DECKS, ELECTRONICS_MODULE01_QUIZZES, ELECTRONICS_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderElectronicsModule01Visual = renderer; } }),
  [route('tech-electronics', 2)]: target(() => import('./electronicsModule02'), 'ELECTRONICS_MODULE02', ELECTRONICS_MODULE02_DECKS, ELECTRONICS_MODULE02_QUIZZES, ELECTRONICS_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderElectronicsModule02Visual = renderer; } }),
  [route('tech-electronics', 3)]: target(() => import('./electronicsModule03'), 'ELECTRONICS_MODULE03', ELECTRONICS_MODULE03_DECKS, ELECTRONICS_MODULE03_QUIZZES, ELECTRONICS_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderElectronicsModule03Visual = renderer; } }),
  [route('tech-electronics', 4)]: target(() => import('./electronicsModule04'), 'ELECTRONICS_MODULE04', ELECTRONICS_MODULE04_DECKS, ELECTRONICS_MODULE04_QUIZZES, ELECTRONICS_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderElectronicsModule04Visual = renderer; } }),
  [route('tech-electronics', 5)]: target(() => import('./electronicsModule05'), 'ELECTRONICS_MODULE05', ELECTRONICS_MODULE05_DECKS, ELECTRONICS_MODULE05_QUIZZES, ELECTRONICS_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderElectronicsModule05Visual = renderer; } }),
  [route('tech-telecom', 1)]: target(() => import('./telecomModule01'), 'TELECOM_MODULE01', TELECOM_MODULE01_DECKS, TELECOM_MODULE01_QUIZZES, TELECOM_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderTelecomModule01Visual = renderer; } }),
  [route('tech-telecom', 2)]: target(() => import('./telecomModule02'), 'TELECOM_MODULE02', TELECOM_MODULE02_DECKS, TELECOM_MODULE02_QUIZZES, TELECOM_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderTelecomModule02Visual = renderer; } }),
  [route('tech-telecom', 3)]: target(() => import('./telecomModule03'), 'TELECOM_MODULE03', TELECOM_MODULE03_DECKS, TELECOM_MODULE03_QUIZZES, TELECOM_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderTelecomModule03Visual = renderer; } }),
  [route('tech-telecom', 4)]: target(() => import('./telecomModule04'), 'TELECOM_MODULE04', TELECOM_MODULE04_DECKS, TELECOM_MODULE04_QUIZZES, TELECOM_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderTelecomModule04Visual = renderer; } }),
  [route('tech-telecom', 5)]: target(() => import('./telecomModule05'), 'TELECOM_MODULE05', TELECOM_MODULE05_DECKS, TELECOM_MODULE05_QUIZZES, TELECOM_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderTelecomModule05Visual = renderer; } }),
  [route('tech-adtech', 1)]: target(() => import('./adtechModule01'), 'ADTECH_MODULE01', ADTECH_MODULE01_DECKS, ADTECH_MODULE01_QUIZZES, ADTECH_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderAdtechModule01Visual = renderer; } }),
  [route('tech-adtech', 2)]: target(() => import('./adtechModule02'), 'ADTECH_MODULE02', ADTECH_MODULE02_DECKS, ADTECH_MODULE02_QUIZZES, ADTECH_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderAdtechModule02Visual = renderer; } }),
  [route('tech-adtech', 3)]: target(() => import('./adtechModule03'), 'ADTECH_MODULE03', ADTECH_MODULE03_DECKS, ADTECH_MODULE03_QUIZZES, ADTECH_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderAdtechModule03Visual = renderer; } }),
  [route('tech-adtech', 4)]: target(() => import('./adtechModule04'), 'ADTECH_MODULE04', ADTECH_MODULE04_DECKS, ADTECH_MODULE04_QUIZZES, ADTECH_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderAdtechModule04Visual = renderer; } }),
  [route('tech-adtech', 5)]: target(() => import('./adtechModule05'), 'ADTECH_MODULE05', ADTECH_MODULE05_DECKS, ADTECH_MODULE05_QUIZZES, ADTECH_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderAdtechModule05Visual = renderer; } }),
  [route('tech-social', 1)]: target(() => import('./socialModule01'), 'SOCIAL_MODULE01', SOCIAL_MODULE01_DECKS, SOCIAL_MODULE01_QUIZZES, SOCIAL_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderSocialModule01Visual = renderer; } }),
  [route('tech-social', 2)]: target(() => import('./socialModule02'), 'SOCIAL_MODULE02', SOCIAL_MODULE02_DECKS, SOCIAL_MODULE02_QUIZZES, SOCIAL_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderSocialModule02Visual = renderer; } }),
  [route('tech-social', 3)]: target(() => import('./socialModule03'), 'SOCIAL_MODULE03', SOCIAL_MODULE03_DECKS, SOCIAL_MODULE03_QUIZZES, SOCIAL_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderSocialModule03Visual = renderer; } }),
  [route('tech-social', 4)]: target(() => import('./socialModule04'), 'SOCIAL_MODULE04', SOCIAL_MODULE04_DECKS, SOCIAL_MODULE04_QUIZZES, SOCIAL_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderSocialModule04Visual = renderer; } }),
  [route('tech-social', 5)]: target(() => import('./socialModule05'), 'SOCIAL_MODULE05', SOCIAL_MODULE05_DECKS, SOCIAL_MODULE05_QUIZZES, SOCIAL_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderSocialModule05Visual = renderer; } }),
  [route('mfg-electronics', 1)]: target(() => import('./mfgElectronicsModule01'), 'MFG_ELECTRONICS_MODULE01', MFG_ELECTRONICS_MODULE01_DECKS, MFG_ELECTRONICS_MODULE01_QUIZZES, MFG_ELECTRONICS_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderMfgElectronicsModule01Visual = renderer; } }),
  [route('mfg-electronics', 2)]: target(() => import('./mfgElectronicsModule02'), 'MFG_ELECTRONICS_MODULE02', MFG_ELECTRONICS_MODULE02_DECKS, MFG_ELECTRONICS_MODULE02_QUIZZES, MFG_ELECTRONICS_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderMfgElectronicsModule02Visual = renderer; } }),
  [route('mfg-electronics', 3)]: target(() => import('./mfgElectronicsModule03'), 'MFG_ELECTRONICS_MODULE03', MFG_ELECTRONICS_MODULE03_DECKS, MFG_ELECTRONICS_MODULE03_QUIZZES, MFG_ELECTRONICS_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderMfgElectronicsModule03Visual = renderer; } }),
  [route('mfg-electronics', 4)]: target(() => import('./mfgElectronicsModule04'), 'MFG_ELECTRONICS_MODULE04', MFG_ELECTRONICS_MODULE04_DECKS, MFG_ELECTRONICS_MODULE04_QUIZZES, MFG_ELECTRONICS_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderMfgElectronicsModule04Visual = renderer; } }),
  [route('mfg-electronics', 5)]: target(() => import('./mfgElectronicsModule05'), 'MFG_ELECTRONICS_MODULE05', MFG_ELECTRONICS_MODULE05_DECKS, MFG_ELECTRONICS_MODULE05_QUIZZES, MFG_ELECTRONICS_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderMfgElectronicsModule05Visual = renderer; } }),
  [route('mfg-machinery', 1)]: target(() => import('./mfgMachineryModule01'), 'MFG_MACHINERY_MODULE01', MFG_MACHINERY_MODULE01_DECKS, MFG_MACHINERY_MODULE01_QUIZZES, MFG_MACHINERY_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderMfgMachineryModule01Visual = renderer; } }),
  [route('mfg-machinery', 2)]: target(() => import('./mfgMachineryModule02'), 'MFG_MACHINERY_MODULE02', MFG_MACHINERY_MODULE02_DECKS, MFG_MACHINERY_MODULE02_QUIZZES, MFG_MACHINERY_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderMfgMachineryModule02Visual = renderer; } }),
  [route('mfg-machinery', 3)]: target(() => import('./mfgMachineryModule03'), 'MFG_MACHINERY_MODULE03', MFG_MACHINERY_MODULE03_DECKS, MFG_MACHINERY_MODULE03_QUIZZES, MFG_MACHINERY_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderMfgMachineryModule03Visual = renderer; } }),
  [route('mfg-machinery', 4)]: target(() => import('./mfgMachineryModule04'), 'MFG_MACHINERY_MODULE04', MFG_MACHINERY_MODULE04_DECKS, MFG_MACHINERY_MODULE04_QUIZZES, MFG_MACHINERY_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderMfgMachineryModule04Visual = renderer; } }),
  [route('mfg-machinery', 5)]: target(() => import('./mfgMachineryModule05'), 'MFG_MACHINERY_MODULE05', MFG_MACHINERY_MODULE05_DECKS, MFG_MACHINERY_MODULE05_QUIZZES, MFG_MACHINERY_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderMfgMachineryModule05Visual = renderer; } }),
  [route('mfg-electrical', 1)]: target(() => import('./mfgElectricalModule01'), 'MFG_ELECTRICAL_MODULE01', MFG_ELECTRICAL_MODULE01_DECKS, MFG_ELECTRICAL_MODULE01_QUIZZES, MFG_ELECTRICAL_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderMfgElectricalModule01Visual = renderer; } }),
  [route('mfg-electrical', 2)]: target(() => import('./mfgElectricalModule02'), 'MFG_ELECTRICAL_MODULE02', MFG_ELECTRICAL_MODULE02_DECKS, MFG_ELECTRICAL_MODULE02_QUIZZES, MFG_ELECTRICAL_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderMfgElectricalModule02Visual = renderer; } }),
  [route('mfg-electrical', 3)]: target(() => import('./mfgElectricalModule03'), 'MFG_ELECTRICAL_MODULE03', MFG_ELECTRICAL_MODULE03_DECKS, MFG_ELECTRICAL_MODULE03_QUIZZES, MFG_ELECTRICAL_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderMfgElectricalModule03Visual = renderer; } }),
  [route('mfg-electrical', 4)]: target(() => import('./mfgElectricalModule04'), 'MFG_ELECTRICAL_MODULE04', MFG_ELECTRICAL_MODULE04_DECKS, MFG_ELECTRICAL_MODULE04_QUIZZES, MFG_ELECTRICAL_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderMfgElectricalModule04Visual = renderer; } }),
  [route('mfg-electrical', 5)]: target(() => import('./mfgElectricalModule05'), 'MFG_ELECTRICAL_MODULE05', MFG_ELECTRICAL_MODULE05_DECKS, MFG_ELECTRICAL_MODULE05_QUIZZES, MFG_ELECTRICAL_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderMfgElectricalModule05Visual = renderer; } }),
  [route('mfg-textiles', 1)]: target(() => import('./mfgTextilesModule01'), 'MFG_TEXTILES_MODULE01', MFG_TEXTILES_MODULE01_DECKS, MFG_TEXTILES_MODULE01_QUIZZES, MFG_TEXTILES_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderMfgTextilesModule01Visual = renderer; } }),
  [route('mfg-textiles', 2)]: target(() => import('./mfgTextilesModule02'), 'MFG_TEXTILES_MODULE02', MFG_TEXTILES_MODULE02_DECKS, MFG_TEXTILES_MODULE02_QUIZZES, MFG_TEXTILES_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderMfgTextilesModule02Visual = renderer; } }),
  [route('mfg-textiles', 3)]: target(() => import('./mfgTextilesModule03'), 'MFG_TEXTILES_MODULE03', MFG_TEXTILES_MODULE03_DECKS, MFG_TEXTILES_MODULE03_QUIZZES, MFG_TEXTILES_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderMfgTextilesModule03Visual = renderer; } }),
  [route('mfg-textiles', 4)]: target(() => import('./mfgTextilesModule04'), 'MFG_TEXTILES_MODULE04', MFG_TEXTILES_MODULE04_DECKS, MFG_TEXTILES_MODULE04_QUIZZES, MFG_TEXTILES_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderMfgTextilesModule04Visual = renderer; } }),
  [route('mfg-textiles', 5)]: target(() => import('./mfgTextilesModule05'), 'MFG_TEXTILES_MODULE05', MFG_TEXTILES_MODULE05_DECKS, MFG_TEXTILES_MODULE05_QUIZZES, MFG_TEXTILES_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderMfgTextilesModule05Visual = renderer; } }),
  [route('mfg-building', 1)]: target(() => import('./mfgBuildingModule01'), 'MFG_BUILDING_MODULE01', MFG_BUILDING_MODULE01_DECKS, MFG_BUILDING_MODULE01_QUIZZES, MFG_BUILDING_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderMfgBuildingModule01Visual = renderer; } }),
  [route('mfg-building', 2)]: target(() => import('./mfgBuildingModule02'), 'MFG_BUILDING_MODULE02', MFG_BUILDING_MODULE02_DECKS, MFG_BUILDING_MODULE02_QUIZZES, MFG_BUILDING_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderMfgBuildingModule02Visual = renderer; } }),
  [route('mfg-building', 3)]: target(() => import('./mfgBuildingModule03'), 'MFG_BUILDING_MODULE03', MFG_BUILDING_MODULE03_DECKS, MFG_BUILDING_MODULE03_QUIZZES, MFG_BUILDING_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderMfgBuildingModule03Visual = renderer; } }),
  [route('mfg-building', 4)]: target(() => import('./mfgBuildingModule04'), 'MFG_BUILDING_MODULE04', MFG_BUILDING_MODULE04_DECKS, MFG_BUILDING_MODULE04_QUIZZES, MFG_BUILDING_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderMfgBuildingModule04Visual = renderer; } }),
  [route('mfg-building', 5)]: target(() => import('./mfgBuildingModule05'), 'MFG_BUILDING_MODULE05', MFG_BUILDING_MODULE05_DECKS, MFG_BUILDING_MODULE05_QUIZZES, MFG_BUILDING_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderMfgBuildingModule05Visual = renderer; } }),
  [route('mfg-packaging', 1)]: target(() => import('./mfgPackagingModule01'), 'MFG_PACKAGING_MODULE01', MFG_PACKAGING_MODULE01_DECKS, MFG_PACKAGING_MODULE01_QUIZZES, MFG_PACKAGING_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderMfgPackagingModule01Visual = renderer; } }),
  [route('mfg-packaging', 2)]: target(() => import('./mfgPackagingModule02'), 'MFG_PACKAGING_MODULE02', MFG_PACKAGING_MODULE02_DECKS, MFG_PACKAGING_MODULE02_QUIZZES, MFG_PACKAGING_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderMfgPackagingModule02Visual = renderer; } }),
  [route('mfg-packaging', 3)]: target(() => import('./mfgPackagingModule03'), 'MFG_PACKAGING_MODULE03', MFG_PACKAGING_MODULE03_DECKS, MFG_PACKAGING_MODULE03_QUIZZES, MFG_PACKAGING_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderMfgPackagingModule03Visual = renderer; } }),
  [route('mfg-packaging', 4)]: target(() => import('./mfgPackagingModule04'), 'MFG_PACKAGING_MODULE04', MFG_PACKAGING_MODULE04_DECKS, MFG_PACKAGING_MODULE04_QUIZZES, MFG_PACKAGING_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderMfgPackagingModule04Visual = renderer; } }),
  [route('mfg-packaging', 5)]: target(() => import('./mfgPackagingModule05'), 'MFG_PACKAGING_MODULE05', MFG_PACKAGING_MODULE05_DECKS, MFG_PACKAGING_MODULE05_QUIZZES, MFG_PACKAGING_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderMfgPackagingModule05Visual = renderer; } }),
  [route('logistics-freight', 1)]: target(() => import('./logisticsFreightModule01'), 'LOGISTICS_FREIGHT_MODULE01', LOGISTICS_FREIGHT_MODULE01_DECKS, LOGISTICS_FREIGHT_MODULE01_QUIZZES, LOGISTICS_FREIGHT_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsFreightModule01Visual = renderer; } }),
  [route('logistics-freight', 2)]: target(() => import('./logisticsFreightModule02'), 'LOGISTICS_FREIGHT_MODULE02', LOGISTICS_FREIGHT_MODULE02_DECKS, LOGISTICS_FREIGHT_MODULE02_QUIZZES, LOGISTICS_FREIGHT_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsFreightModule02Visual = renderer; } }),
  [route('logistics-freight', 3)]: target(() => import('./logisticsFreightModule03'), 'LOGISTICS_FREIGHT_MODULE03', LOGISTICS_FREIGHT_MODULE03_DECKS, LOGISTICS_FREIGHT_MODULE03_QUIZZES, LOGISTICS_FREIGHT_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsFreightModule03Visual = renderer; } }),
  [route('logistics-freight', 4)]: target(() => import('./logisticsFreightModule04'), 'LOGISTICS_FREIGHT_MODULE04', LOGISTICS_FREIGHT_MODULE04_DECKS, LOGISTICS_FREIGHT_MODULE04_QUIZZES, LOGISTICS_FREIGHT_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsFreightModule04Visual = renderer; } }),
  [route('logistics-freight', 5)]: target(() => import('./logisticsFreightModule05'), 'LOGISTICS_FREIGHT_MODULE05', LOGISTICS_FREIGHT_MODULE05_DECKS, LOGISTICS_FREIGHT_MODULE05_QUIZZES, LOGISTICS_FREIGHT_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsFreightModule05Visual = renderer; } }),
  [route('logistics-contract', 1)]: target(() => import('./logisticsContractModule01'), 'LOGISTICS_CONTRACT_MODULE01', LOGISTICS_CONTRACT_MODULE01_DECKS, LOGISTICS_CONTRACT_MODULE01_QUIZZES, LOGISTICS_CONTRACT_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsContractModule01Visual = renderer; } }),
  [route('logistics-contract', 2)]: target(() => import('./logisticsContractModule02'), 'LOGISTICS_CONTRACT_MODULE02', LOGISTICS_CONTRACT_MODULE02_DECKS, LOGISTICS_CONTRACT_MODULE02_QUIZZES, LOGISTICS_CONTRACT_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsContractModule02Visual = renderer; } }),
  [route('logistics-contract', 3)]: target(() => import('./logisticsContractModule03'), 'LOGISTICS_CONTRACT_MODULE03', LOGISTICS_CONTRACT_MODULE03_DECKS, LOGISTICS_CONTRACT_MODULE03_QUIZZES, LOGISTICS_CONTRACT_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsContractModule03Visual = renderer; } }),
  [route('logistics-contract', 4)]: target(() => import('./logisticsContractModule04'), 'LOGISTICS_CONTRACT_MODULE04', LOGISTICS_CONTRACT_MODULE04_DECKS, LOGISTICS_CONTRACT_MODULE04_QUIZZES, LOGISTICS_CONTRACT_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsContractModule04Visual = renderer; } }),
  [route('logistics-contract', 5)]: target(() => import('./logisticsContractModule05'), 'LOGISTICS_CONTRACT_MODULE05', LOGISTICS_CONTRACT_MODULE05_DECKS, LOGISTICS_CONTRACT_MODULE05_QUIZZES, LOGISTICS_CONTRACT_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsContractModule05Visual = renderer; } }),
  [route('logistics-express', 1)]: target(() => import('./logisticsExpressModule01'), 'LOGISTICS_EXPRESS_MODULE01', LOGISTICS_EXPRESS_MODULE01_DECKS, LOGISTICS_EXPRESS_MODULE01_QUIZZES, LOGISTICS_EXPRESS_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsExpressModule01Visual = renderer; } }),
  [route('logistics-express', 2)]: target(() => import('./logisticsExpressModule02'), 'LOGISTICS_EXPRESS_MODULE02', LOGISTICS_EXPRESS_MODULE02_DECKS, LOGISTICS_EXPRESS_MODULE02_QUIZZES, LOGISTICS_EXPRESS_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsExpressModule02Visual = renderer; } }),
  [route('logistics-express', 3)]: target(() => import('./logisticsExpressModule03'), 'LOGISTICS_EXPRESS_MODULE03', LOGISTICS_EXPRESS_MODULE03_DECKS, LOGISTICS_EXPRESS_MODULE03_QUIZZES, LOGISTICS_EXPRESS_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsExpressModule03Visual = renderer; } }),
  [route('logistics-express', 4)]: target(() => import('./logisticsExpressModule04'), 'LOGISTICS_EXPRESS_MODULE04', LOGISTICS_EXPRESS_MODULE04_DECKS, LOGISTICS_EXPRESS_MODULE04_QUIZZES, LOGISTICS_EXPRESS_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsExpressModule04Visual = renderer; } }),
  [route('logistics-express', 5)]: target(() => import('./logisticsExpressModule05'), 'LOGISTICS_EXPRESS_MODULE05', LOGISTICS_EXPRESS_MODULE05_DECKS, LOGISTICS_EXPRESS_MODULE05_QUIZZES, LOGISTICS_EXPRESS_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsExpressModule05Visual = renderer; } }),
  [route('logistics-distribution', 1)]: target(() => import('./logisticsDistributionModule01'), 'LOGISTICS_DISTRIBUTION_MODULE01', LOGISTICS_DISTRIBUTION_MODULE01_DECKS, LOGISTICS_DISTRIBUTION_MODULE01_QUIZZES, LOGISTICS_DISTRIBUTION_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsDistributionModule01Visual = renderer; } }),
  [route('logistics-distribution', 2)]: target(() => import('./logisticsDistributionModule02'), 'LOGISTICS_DISTRIBUTION_MODULE02', LOGISTICS_DISTRIBUTION_MODULE02_DECKS, LOGISTICS_DISTRIBUTION_MODULE02_QUIZZES, LOGISTICS_DISTRIBUTION_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsDistributionModule02Visual = renderer; } }),
  [route('logistics-distribution', 3)]: target(() => import('./logisticsDistributionModule03'), 'LOGISTICS_DISTRIBUTION_MODULE03', LOGISTICS_DISTRIBUTION_MODULE03_DECKS, LOGISTICS_DISTRIBUTION_MODULE03_QUIZZES, LOGISTICS_DISTRIBUTION_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsDistributionModule03Visual = renderer; } }),
  [route('logistics-distribution', 4)]: target(() => import('./logisticsDistributionModule04'), 'LOGISTICS_DISTRIBUTION_MODULE04', LOGISTICS_DISTRIBUTION_MODULE04_DECKS, LOGISTICS_DISTRIBUTION_MODULE04_QUIZZES, LOGISTICS_DISTRIBUTION_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsDistributionModule04Visual = renderer; } }),
  [route('logistics-distribution', 5)]: target(() => import('./logisticsDistributionModule05'), 'LOGISTICS_DISTRIBUTION_MODULE05', LOGISTICS_DISTRIBUTION_MODULE05_DECKS, LOGISTICS_DISTRIBUTION_MODULE05_QUIZZES, LOGISTICS_DISTRIBUTION_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderLogisticsDistributionModule05Visual = renderer; } }),
  [route('agri-livestock', 1)]: target(() => import('./agriLivestockModule01'), 'AGRI_LIVESTOCK_MODULE01', AGRI_LIVESTOCK_MODULE01_DECKS, AGRI_LIVESTOCK_MODULE01_QUIZZES, AGRI_LIVESTOCK_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderAgriLivestockModule01Visual = renderer; } }),
  [route('agri-livestock', 2)]: target(() => import('./agriLivestockModule02'), 'AGRI_LIVESTOCK_MODULE02', AGRI_LIVESTOCK_MODULE02_DECKS, AGRI_LIVESTOCK_MODULE02_QUIZZES, AGRI_LIVESTOCK_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderAgriLivestockModule02Visual = renderer; } }),
  [route('agri-livestock', 3)]: target(() => import('./agriLivestockModule03'), 'AGRI_LIVESTOCK_MODULE03', AGRI_LIVESTOCK_MODULE03_DECKS, AGRI_LIVESTOCK_MODULE03_QUIZZES, AGRI_LIVESTOCK_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderAgriLivestockModule03Visual = renderer; } }),
  [route('agri-livestock', 4)]: target(() => import('./agriLivestockModule04'), 'AGRI_LIVESTOCK_MODULE04', AGRI_LIVESTOCK_MODULE04_DECKS, AGRI_LIVESTOCK_MODULE04_QUIZZES, AGRI_LIVESTOCK_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderAgriLivestockModule04Visual = renderer; } }),
  [route('agri-livestock', 5)]: target(() => import('./agriLivestockModule05'), 'AGRI_LIVESTOCK_MODULE05', AGRI_LIVESTOCK_MODULE05_DECKS, AGRI_LIVESTOCK_MODULE05_QUIZZES, AGRI_LIVESTOCK_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderAgriLivestockModule05Visual = renderer; } }),
  [route('agri-commodities', 1)]: target(() => import('./agriCommoditiesModule01'), 'AGRI_COMMODITIES_MODULE01', AGRI_COMMODITIES_MODULE01_DECKS, AGRI_COMMODITIES_MODULE01_QUIZZES, AGRI_COMMODITIES_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderAgriCommoditiesModule01Visual = renderer; } }),
  [route('agri-commodities', 2)]: target(() => import('./agriCommoditiesModule02'), 'AGRI_COMMODITIES_MODULE02', AGRI_COMMODITIES_MODULE02_DECKS, AGRI_COMMODITIES_MODULE02_QUIZZES, AGRI_COMMODITIES_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderAgriCommoditiesModule02Visual = renderer; } }),
  [route('agri-commodities', 3)]: target(() => import('./agriCommoditiesModule03'), 'AGRI_COMMODITIES_MODULE03', AGRI_COMMODITIES_MODULE03_DECKS, AGRI_COMMODITIES_MODULE03_QUIZZES, AGRI_COMMODITIES_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderAgriCommoditiesModule03Visual = renderer; } }),
  [route('agri-commodities', 4)]: target(() => import('./agriCommoditiesModule04'), 'AGRI_COMMODITIES_MODULE04', AGRI_COMMODITIES_MODULE04_DECKS, AGRI_COMMODITIES_MODULE04_QUIZZES, AGRI_COMMODITIES_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderAgriCommoditiesModule04Visual = renderer; } }),
  [route('agri-commodities', 5)]: target(() => import('./agriCommoditiesModule05'), 'AGRI_COMMODITIES_MODULE05', AGRI_COMMODITIES_MODULE05_DECKS, AGRI_COMMODITIES_MODULE05_QUIZZES, AGRI_COMMODITIES_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderAgriCommoditiesModule05Visual = renderer; } }),
  [route('agri-crop', 1)]: target(() => import('./agriCropModule01'), 'AGRI_CROP_MODULE01', AGRI_CROP_MODULE01_DECKS, AGRI_CROP_MODULE01_QUIZZES, AGRI_CROP_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderAgriCropModule01Visual = renderer; } }),
  [route('agri-crop', 2)]: target(() => import('./agriCropModule02'), 'AGRI_CROP_MODULE02', AGRI_CROP_MODULE02_DECKS, AGRI_CROP_MODULE02_QUIZZES, AGRI_CROP_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderAgriCropModule02Visual = renderer; } }),
  [route('agri-crop', 3)]: target(() => import('./agriCropModule03'), 'AGRI_CROP_MODULE03', AGRI_CROP_MODULE03_DECKS, AGRI_CROP_MODULE03_QUIZZES, AGRI_CROP_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderAgriCropModule03Visual = renderer; } }),
  [route('agri-crop', 4)]: target(() => import('./agriCropModule04'), 'AGRI_CROP_MODULE04', AGRI_CROP_MODULE04_DECKS, AGRI_CROP_MODULE04_QUIZZES, AGRI_CROP_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderAgriCropModule04Visual = renderer; } }),
  [route('agri-crop', 5)]: target(() => import('./agriCropModule05'), 'AGRI_CROP_MODULE05', AGRI_CROP_MODULE05_DECKS, AGRI_CROP_MODULE05_QUIZZES, AGRI_CROP_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderAgriCropModule05Visual = renderer; } }),
  [route('realestate-development', 1)]: target(() => import('./realEstateDevelopmentModule01'), 'REAL_ESTATE_DEVELOPMENT_MODULE01', REAL_ESTATE_DEVELOPMENT_MODULE01_DECKS, REAL_ESTATE_DEVELOPMENT_MODULE01_QUIZZES, REAL_ESTATE_DEVELOPMENT_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderRealEstateDevelopmentModule01Visual = renderer; } }),
  [route('realestate-development', 2)]: target(() => import('./realEstateDevelopmentModule02'), 'REAL_ESTATE_DEVELOPMENT_MODULE02', REAL_ESTATE_DEVELOPMENT_MODULE02_DECKS, REAL_ESTATE_DEVELOPMENT_MODULE02_QUIZZES, REAL_ESTATE_DEVELOPMENT_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderRealEstateDevelopmentModule02Visual = renderer; } }),
  [route('realestate-development', 3)]: target(() => import('./realEstateDevelopmentModule03'), 'REAL_ESTATE_DEVELOPMENT_MODULE03', REAL_ESTATE_DEVELOPMENT_MODULE03_DECKS, REAL_ESTATE_DEVELOPMENT_MODULE03_QUIZZES, REAL_ESTATE_DEVELOPMENT_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderRealEstateDevelopmentModule03Visual = renderer; } }),
  [route('realestate-development', 4)]: target(() => import('./realEstateDevelopmentModule04'), 'REAL_ESTATE_DEVELOPMENT_MODULE04', REAL_ESTATE_DEVELOPMENT_MODULE04_DECKS, REAL_ESTATE_DEVELOPMENT_MODULE04_QUIZZES, REAL_ESTATE_DEVELOPMENT_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderRealEstateDevelopmentModule04Visual = renderer; } }),
  [route('realestate-development', 5)]: target(() => import('./realEstateDevelopmentModule05'), 'REAL_ESTATE_DEVELOPMENT_MODULE05', REAL_ESTATE_DEVELOPMENT_MODULE05_DECKS, REAL_ESTATE_DEVELOPMENT_MODULE05_QUIZZES, REAL_ESTATE_DEVELOPMENT_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderRealEstateDevelopmentModule05Visual = renderer; } }),
  [route('realestate-advisory', 1)]: target(() => import('./realEstateAdvisoryModule01'), 'REAL_ESTATE_ADVISORY_MODULE01', REAL_ESTATE_ADVISORY_MODULE01_DECKS, REAL_ESTATE_ADVISORY_MODULE01_QUIZZES, REAL_ESTATE_ADVISORY_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderRealEstateAdvisoryModule01Visual = renderer; } }),
  [route('realestate-advisory', 2)]: target(() => import('./realEstateAdvisoryModule02'), 'REAL_ESTATE_ADVISORY_MODULE02', REAL_ESTATE_ADVISORY_MODULE02_DECKS, REAL_ESTATE_ADVISORY_MODULE02_QUIZZES, REAL_ESTATE_ADVISORY_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderRealEstateAdvisoryModule02Visual = renderer; } }),
  [route('realestate-advisory', 3)]: target(() => import('./realEstateAdvisoryModule03'), 'REAL_ESTATE_ADVISORY_MODULE03', REAL_ESTATE_ADVISORY_MODULE03_DECKS, REAL_ESTATE_ADVISORY_MODULE03_QUIZZES, REAL_ESTATE_ADVISORY_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderRealEstateAdvisoryModule03Visual = renderer; } }),
  [route('realestate-advisory', 4)]: target(() => import('./realEstateAdvisoryModule04'), 'REAL_ESTATE_ADVISORY_MODULE04', REAL_ESTATE_ADVISORY_MODULE04_DECKS, REAL_ESTATE_ADVISORY_MODULE04_QUIZZES, REAL_ESTATE_ADVISORY_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderRealEstateAdvisoryModule04Visual = renderer; } }),
  [route('realestate-advisory', 5)]: target(() => import('./realEstateAdvisoryModule05'), 'REAL_ESTATE_ADVISORY_MODULE05', REAL_ESTATE_ADVISORY_MODULE05_DECKS, REAL_ESTATE_ADVISORY_MODULE05_QUIZZES, REAL_ESTATE_ADVISORY_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderRealEstateAdvisoryModule05Visual = renderer; } }),
  [route('realestate-proptech', 1)]: target(() => import('./realEstateProptechModule01'), 'REAL_ESTATE_PROPTECH_MODULE01', REAL_ESTATE_PROPTECH_MODULE01_DECKS, REAL_ESTATE_PROPTECH_MODULE01_QUIZZES, REAL_ESTATE_PROPTECH_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderRealEstateProptechModule01Visual = renderer; } }),
  [route('realestate-proptech', 2)]: target(() => import('./realEstateProptechModule02'), 'REAL_ESTATE_PROPTECH_MODULE02', REAL_ESTATE_PROPTECH_MODULE02_DECKS, REAL_ESTATE_PROPTECH_MODULE02_QUIZZES, REAL_ESTATE_PROPTECH_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderRealEstateProptechModule02Visual = renderer; } }),
  [route('realestate-proptech', 3)]: target(() => import('./realEstateProptechModule03'), 'REAL_ESTATE_PROPTECH_MODULE03', REAL_ESTATE_PROPTECH_MODULE03_DECKS, REAL_ESTATE_PROPTECH_MODULE03_QUIZZES, REAL_ESTATE_PROPTECH_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderRealEstateProptechModule03Visual = renderer; } }),
  [route('realestate-proptech', 4)]: target(() => import('./realEstateProptechModule04'), 'REAL_ESTATE_PROPTECH_MODULE04', REAL_ESTATE_PROPTECH_MODULE04_DECKS, REAL_ESTATE_PROPTECH_MODULE04_QUIZZES, REAL_ESTATE_PROPTECH_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderRealEstateProptechModule04Visual = renderer; } }),
  [route('realestate-proptech', 5)]: target(() => import('./realEstateProptechModule05'), 'REAL_ESTATE_PROPTECH_MODULE05', REAL_ESTATE_PROPTECH_MODULE05_DECKS, REAL_ESTATE_PROPTECH_MODULE05_QUIZZES, REAL_ESTATE_PROPTECH_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderRealEstateProptechModule05Visual = renderer; } }),
  [route('hospitality-hotels', 1)]: target(() => import('./hospitalityHotelsModule01'), 'HOSPITALITY_HOTELS_MODULE01', HOSPITALITY_HOTELS_MODULE01_DECKS, HOSPITALITY_HOTELS_MODULE01_QUIZZES, HOSPITALITY_HOTELS_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderHospitalityHotelsModule01Visual = renderer; } }),
  [route('hospitality-hotels', 2)]: target(() => import('./hospitalityHotelsModule02'), 'HOSPITALITY_HOTELS_MODULE02', HOSPITALITY_HOTELS_MODULE02_DECKS, HOSPITALITY_HOTELS_MODULE02_QUIZZES, HOSPITALITY_HOTELS_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderHospitalityHotelsModule02Visual = renderer; } }),
  [route('hospitality-hotels', 3)]: target(() => import('./hospitalityHotelsModule03'), 'HOSPITALITY_HOTELS_MODULE03', HOSPITALITY_HOTELS_MODULE03_DECKS, HOSPITALITY_HOTELS_MODULE03_QUIZZES, HOSPITALITY_HOTELS_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderHospitalityHotelsModule03Visual = renderer; } }),
  [route('hospitality-hotels', 4)]: target(() => import('./hospitalityHotelsModule04'), 'HOSPITALITY_HOTELS_MODULE04', HOSPITALITY_HOTELS_MODULE04_DECKS, HOSPITALITY_HOTELS_MODULE04_QUIZZES, HOSPITALITY_HOTELS_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderHospitalityHotelsModule04Visual = renderer; } }),
  [route('hospitality-hotels', 5)]: target(() => import('./hospitalityHotelsModule05'), 'HOSPITALITY_HOTELS_MODULE05', HOSPITALITY_HOTELS_MODULE05_DECKS, HOSPITALITY_HOTELS_MODULE05_QUIZZES, HOSPITALITY_HOTELS_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderHospitalityHotelsModule05Visual = renderer; } }),
  [route('hospitality-restaurants', 1)]: target(() => import('./hospitalityRestaurantsModule01'), 'HOSPITALITY_RESTAURANTS_MODULE01', HOSPITALITY_RESTAURANTS_MODULE01_DECKS, HOSPITALITY_RESTAURANTS_MODULE01_QUIZZES, HOSPITALITY_RESTAURANTS_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderHospitalityRestaurantsModule01Visual = renderer; } }),
  [route('hospitality-restaurants', 2)]: target(() => import('./hospitalityRestaurantsModule02'), 'HOSPITALITY_RESTAURANTS_MODULE02', HOSPITALITY_RESTAURANTS_MODULE02_DECKS, HOSPITALITY_RESTAURANTS_MODULE02_QUIZZES, HOSPITALITY_RESTAURANTS_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderHospitalityRestaurantsModule02Visual = renderer; } }),
  [route('hospitality-restaurants', 3)]: target(() => import('./hospitalityRestaurantsModule03'), 'HOSPITALITY_RESTAURANTS_MODULE03', HOSPITALITY_RESTAURANTS_MODULE03_DECKS, HOSPITALITY_RESTAURANTS_MODULE03_QUIZZES, HOSPITALITY_RESTAURANTS_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderHospitalityRestaurantsModule03Visual = renderer; } }),
  [route('hospitality-restaurants', 4)]: target(() => import('./hospitalityRestaurantsModule04'), 'HOSPITALITY_RESTAURANTS_MODULE04', HOSPITALITY_RESTAURANTS_MODULE04_DECKS, HOSPITALITY_RESTAURANTS_MODULE04_QUIZZES, HOSPITALITY_RESTAURANTS_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderHospitalityRestaurantsModule04Visual = renderer; } }),
  [route('hospitality-restaurants', 5)]: target(() => import('./hospitalityRestaurantsModule05'), 'HOSPITALITY_RESTAURANTS_MODULE05', HOSPITALITY_RESTAURANTS_MODULE05_DECKS, HOSPITALITY_RESTAURANTS_MODULE05_QUIZZES, HOSPITALITY_RESTAURANTS_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderHospitalityRestaurantsModule05Visual = renderer; } }),
  [route('healthcare-products', 1)]: target(() => import('./healthcareProductsModule01'), 'HEALTHCARE_PRODUCTS_MODULE01', HEALTHCARE_PRODUCTS_MODULE01_DECKS, HEALTHCARE_PRODUCTS_MODULE01_QUIZZES, HEALTHCARE_PRODUCTS_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderHealthcareProductsModule01Visual = renderer; } }),
  [route('healthcare-products', 2)]: target(() => import('./healthcareProductsModule02'), 'HEALTHCARE_PRODUCTS_MODULE02', HEALTHCARE_PRODUCTS_MODULE02_DECKS, HEALTHCARE_PRODUCTS_MODULE02_QUIZZES, HEALTHCARE_PRODUCTS_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderHealthcareProductsModule02Visual = renderer; } }),
  [route('healthcare-products', 3)]: target(() => import('./healthcareProductsModule03'), 'HEALTHCARE_PRODUCTS_MODULE03', HEALTHCARE_PRODUCTS_MODULE03_DECKS, HEALTHCARE_PRODUCTS_MODULE03_QUIZZES, HEALTHCARE_PRODUCTS_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderHealthcareProductsModule03Visual = renderer; } }),
  [route('healthcare-products', 4)]: target(() => import('./healthcareProductsModule04'), 'HEALTHCARE_PRODUCTS_MODULE04', HEALTHCARE_PRODUCTS_MODULE04_DECKS, HEALTHCARE_PRODUCTS_MODULE04_QUIZZES, HEALTHCARE_PRODUCTS_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderHealthcareProductsModule04Visual = renderer; } }),
  [route('healthcare-products', 5)]: target(() => import('./healthcareProductsModule05'), 'HEALTHCARE_PRODUCTS_MODULE05', HEALTHCARE_PRODUCTS_MODULE05_DECKS, HEALTHCARE_PRODUCTS_MODULE05_QUIZZES, HEALTHCARE_PRODUCTS_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderHealthcareProductsModule05Visual = renderer; } }),
  [route('professional-audit', 1)]: target(() => import('./auditAssuranceModule01'), 'PROFESSIONAL_AUDIT_MODULE01', PROFESSIONAL_AUDIT_MODULE01_DECKS, PROFESSIONAL_AUDIT_MODULE01_QUIZZES, PROFESSIONAL_AUDIT_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderProfessionalAuditModule01Visual = renderer; } }),
  [route('professional-audit', 2)]: target(() => import('./auditAssuranceModule02'), 'PROFESSIONAL_AUDIT_MODULE02', PROFESSIONAL_AUDIT_MODULE02_DECKS, PROFESSIONAL_AUDIT_MODULE02_QUIZZES, PROFESSIONAL_AUDIT_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderProfessionalAuditModule02Visual = renderer; } }),
  [route('professional-audit', 3)]: target(() => import('./auditAssuranceModule03'), 'PROFESSIONAL_AUDIT_MODULE03', PROFESSIONAL_AUDIT_MODULE03_DECKS, PROFESSIONAL_AUDIT_MODULE03_QUIZZES, PROFESSIONAL_AUDIT_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderProfessionalAuditModule03Visual = renderer; } }),
  [route('professional-audit', 4)]: target(() => import('./auditAssuranceModule04'), 'PROFESSIONAL_AUDIT_MODULE04', PROFESSIONAL_AUDIT_MODULE04_DECKS, PROFESSIONAL_AUDIT_MODULE04_QUIZZES, PROFESSIONAL_AUDIT_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderProfessionalAuditModule04Visual = renderer; } }),
  [route('professional-audit', 5)]: target(() => import('./auditAssuranceModule05'), 'PROFESSIONAL_AUDIT_MODULE05', PROFESSIONAL_AUDIT_MODULE05_DECKS, PROFESSIONAL_AUDIT_MODULE05_QUIZZES, PROFESSIONAL_AUDIT_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderProfessionalAuditModule05Visual = renderer; } }),
  [route('professional-consulting', 1)]: target(() => import('./consultingModule01'), 'PROFESSIONAL_CONSULTING_MODULE01', PROFESSIONAL_CONSULTING_MODULE01_DECKS, PROFESSIONAL_CONSULTING_MODULE01_QUIZZES, PROFESSIONAL_CONSULTING_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderProfessionalConsultingModule01Visual = renderer; } }),
  [route('professional-consulting', 2)]: target(() => import('./consultingModule02'), 'PROFESSIONAL_CONSULTING_MODULE02', PROFESSIONAL_CONSULTING_MODULE02_DECKS, PROFESSIONAL_CONSULTING_MODULE02_QUIZZES, PROFESSIONAL_CONSULTING_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderProfessionalConsultingModule02Visual = renderer; } }),
  [route('professional-consulting', 3)]: target(() => import('./consultingModule03'), 'PROFESSIONAL_CONSULTING_MODULE03', PROFESSIONAL_CONSULTING_MODULE03_DECKS, PROFESSIONAL_CONSULTING_MODULE03_QUIZZES, PROFESSIONAL_CONSULTING_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderProfessionalConsultingModule03Visual = renderer; } }),
  [route('professional-consulting', 4)]: target(() => import('./consultingModule04'), 'PROFESSIONAL_CONSULTING_MODULE04', PROFESSIONAL_CONSULTING_MODULE04_DECKS, PROFESSIONAL_CONSULTING_MODULE04_QUIZZES, PROFESSIONAL_CONSULTING_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderProfessionalConsultingModule04Visual = renderer; } }),
  [route('professional-consulting', 5)]: target(() => import('./consultingModule05'), 'PROFESSIONAL_CONSULTING_MODULE05', PROFESSIONAL_CONSULTING_MODULE05_DECKS, PROFESSIONAL_CONSULTING_MODULE05_QUIZZES, PROFESSIONAL_CONSULTING_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderProfessionalConsultingModule05Visual = renderer; } }),
  [route('professional-advisory', 1)]: target(() => import('./constructionAdvisoryModule01'), 'PROFESSIONAL_ADVISORY_MODULE01', PROFESSIONAL_ADVISORY_MODULE01_DECKS, PROFESSIONAL_ADVISORY_MODULE01_QUIZZES, PROFESSIONAL_ADVISORY_MODULE01_TAKEAWAYS, { setVisual: (renderer) => { renderProfessionalAdvisoryModule01Visual = renderer; } }),
  [route('professional-advisory', 2)]: target(() => import('./constructionAdvisoryModule02'), 'PROFESSIONAL_ADVISORY_MODULE02', PROFESSIONAL_ADVISORY_MODULE02_DECKS, PROFESSIONAL_ADVISORY_MODULE02_QUIZZES, PROFESSIONAL_ADVISORY_MODULE02_TAKEAWAYS, { setVisual: (renderer) => { renderProfessionalAdvisoryModule02Visual = renderer; } }),
  [route('professional-advisory', 3)]: target(() => import('./constructionAdvisoryModule03'), 'PROFESSIONAL_ADVISORY_MODULE03', PROFESSIONAL_ADVISORY_MODULE03_DECKS, PROFESSIONAL_ADVISORY_MODULE03_QUIZZES, PROFESSIONAL_ADVISORY_MODULE03_TAKEAWAYS, { setVisual: (renderer) => { renderProfessionalAdvisoryModule03Visual = renderer; } }),
  [route('professional-advisory', 4)]: target(() => import('./constructionAdvisoryModule04'), 'PROFESSIONAL_ADVISORY_MODULE04', PROFESSIONAL_ADVISORY_MODULE04_DECKS, PROFESSIONAL_ADVISORY_MODULE04_QUIZZES, PROFESSIONAL_ADVISORY_MODULE04_TAKEAWAYS, { setVisual: (renderer) => { renderProfessionalAdvisoryModule04Visual = renderer; } }),
  [route('professional-advisory', 5)]: target(() => import('./constructionAdvisoryModule05'), 'PROFESSIONAL_ADVISORY_MODULE05', PROFESSIONAL_ADVISORY_MODULE05_DECKS, PROFESSIONAL_ADVISORY_MODULE05_QUIZZES, PROFESSIONAL_ADVISORY_MODULE05_TAKEAWAYS, { setVisual: (renderer) => { renderProfessionalAdvisoryModule05Visual = renderer; } }),
};

export function industryModuleRouteKey(industryId: string, cardTitle: string) {
  return `${industryId}::${cardTitle}`;
}

export function needsIndustryModuleHydration(industryId: string, cardTitle: string) {
  return Boolean(TARGETS[industryModuleRouteKey(industryId, cardTitle)]);
}

function replaceMap(targetMap: AnyMap, source: AnyMap | undefined) {
  for (const key of Object.keys(targetMap)) delete targetMap[key];
  if (source) Object.assign(targetMap, source);
}

let commercialBankingVisualsPromise: Promise<void> | null = null;
function hydrateCommercialBankingVisuals() {
  commercialBankingVisualsPromise ??= import('./commercialBankingVisuals').then((mod) => {
    renderCommercialBankingVisual = mod.renderCommercialBankingVisual;
  });
  return commercialBankingVisualsPromise;
}

const hydrationCache = new Map<string, Promise<void>>();

export function hydrateIndustryModule(industryId: string, cardTitle: string): Promise<void> {
  const key = industryModuleRouteKey(industryId, cardTitle);
  const existing = hydrationCache.get(key);
  if (existing) return existing;
  const selected = TARGETS[key];
  if (!selected) return Promise.resolve();

  const promise = selected.load().then(async (mod) => {
    const held = applyReviewHolds(selected.prefix, mod[`${selected.prefix}_DECKS`], mod[`${selected.prefix}_QUIZZES`], mod[`${selected.prefix}_TAKEAWAYS`]);
    replaceMap(selected.decks, held.decks);
    replaceMap(selected.quizzes, held.quizzes);
    replaceMap(selected.takeaways, held.takeaways);
    if (selected.lessons) {
      const nextLessons = mod[`${selected.prefix}_LESSONS`] ?? [];
      selected.lessons.splice(0, selected.lessons.length, ...nextLessons);
    }
    if (selected.setVisual) {
      const renderer = Object.entries(mod).find(([name, value]) => name.startsWith('render') && typeof value === 'function')?.[1];
      if (renderer) selected.setVisual(renderer as VisualRenderer);
    }
    selected.setExtra?.(mod);
    if (selected.banking) await hydrateCommercialBankingVisuals();
  }).catch((error) => {
    hydrationCache.delete(key);
    throw error;
  });

  hydrationCache.set(key, promise);
  return promise;
}
