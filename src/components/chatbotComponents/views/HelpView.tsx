
import React, { useState } from 'react';

// Interfaces for our data structure
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
}

// All FAQ data parsed from the user's document
const faqData: FAQCategory[] = [
  {
    category: 'General Information',
    items: [
      { question: 'What is IPage Vision?', answer: 'IPage Vision is an elite architectural visualization studio based in Singapore, specializing in high-end 3D renderings, VR walkthroughs, and architectural visualization services for clients worldwide. We collaborate with architects, developers, and designers to bring their concepts to life with photorealistic imagery and immersive experiences.' },
      { question: 'What services do you offer?', answer: 'We provide architectural visualization services, including:\n- 3D renderings (interior and exterior)\n- Photorealistic visualizations\n- VR walkthroughs\n- 3D modeling\n- Virtual staging\n- And more...' },
      { question: 'How can I contact IPage Vision?', answer: 'You can reach us via:\n- **Email**: bd@ipagevision.com\n- **Phone**: +65 8261 1261\n- Or through the **contact form** on our website.' }
    ]
  },
  {
    category: 'Services & Process',
    items: [
      { question: 'What types of projects do you work on?', answer: 'We work on a variety of projects, including:\n- Residential, commercial, and public spaces\n- Retail and office visualizations\n- Product visualizations\n- Virtual staging for real estate\n- Architectural and interior design visualizations' },
      { question: 'What is the typical process for starting a project?', answer: 'The process typically involves the following steps:\n- **Initial Inquiry**: You provide project details through our website or email.\n- **Project Proposal**: We send a customized proposal based on your requirements.\n- **Agreement and Deposit**: A 50% deposit is required before starting the project.\n- **Project Execution**: We begin working on the project, keeping you updated throughout.\n- **Final Delivery**: After receiving feedback and making any necessary revisions, the final deliverables are delivered once the remaining 50% is paid.' },
      { question: 'How long does it take to complete a project?', answer: '**3D Renderings**: Typically 5-10 business days, depending on complexity.\n**VR Walkthroughs**: A bit longer due to the immersive nature, typically 7-14 business days.\n**3D Models**: Time depends on the complexity of the model.' }
    ]
  },
  {
    category: 'Pricing & Payment',
    items: [
      { question: 'How much do your services cost?', answer: '**3D Renderings** start from **SGD $50 per view**, increasing based on complexity.\n**VR Walkthroughs** start from **SGD $100 per walkthrough**, increasing based on complexity.\n**3D Models** pricing depends on the complexity of the model. We provide a personalized quote after reviewing your requirements.' },
      { question: 'What is the payment structure?', answer: 'A **50% down payment** is required before we begin work, and the remaining **50% is due upon completion** of the project, before final delivery.' },
      { question: 'What payment methods do you accept?', answer: 'We accept payments via **credit/debit cards**, **bank transfers**, and other online payment methods.' },
      { question: 'Are payments refundable?', answer: 'Payments are **non-refundable** unless the project is canceled before work begins.\n- If the project is in progress, **cancellation fees** may apply based on the work completed up to that point.' },
      { question: 'Do you accept international payments?', answer: 'Yes, we accept international payments via **credit/debit cards**, **bank transfers**, and other online payment methods.' }
    ]
  },
  {
    category: 'Client Responsibilities',
    items: [
      { question: 'What do I need to provide for my project?', answer: 'You will need to provide:\n- **Floor plans**, **elevations**, or other design references.\n- Detailed **instructions** for your desired outcome (style, materials, etc.).\n- **Furniture selections**, either from our library or your own images/links.' },
      { question: 'Can I customize the furniture or materials used in my renderings?', answer: "Yes! You can select items from our **library of furniture, fixtures, and materials**, or upload your own images and provide links to products you'd like to incorporate into the design." },
      { question: 'Do I need to provide a floor plan?', answer: 'Yes, to ensure accurate and realistic renderings, providing **floor plans, elevations, or sketches** is essential. You can upload these files directly through our website.' }
    ]
  },
  {
    category: 'After Delivery',
    items: [
      { question: 'Can I make changes to the renderings after delivery?', answer: '- **Simple Revisions**: Changes such as **color adjustments** or **object positioning** are **free of charge**.\n- **More Complex Revisions**: Changes to **materials**, **textures**, **furniture**, or **fixtures** will incur an **additional charge**, depending on the extent of the revision.' },
      { question: 'Will I receive the 3D model along with the renderings?', answer: 'Yes, the **3D model** can be provided upon request. The format (e.g., **.OBJ**, **.FBX**) will depend on your requirements, and there will be an **additional charge** based on the complexity of the model.' },
      { question: 'Can I use the renders for marketing purposes?', answer: 'Yes, you can use the final renders for **marketing**, but we may also use them for our **portfolio** and **social media** unless otherwise requested.' }
    ]
  },
  {
    category: 'Additional Information',
    items: [
      { question: 'Can I view the renders in virtual reality (VR)?', answer: 'Yes, we offer **VR walkthroughs** as an add-on service. This allows you to experience your space in **immersive 3D**.' },
      { question: 'Do you offer services for international clients?', answer: 'Yes, we work with clients worldwide, providing high-quality visualizations regardless of your location.' },
      { question: 'How do I submit my project to IPage Vision?', answer: 'You can submit your project through our **online submission form** on the website, or email your project details and any supporting documents to **bd@ipagevision.com**.' }
    ]
  }
];


