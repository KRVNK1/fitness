"use client"

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { useForm } from "@inertiajs/react"

export default function Login({ status }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setData(e.target.name, e.target.value)
  }

  const submit = (e) => {
    e.preventDefault()

    post(route("login"), {
      onFinish: () => reset("password"),
    })
  }

  return (
    <div className="scroll-smooth">
      <Header />

      <main className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Вход</h2>
              <p className="text-gray-600">Войдите в свой аккаунт</p>
            </div>

            {status && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-sm text-green-600">{status}</p>
              </div>
            )}

            <form onSubmit={submit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email адрес
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7f36dd] focus:border-[#7f36dd] transition-colors"
                  placeholder="Введите ваш email"
                  autoComplete="username"
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Пароль
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7f36dd] focus:border-[#7f36dd] transition-colors"
                  placeholder="Введите пароль"
                  autoComplete="current-password"
                />
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-[#7f36dd] text-white py-3 px-4 rounded-xl font-semibold text-lg hover:bg-[#661CC3] transition-colors duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? "Вход..." : "Войти"}
              </button>

              <div className="text-center pt-4 border-t border-gray-200">
                <div className="text-gray-600">
                  <span>Нет аккаунта? </span>
                  <a href="/register" className="text-[#7f36dd] hover:text-[#661CC3] font-semibold transition-colors">
                    Зарегистрироваться
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
