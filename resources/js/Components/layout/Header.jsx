import { useState } from "react"

export default function Header({ user }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="sticky top-0 bg-white border-b-2 border-gray-100 z-50 shadow-sm">
      <nav className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl lg:text-3xl font-bold">
            <a href="/" className="flex items-center">
              <span className="text-[#7f36dd]">IRK</span>FITNESS
            </a>
          </div>

          {/* Навигация десктоп */}
          <div className="hidden md:flex items-center gap-8 font-semibold [&>a:hover]:text-[#7f36dd] [&>a]:transition-colors">
            <a href="/#pricing">Тарифы</a>
            <a href="/workouts/catalog">Групповые</a>
            <a href="/trainers">Тренеры</a>
            <a href="/workouts/schedule">Расписание</a>
          </div>

          <div className="hidden md:block">
            {user ? (
              <a href="/dashboard" className="bg-white border-2 border-[#7f36dd] text-[#7f36dd] px-6 py-2 rounded-full font-semibold hover:bg-[#7f36dd] hover:text-white transition-all duration-200" >
                Личный кабинет
              </a>
            ) : (
              <a href="/login" className="bg-white border-2 border-[#7f36dd] text-[#7f36dd] px-6 py-2 rounded-full font-semibold hover:bg-[#7f36dd] hover:text-white transition-all duration-200" >
                Войти
              </a>
            )}
          </div>

          {/* Кнопка мобильного меню */}
          <button className="md:hidden p-2" onClick={toggleMobileMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Навигация мобилок */}
        <div className={`md:hidden mt-4 pb-4 border-t border-gray-100 ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <div className="flex flex-col gap-4 pt-4 [&>a:hover]:text-[#7f36dd] [&>a]:transition-colors">
            <a href="/#pricing">Тарифы</a>
            <a href="/workouts">Групповые</a>
            <a href="/#trainers">Тренеры</a>
            {user ? (
              <a href="/dashboard" className="bg-[#7f36dd] text-white px-6 py-2 rounded-full font-semibold text-center hover:bg-[#661CC3] transition-colors duration-200">
                Личный кабинет
              </a>
            ) : (
              <a href="/login" className="bg-[#7f36dd] text-white px-6 py-2 rounded-full font-semibold text-center hover:bg-[#661CC3] transition-colors duration-200">
                Войти
              </a>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