// Helper to format the answer text (bolding, lists)
const formatAnswer = (answer: string): string => {
    let html = answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    const lines = html.split('\n');
    let result = '';
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('- ')) {
            if (!inList) {
                result += '<ul class="list-disc list-inside space-y-1 mt-2">';
                inList = true;
            }
            result += `<li>${line.substring(2)}</li>`;
        } else {
            if (inList) {
                result += '</ul>';
                inList = false;
            }
            if (line) {
                result += `<p class="mt-2 first:mt-0">${line}</p>`;
            }
        }
    }

    if (inList) {
        result += '</ul>';
    }

    return result;
};


// A reusable accordion item component for each question
const AccordionItem: React.FC<{ faq: FAQItem; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left p-4 bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div 
          className="overflow-hidden"
        >
          <div 
            className="p-4 pt-0 text-gray-600"
            dangerouslySetInnerHTML={{ __html: formatAnswer(faq.answer) }}
          />
        </div>
      </div>
    </div>
  );
};

interface HelpViewProps {
  onClose: () => void;
}

// The main HelpView component
const HelpView: React.FC<HelpViewProps> = ({ onClose }) => {
    const [openQuestion, setOpenQuestion] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleToggle = (question: string) => {
        setOpenQuestion(prev => (prev === question ? null : question));
    };

    const filteredFaqs = faqData.map(category => ({
        ...category,
        items: category.items.filter(item => 
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(category => category.items.length > 0);

    return (
        <div className="h-full w-full flex flex-col bg-gray-100">
             <header className="p-4 flex items-center justify-between flex-shrink-0 bg-white">
                <h2 className="text-xl font-bold text-gray-800">Frequently Asked Questions</h2>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100" aria-label="Close chat">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
             </header>

            <div className="p-4 flex-shrink-0 bg-white border-y border-gray-200">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for help..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-gray-100 border-2 border-transparent rounded-full focus:bg-white focus:border-brand-orange focus:ring-0 outline-none transition-all duration-300 placeholder-gray-500 text-gray-800"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>

            <main className="flex-1 overflow-y-auto">
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map(category => (
                        <div key={category.category} className="py-4">
                            <h3 className="text-brand-orange font-bold text-sm uppercase px-4 pb-2">{category.category}</h3>
                            <div className="bg-white border-y border-gray-200">
                                {category.items.map(faq => (
                                    <AccordionItem
                                        key={faq.question}
                                        faq={faq}
                                        isOpen={openQuestion === faq.question}
                                        onClick={() => handleToggle(faq.question)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-8 text-gray-500">
                        <p className="font-semibold">No results found</p>
                        <p className="text-sm">Try searching for something else.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default HelpView;