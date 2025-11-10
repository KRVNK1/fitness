import { router } from "@inertiajs/react"
import { useState, useRef, useEffect } from "react"

export default function Header({ user }) {
  const [MobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [ProfileMenuOpen, setProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef(null)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!MobileMenuOpen)
  }

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!ProfileMenuOpen)
  }

  // Закрытие выпадающего меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    router.post(route("logout"))
    setProfileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 bg-white border-b-2 border-gray-100 z-50 shadow-sm">
      <nav className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Лого */}
          <div className="text-2xl lg:text-3xl font-bold">
            <a href="/" className="flex items-center">
              <span className="text-[#7f36dd]">IRK</span>FITNESS
            </a>
          </div>

          {/* Навигация десктоп */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8 font-semibold [&>a:hover]:text-[#7f36dd] [&>a]:transition-colors">
            <a href="/#pricing">Тарифы</a>
            <a href="/workouts/catalog">Групповые</a>
            <a href="/trainers">Тренеры</a>
            <a href="/workouts/schedule">Расписание</a>
          </div>

          <div className="hidden md:block relative" ref={profileMenuRef}>
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="bg-white border-2 border-[#7f36dd] text-[#7f36dd] px-6 py-2 rounded-full font-semibold hover:bg-[#7f36dd] hover:text-white transition-all duration-200 flex items-center gap-2"
                >
                  Личный кабинет
                  <svg
                    className={`w-4 h-4 transition-transform ${ProfileMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Выпадающее меню */}
                <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 transition-all duration-200
                  ${ProfileMenuOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
                >
                  <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setProfileMenuOpen(false)}>
                    Профиль
                  </a>
                  <a href="/requests/my-applications" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setProfileMenuOpen(false)}>
                    Мои заявки
                  </a>
                  {user.role === 'trainer' && (
                    <a href="/requests/trainer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setProfileMenuOpen(false)}>
                      Тренерская
                    </a>
                  )}
                  {user.role === "admin" && (
                    <a href="/admin/users" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setProfileMenuOpen(false)}>
                      Админ-панель
                    </a>
                  )}
                  <div className="border-t border-gray-100 my-1"></div>
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                    onClick={handleLogout}>
                    Выход
                  </button>
                </div>
              </div>
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
        <div className={`md:hidden mt-4 pb-4 border-t border-gray-100 ${MobileMenuOpen ? "block" : "hidden"}`}>
          <div className="flex justify-between flex-row gap-4 pt-4 [&>a:hover]:text-[#7f36dd] [&>a]:transition-colors">
            <div className="flex flex-col gap-4">
              <a href="/#pricing">Тарифы</a>
              <a href="/workouts/catalog">Групповые</a>
              <a href="/trainers">Тренеры</a>
              <a href="/workouts/schedule">Расписание</a>
            </div>
            {user ? (
              <div className="flex flex-col gap-4">
                <a href="/my-applications" className="rounded-lg hover:bg-gray-100 transition-colors">
                  Мои заявки
                </a>
                <a href="/dashboard" className="rounded-lg hover:bg-gray-100 transition-colors">
                  Профиль
                </a>
                {user.role === 'trainer' && (
                  <a href="/requests/trainer" className="rounded-lg hover:bg-gray-100 transition-colors">
                    Тренерская
                  </a>
                )}
                {user.role === 'admin' && (
                  <a href="/admin/users" className="rounded-lg hover:bg-gray-100 transition-colors">
                    Админ-панель
                  </a>
                )}
                <button
                  onClick={handleLogout}
                  className="text-left text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Выход
                </button>
              </div>
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