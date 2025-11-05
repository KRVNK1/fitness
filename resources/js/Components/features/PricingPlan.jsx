import { Link } from "@inertiajs/react"

export default function PricingPlan({ name, price, badge, bg_color, features, buttonTextColor, buttonHoverColor, link }) {
    return (
        <div className={`relative ${bg_color} text-white p-8 bg rounded-3xl shadow-xl transform hover:scale-105 transition-all duration-300`}>
            {badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className={`${badge.color} text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                        {badge.text}
                    </span>
                </div>
            )}

            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{name}</h3>
                <div className="text-5xl font-bold mb-2">
                    {price}
                    <span className="text-lg font-normal opacity-80">/мес</span>
                </div>
            </div>

            <ul className="space-y-4 mb-8">
                {features.map((feature, key) => (
                    <li key={key} className={`flex items-center ${feature.included ? '' : 'opacity-50'}`}>
                        <svg
                            className='w-5 h-5 mr-3'
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d={feature.included ?
                                    "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" :
                                    "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                }
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        {feature.text}
                    </li>
                ))}
            </ul>

            <button className={`w-full bg-white ${buttonTextColor} py-4 rounded-2xl font-bold text-lg hover:${buttonHoverColor} transition-colors duration-200 shadow-lg`}>
                <Link href={link} className="block w-full h-full">
                    Купить
                </Link>
            </button>
        </div>
    );
};