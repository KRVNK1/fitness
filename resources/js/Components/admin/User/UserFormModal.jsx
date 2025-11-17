import { useForm } from "@inertiajs/react"
import { useEffect, useState } from "react"
import Modal from "@/Components/ui/Modal"

export default function UserFormModal({ show, onClose, user, title }) {
    const { data, setData, post, put, reset, errors, clearErrors } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        role: "client",
        description: "",
        experience_years: "",
        photo: null,
    })

    const [photoPreview, setPhotoPreview] = useState(null)
    const [isExistingTrainer, setIsExistingTrainer] = useState(false)

    useEffect(() => {
        if (user) {
            setData({
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                email: user.email || "",
                phone: user.phone || "",
                password: "",
                password_confirmation: "",
                role: user.role || "client",
                description: user.trainer_info?.description || "",
                experience_years: user.trainer_info?.experience_years || "",
                photo: null,
            })
            setIsExistingTrainer(user.role === "trainer" && user.trainer_info)
            setPhotoPreview(user.trainer_info?.photo ? `/storage/${user.trainer_info.photo}` : null)
        } else {
            reset()
            setPhotoPreview(null)
            setIsExistingTrainer(false)
        }
        clearErrors()
    }, [user, show])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (user) {
            if (user.role === "trainer") {
                post(route("admin.users.update.trainer", user.id), {
                    onSuccess: () => {
                        reset()
                        onClose()
                    },
                })
            } else {
                put(route("admin.users.update", user.id), {
                        onSuccess: () => {
                        reset()
                        onClose()
                    },
                })
            }
        } else {
            if (data.role === "trainer") {
                post(route("admin.users.store.trainer"), {
                    onSuccess: () => {
                        reset()
                        onClose()
                    },
                })
            } else {
                post(route("admin.users.store"), {
                    onSuccess: () => {
                        reset()
                        onClose()
                    },
                })
            }
        }
    }

    const showTrainerFields = (data.role === "trainer") || isExistingTrainer

    return (
        <Modal show={show} onClose={onClose} title={title} maxWidth="md">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Имя */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                    <input
                        type="text"
                        name="first_name"
                        value={data.first_name}
                        onChange={(e) => setData("first_name", e.target.value)}
                        placeholder="Введите имя"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>}
                </div>

                {/* Фамилия */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                    <input
                        type="text"
                        name="last_name"
                        value={data.last_name}
                        onChange={(e) => setData("last_name", e.target.value)}
                        placeholder="Введите фамилию"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="example@mail.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Телефон */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                    <input
                        type="tel"
                        name="phone"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        placeholder="79081112233"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                {/* Роль */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Роль</label>
                    <select
                        name="role"
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="client">Пользователь</option>
                        <option value="trainer">Тренер</option>
                        <option value="admin">Администратор</option>
                    </select>
                    {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
                </div>

                {showTrainerFields && (
                    <>
                        <hr className="my-4" />
                        <h3 className="text-lg font-semibold text-gray-900">Информация о тренере</h3>

                        {/* Опыт */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Опыт (лет)</label>
                            <input
                                type="number"
                                name="experience_years"
                                value={data.experience_years}
                                onChange={(e) => setData("experience_years", e.target.value)}
                                placeholder="5"
                                min="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.experience_years && (
                                <p className="mt-1 text-sm text-red-600">{errors.experience_years}</p>
                            )}
                        </div>

                        {/* Описание */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                            <textarea
                                name="description"
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                placeholder="Расскажите о тренере..."
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        {/* Фото */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Фото</label>
                            <input
                                type="file"
                                name="photo"
                                onChange={(e) => setData("photo", e.target.files[0])}
                                accept="image/*"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                            {photoPreview && (
                                <div className="mt-2">
                                    <img src={photoPreview || "/placeholder.svg"} alt="Preview" className="h-32 w-32 object-cover rounded" />
                                </div>
                            )}
                            {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo}</p>}
                        </div>
                    </>
                )}

                {/* Пароль */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {user ? "Новый пароль (оставьте пустым, чтобы не менять)" : "Пароль"}
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                {/* Подтверждение пароля */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Подтверждение пароля</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData("password_confirmation", e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password_confirmation && (
                        <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
                    )}
                </div>

                {/* Кнопки */}
                <div className="flex gap-3 justify-end pt-4 border-t">
                    <button
                        type="button"
                        onClick={() => {
                            reset()
                            onClose()
                        }}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {user ? "Обновить" : "Создать"}
                    </button>
                </div>
            </form>
        </Modal>
    )
}
