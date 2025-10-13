import React from 'react';

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);

const newsItems = [
  {
    id: 1,
    tag: '✈️ Technology',
    title: 'New Drone Flight Regulations Announced',
    description: 'Updated guidelines for commercial and recreational drone usage, focusing on safety and airspace integration.',
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fe3.365dm.com%2F24%2F12%2F2048x1152%2Fskynews-drone-flight_6773990.jpg%3F20241212112053&f=1&nofb=1&ipt=376c21ce6a1cbee9e8d6b5b9d2faa8f7c35070fc380196fab0ada805309a0827',
  },
  {
    id: 2,
    tag: '🌍 Global Update',
    title: 'The Rise of Autonomous Drones in Security',
    description: 'A deep dive into how unmanned aerial vehicles are changing the landscape of global security and defense strategies.',
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.cfr.org%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Ffull_width_xl%2Fpublic%2Fimage%2F2024%2F01%2FUkraineDrones_A_1.webp&f=1&nofb=1&ipt=0dea109cad59c2de7ce62ec299191e76704c882ccb3bae380029c62cbaff3dca',
  },
];

const NewsView: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
       <header className="p-4 flex-shrink-0 bg-white">
        <h3 className="text-lg font-bold text-gray-800">Latest</h3>
        <p className="text-sm text-gray-500">From the Team</p>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50">
        {newsItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="rounded-lg mb-4 w-full h-40 object-cover"
            />
            <div className="flex justify-between items-start">
              <div className="pr-2">
                <span className="text-xs font-bold text-orange-600 bg-orange-100 py-1 px-2 rounded-full">{item.tag}</span>
                <h4 className="font-bold text-lg mt-2 text-gray-800">{item.title}</h4>
                <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
              </div>
              <a href="#" className="mt-2 flex-shrink-0" aria-label="Read more">
                <ChevronRightIcon className="w-6 h-6 text-gray-400 hover:text-brand-orange transition-colors" />
              </a>
            </div>
          </div>
        ))}

        {/* Caught Up Message */}
        <div className="text-center py-8">
          <div className="inline-block p-4 bg-orange-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="mt-4 text-lg font-semibold text-gray-700">You're all caught up!</p>
        </div>
      </main>
    </div>
  );
};

export default NewsView;