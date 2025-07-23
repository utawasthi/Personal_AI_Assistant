interface faqType {
  id : string;
  question : string;
  content : string;
};

export const faqs : faqType[] = [
  {
    id : '1',
    question : 'What is Orbit Mind and how does it work?',
    content : "Orbit Mind is your AI-powered personal assistant platform — think of it as your brain’s smarter twin (minus the overthinking). It lets you choose from specialized assistants like a Code Writer, Grammar Fixer, Fitness Coach, and more. Each assistant remembers your ongoing conversation, follows instructions, and responds with context — just like you'd expect from a helpful human... but without the judgment."
  },
  {
    id : '2',
    question : 'What should I use Orbit Mind for?',
    content : "Orbit Mind is designed to help you tackle everyday tasks smarter and faster by giving you access to a range of specialized AI assistants. Whether you're writing code, polishing grammar, preparing for a workout, studying for exams, or even looking for a creative chat companion, there's an assistant tailored for that purpose. Each assistant is trained to understand context within a conversation, meaning you can ask follow-up questions naturally—just like chatting with a human, but one that never sleeps or gets tired of helping. Whether you're a student, creator, developer, or just curious, Orbit Mind is your all-in-one productivity sidekick."
  },
  {
    id : '3',
    question : 'How much does it cost to use?',
    content : "We offer a Free Plan for casual users — enough for light lifting and fun experiments. For power users (aka serial chatters and productivity nerds), we've got a Pro Plan with more message credits, faster responses, and priority access to advanced assistants.Pricing is transparent — no secret fees, no selling your soul."
  }
];