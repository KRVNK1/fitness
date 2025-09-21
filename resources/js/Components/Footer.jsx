export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">IRKFITNESS</h3>
            <p className="text-gray-400">Современный фитнес-клуб для достижения ваших целей</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Тренажерный зал
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  Групповые программы
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Персональные тренировки
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  SPA зона
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-400">
              <li>+7 (908) 123-45-67</li>
              <li>info@irkfitness.ru</li>
              <li>Иркутск, ул. Ленина, 5А</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Режим работы</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Пн-Пт: 08:00 - 23:00</li>
              <li>Сб-Вс: 10:00 - 23:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 IRKFITNESS. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
