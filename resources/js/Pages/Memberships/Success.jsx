import { Link } from "@inertiajs/react";

export default function Success ({ transaction }) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-4">Оплата успешна!</h1>
                <p className="text-gray-600 mb-6">
                    Ваш абонемент активирован. Добро пожаловать в IRKFITNESS!
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Сумма:</span>
                        <span className="font-semibold">{transaction.amount} ₽</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Период:</span>
                        <span className="font-semibold">{transaction.months} мес.</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Статус:</span>
                        <span className="font-semibold text-green-600">Активен</span>
                    </div>
                </div>

                <Link href="/"
                    className="w-full bg-[#7f36dd] text-white py-3 rounded-xl font-semibold hover:bg-[#661CC3] transition-colors duration-200 inline-block">
                    Вернуться на главную
                </Link>
            </div>
        </div>
    )
}