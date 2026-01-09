
import { ServiceCard, InsightItem, FAQItem, PricingPlan, LabExperiment, DocModule } from './types';

export const SERVICES: ServiceCard[] = [
    {
        id: 'neural-art-direction',
        number: '01',
        title: 'Neural Art Direction',
        description: 'We train bespoke LoRA models on your signature aesthetic, allowing you to generate infinite high-fidelity concept iterations that look like your hand drew them.',
        image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/1445aeb2-ddb4-4e4d-a151-c96381893f07_1600w.jpg'
    },
    {
        id: 'automated-motion',
        number: '02',
        title: 'Motion Automation',
        description: 'Eliminate the grunt work of rotoscoping, clean-plating, and frame-interpolation. We deploy AI pipelines that act as your virtual junior motion editor.',
        image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/04ff5a45-5b01-4b68-a092-f3ec2da28b5e_1600w.jpg'
    },
    {
        id: 'hybrid-pipelines',
        number: '03',
        title: 'Hybrid Pipelines',
        description: 'Integrate Generative AI directly into your Figma or After Effects workflow. Bridge the gap between static design tokens and dynamic AI generation.',
        image: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/f365bf31-c2fb-44c2-a24a-c78fedc640ba_1600w.jpg'
    }
];

export const LAB_EXPERIMENTS: LabExperiment[] = [
    {
        title: "Vector Latent Mapping",
        status: "Beta",
        description: "Direct generation of SVG paths from neural prompts, maintaining perfectly clean curves for large-format identity systems.",
        tech: ["ControlNet", "Custom SVG-Decoder"]
    },
    {
        title: "Temporal Texture Locking",
        status: "Stable",
        description: "Ensures that textures and noise patterns remain fixed across video frames, eliminating the 'AI boil' effect in high-end VFX.",
        tech: ["AnimateDiff", "Flow-Matching"]
    },
    {
        title: "Depth-Aware Rotoscoping",
        status: "Alpha",
        description: "Zero-shot object isolation for video editors. Pulls clean masks even in motion-blurred or complex lighting scenarios.",
        tech: ["Segment Anything 2", "ProRes 4444"]
    }
];

export const DOC_MODULES: DocModule[] = [
    {
        category: "Integration",
        title: "Adobe After Effects Connector",
        content: "Learn how to push keyframe data directly into our latent space generators for perfectly synced motion graphics."
    },
    {
        category: "Identity",
        title: "Consistent Character Sheets",
        content: "A guide on maintaining 1:1 character accuracy across infinite iterations for narrative video projects."
    },
    {
        category: "Workflow",
        title: "Exporting Layered PSDs",
        content: "Our pipelines can now segment AI outputs into editable layers, paths, and masks for final human retouching."
    }
];

export const INSIGHTS: InsightItem[] = [
    {
        type: 'Technical Report',
        title: 'From Keyframes to Latent Space',
        italicTitle: 'The Future of Video Post-Production',
        readTime: '4 min read',
        href: '#',
        tag: 'Motion Design'
    },
    {
        type: 'Opinion',
        title: 'Why Vector-Based AI',
        italicTitle: 'Is the Final Frontier for Graphic Designers',
        readTime: '6 min read',
        href: '#',
        tag: 'Identity Design'
    }
];

export const FAQ_DATA: FAQItem[] = [
    {
        question: "Who owns the models trained on my style?",
        answer: "You do. We provide 'Style Sovereignty.' Any model we train on your unique creative IP is your property, hosted on private infrastructure, and never shared with other clients."
    },
    {
        question: "Do you provide editable source files?",
        answer: "Yes. Our pipelines are designed to output layered PSDs, SVG paths, or ProRes 4444 video files with alpha channels."
    }
];

export const PRICING_PLANS: PricingPlan[] = [
    {
        name: "Creative Sprint",
        price: "$2.5k+",
        description: "A deep-dive technical setup for a single complex campaign or style-training session.",
        features: ["1 Custom Style Model", "Editable Workflow Template", "Source File Output", "48h Turnaround"]
    },
    {
        name: "Design Ops Partner",
        price: "$5k/mo",
        description: "Your own dedicated R&D lab for ongoing design and motion automation needs.",
        isPopular: true,
        features: ["Unlimited Model Training", "Custom Scripting (AE/PS)", "Priority Support", "Weekly Strategy Sync"]
    },
    {
        name: "Studio Integration",
        price: "Tailored",
        description: "For agencies looking to overhaul their entire production floor with private AI infrastructure.",
        features: ["Private GPU Server Setup", "Team Training", "Proprietary Model R&D", "Custom Plugin Development"]
    }
];

export const PARTNER_LOGOS = [
    "ADOBE", "BLACKMAGIC", "WACOM", "FIGMA", "MAXON", "AUTODESK", "UNITY", "CANAL+"
];
