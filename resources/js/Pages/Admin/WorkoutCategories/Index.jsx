import { Head } from "@inertiajs/react"
import { useState } from "react"
import AdminSidebar from "@/Components/admin/AdminSidebar"
import Pagination from "@/Components/ui/Pagination"
import WorkoutCategoryTable from "@/Components/admin/WorkoutCategory/WorkoutCategoryTable"
import WorkoutCategoryFormModal from "@/Components/admin/WorkoutCategory/WorkoutCategoryFormModal"

export default function WorkoutCategoriesIndex({ categories }) {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)

    return (
        <>
            <Head title="Управление категориями тренировок" />

            <div className="flex min-h-screen bg-gray-50">
                <AdminSidebar />

                <main className="flex-1">
                    <div className="p-8">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Категории тренировок</h1>
                                <p className="mt-1 text-gray-600">Управление категориями тренировок</p>
                            </div>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                + Добавить категорию
                            </button>
                        </div>

                        <WorkoutCategoryTable
                            categories={categories}
                            onEdit={(category) => {
                                setSelectedCategory(category)
                                setShowEditModal(true)
                            }}
                        />

                        <Pagination items={categories} />
                    </div>
                </main>
            </div>

            <WorkoutCategoryFormModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                category={null}
                title="Создание категории тренировок"
            />

            <WorkoutCategoryFormModal
                show={showEditModal}
                onClose={() => {
                    setShowEditModal(false)
                    setSelectedCategory(null)
                }}
                category={selectedCategory}
                title="Редактирование категории тренировок"
            />
        </>
    )
}
