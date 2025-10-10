import Footer from "@/Components/layout/Footer"
import Header from "@/Components/layout/Header"
import { Link } from "@inertiajs/react"

export default function Error({ auth, error }) {
  return (
    <>
      <Header user={auth.user} />

      <div className="min-h-[calc(90vh-128px)] flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ошибка оплаты</h1>
          <p className="text-gray-600 mb-6">К сожалению, произошла ошибка при обработке платежа.</p>

          {error && (
            <div className="bg-red-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="w-full bg-[#7f36dd] text-white py-3 rounded-xl font-semibold hover:bg-[#661CC3] transition-colors duration-200 inline-block"
            >
              Вернуться на главную
            </Link>
            <Link
              href="/support"
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200 inline-block"
            >
              Связаться с поддержкой
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
