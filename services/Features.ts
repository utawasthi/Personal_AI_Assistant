export type featureType = {
  feature : string;
  content : string;
}

export const featuresList : featureType[] = [
  {
    feature: "Specialized AI Assistants",
    content: "Choose from tailored assistants like Code Writer, Grammar Fixer, and Fitness Coach — each designed for a specific task with contextual intelligence.",
  },
  {
    feature: "Smart Start with Sample Questions",
    content: "Not sure what to ask? Use predefined sample questions to get instant and relevant responses. It's AI with a nudge.",
  },
  {
    feature: "Fast & Real-Time Responses",
    content: "Powered by OpenRouter, your assistant replies almost instantly. It’s like chatting with someone who never types slowly.",
  },
  {
    feature: " Built with Flexibility in Mind",
    content: "Switch between assistants, change instructions mid-chat, and reframe questions — your assistant adapts on the fly.",
  },
];

export const freePlan : string[] = [
  'Chat on web , iOS , and Android',
  'Generate code and visualize data',
  'Write , edit and create content',
  'Analyze text and images',
  'Ability to search the web',
];

export const proPlan : string[] = [
  'More usage',
  'Unlimited Tokens',
  'Priority access to new features',
  'Access Orbit Code directly in your terminal',
  'Access to unlimited Projects to organize chats and documents',
  'Access to Research',
  'Extended thinking for complex work',
  'Ability to use more AI models',
  'Save and access files directly within Orbit Mind'
]