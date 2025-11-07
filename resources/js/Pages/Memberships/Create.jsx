import Footer from "@/Components/layout/Footer";
import Header from "@/Components/layout/Header";
import { useState } from "react";
import { router } from "@inertiajs/react";

export default function Create({ auth, membershipType }) {

    const [selectedMonth, setSelectedMonth] = useState(1);

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const handleMonthChange = (month) => {
        setSelectedMonth(month);
    };

    const submit = (e) => {
        e.preventDefault()
        router.post('/membership/payment', {
            membership_type: membershipType.slug,
            months: selectedMonth,
        });
    }

    return (
        <div className="scroll-smooth bg-gray-100">
            <Header user={auth.user}/>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Информация о тарифе */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="text-center mb-6">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{membershipType.name}</h1>
                                <div className="text-4xl font-bold text-[#7f36dd] mb-4">
                                    {Math.round(membershipType.price)} ₽
                                    <span className="text-lg font-normal text-gray-600">/мес</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Что входит в тариф:</h3>
                                <ul className="space-y-3">
                                    {membershipType.features.filter(feature => feature.included).map(feature => (
                                        <li key={feature.id} className="flex items-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-gray-600">{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Форма оформления */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Оформление абонемента</h2>

                            <form onSubmit={submit}>

                                <input type="hidden" name="membership_type" value={membershipType.slug} />

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Количество месяцев
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {months.map((month) => (
                                            <label key={month} className="relative">
                                                <input
                                                    type="radio"
                                                    name="months"
                                                    value={month}
                                                    onClick={() => handleMonthChange(month)}
                                                    className="sr-only"
                                                    checked={selectedMonth === month}
                                                />
                                                <div className={`p-3 text-center border-2 border-gray-200 rounded-lg cursor-pointer transition-all ${selectedMonth === month ? 'border-[#7f36dd] bg-[#7f36dd] text-white' : 'border-gray-200'}`}>
                                                    {month} мес
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-600">Стоимость за месяц:</span>
                                        <span className="font-semibold">{Math.round(membershipType.price)}₽</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-600">Количество месяцев:</span>
                                        <span className="font-semibold" id="selected-months">{selectedMonth}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-lg font-bold">
                                        <span>Итого к оплате:</span>
                                        <span className="text-[#7f36dd]" id="total-price">{Math.round(membershipType.price * selectedMonth)}₽</span>
                                    </div>
                                </div>

                                <button type="submit"
                                    className="w-full bg-[#7f36dd] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#661CC3] transition-colors duration-200 shadow-lg">
                                    Перейти к оплате
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}