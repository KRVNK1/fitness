import { Head, router } from "@inertiajs/react"
import { useState } from "react"
import AdminSidebar from "@/Components/admin/AdminSidebar"
import Modal from "@/Components/ui/Modal"
import TrainerSpecializationFormModal from "@/Components/admin/TrainerSpecialization/TrainerSpecializationFormModal"

export default function Index({ trainer, allCategories, specializations }) {
    const [showAddModal, setShowAddModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("")

    const handleAddSpecialization = () => {
        if (!selectedCategory) return

        router.post(route("admin.trainer-specializations.store", trainer.id), {
            workout_category_id: selectedCategory,
        }, {
            onSuccess: () => {
                setSelectedCategory("")
                setShowAddModal(false)
            },
        })
    }

    const handleRemoveSpecialization = (categoryId) => {
        if (window.confirm("Удалить эту специализацию?")) {
            router.delete(route("admin.trainer-specializations.destroy", [trainer.id, categoryId]))
        }
    }

    const availableCategories = allCategories.filter(
        cat => !specializations.some(spec => spec.id === cat.id)
    )

    return (
        <>
            <Head title={`Специализации - ${trainer.user?.first_name} ${trainer.user?.last_name}`} />

            <div className="flex min-h-screen bg-gray-50">
                <AdminSidebar />

                <main className="flex-1">
                    <div className="p-8">
                        <button
                            onClick={() => router.get(route("admin.trainers.index"))}
                            className="mb-6 px-4 py-2 text-blue-600 hover:text-blue-800"
                        >
                            ← Вернуться к тренерам
                        </button>

                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Специализации: {trainer.user?.first_name} {trainer.user?.last_name}
                                </h1>
                                <p className="mt-1 text-gray-600">Управление категориями тренировок для тренера</p>
                            </div>
                            {availableCategories.length > 0 && (
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    + Добавить специализацию
                                </button>
                            )}
                        </div>

                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            {specializations.length > 0 ? (
                                <div className="divide-y">
                                    {specializations.map((category) => (
                                        <div key={category.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                                            <div>
                                                <h3 className="font-medium text-gray-900">{category.name}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveSpecialization(category.id)}
                                                className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition"
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-6 py-8 text-center text-gray-500">
                                    Специализации не добавлены
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            <TrainerSpecializationFormModal 
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Добавить специализацию"
                trainer={trainer}
                availableCategories={availableCategories}
            />
        </>
    )
}
