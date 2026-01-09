
export type View = 'home' | 'labs' | 'showreel' | 'docs' | 'collaborate';

export interface NavLink {
    label: string;
    view: View;
}

export interface ServiceCard {
    id: string;
    number: string;
    title: string;
    description: string;
    image: string;
}

export interface InsightItem {
    type: string;
    title: string;
    italicTitle?: string;
    readTime: string;
    href: string;
    tag?: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface PricingPlan {
    name: string;
    price: string;
    description: string;
    features: string[];
    isPopular?: boolean;
}

export interface LabExperiment {
    title: string;
    status: 'Stable' | 'Beta' | 'Alpha';
    description: string;
    tech: string[];
}

export interface DocModule {
    title: string;
    content: string;
    category: string;
}
