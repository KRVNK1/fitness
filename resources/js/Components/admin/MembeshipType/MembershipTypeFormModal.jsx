import { useForm } from "@inertiajs/react"
import { useEffect, useState } from "react"
import Modal from "@/Components/ui/Modal"

export default function MembershipTypeFormModal({ show, onClose, membershipType, title }) {
    const [features, setFeatures] = useState([])

    const availableFeatures = [
        "Безлимитный доступ в клуб",
        "Вводная тренировка с тренером",
        "Анализ состава тела In-Body",
        "25+ групповых тренировок",
        "Гостевой доступ для друзей",
        "SPA-зона"
    ];

    const { data, setData, post, put, reset, errors, clearErrors } = useForm({
        name: "",
        slug: "",
        description: "",
        price: "",
        features: [],
    })

    useEffect(() => {
        if (membershipType) {
            setData({
                name: membershipType.name,
                slug: membershipType.slug,
                description: membershipType.description,
                price: membershipType.price,
                features: membershipType.features,
            })
            setFeatures(membershipType.features)
        } else {
            reset()
            setFeatures([])
        }
        clearErrors()
    }, [membershipType, show])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (membershipType) {
            put(route("admin.membership-types.update", membershipType.id), {
                onSuccess: () => {
                    reset()
                    setFeatures([])
                    onClose()
                },
            })
        } else {
            post(route("admin.membership-types.store"), {
                onSuccess: () => {
                    reset()
                    setFeatures([])
                    onClose()
                },
            })
        }
    }

    return (
        <Modal show={show} onClose={onClose} title={title} maxWidth="md">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Название */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="Например: Базовый абонемент"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                {/* Слаг */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Слаг</label>
                    <input
                        type="text"
                        name="slug"
                        value={data.slug}
                        onChange={(e) => setData("slug", e.target.value)}
                        placeholder="basic-membership"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
                </div>

                {/* Описание */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                    <textarea
                        name="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        placeholder="Введите описание типа абонемента"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                {/* Цена */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Цена (руб.)</label>
                    <input
                        type="number"
                        name="price"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        placeholder="1000"
                        step="100"
                        min="1000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                </div>

                {/* Особенности */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Особенности
                    </label>
                    <div className="space-y-2">
                        {availableFeatures.map((feature) => {
                            const current = features.find((f) => f.text === feature);
                            const checked = current ? current.included : false;
                            return (
                                <label key={feature} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={(e) => {
                                            const newFeatures = availableFeatures.map((f) => {
                                                if (f === feature) {
                                                    return { text: f, included: e.target.checked };
                                                }

                                                const existing = features.find((x) => x.text === f);
                                                return existing
                                                    ? { ...existing }
                                                    : { text: f, included: false };
                                            });

                                            setFeatures(newFeatures);
                                            setData("features", newFeatures);
                                        }}
                                    />
                                    <span className="text-gray-800">{feature}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Кнопки */}
                <div className="flex gap-3 justify-end pt-4">
                    <button
                        type="button"
                        onClick={() => {
                            reset()
                            setFeatures([])
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
                        {membershipType ? "Обновить" : "Создать"}
                    </button>
                </div>
            </form>
        </Modal>
    )
}
