import { Link } from "@inertiajs/react"

export default function TrainerCard({ trainer }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="relative">
        {trainer.photo ? (
          <div className="w-full h-80">
            <img
              src={trainer.photo}
              alt={`${trainer.first_name} ${trainer.last_name}`}
              className="w-full h-80 object-cover rounded-t-lg"
            />
          </div>
        ) : (
          <div className="w-full h-80 flex items-center justify-center flex-col bg-gradient-to-br from-purple-100 to-purple-50">
            <svg className="w-24 h-24 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}

        {trainer.trainer_info && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white text-purple-800 shadow-sm">
              Стаж: {trainer.trainer_info.experience_years}{" "}
              {trainer.trainer_info.experience_years === 1
                ? "год"
                : trainer.trainer_info.experience_years < 5
                  ? "года"
                  : "лет"}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Имя тренера */}
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {trainer.first_name} {trainer.last_name}
        </h3>

        {/* Описание */}
        {trainer.trainer_info?.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{trainer.trainer_info.description}</p>
        )}

        <Link
          className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
          href={`/trainers/${trainer.id}`}
        >
          Подробнее
        </Link>
      </div>
    </div>
  )
}
