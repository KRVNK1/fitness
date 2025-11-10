import { Head, router } from "@inertiajs/react"
import { useState } from "react"
import AdminSidebar from "@/Components/admin/AdminSidebar"
import Pagination from "@/Components/ui/Pagination"
import MembershipTypeFormModal from "@/Components/admin/MembeshipType/MembershipTypeFormModal"
import MembershipTypeTable from "@/Components/admin/MembeshipType/MembeshipTypeTable"

export default function MembershipTypesIndex({ membershipTypes, filters }) {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedType, setSelectedType] = useState(null)

    return (
        <>
            <Head title="Управление типами абонементов" />

            <div className="flex min-h-screen bg-gray-50">
                <AdminSidebar />

                <main className="flex-1">
                    <div className="p-8">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Типы абонементов</h1>
                                <p className="mt-1 text-gray-600">Управление доступными типами абонементов</p>
                            </div>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                + Добавить тип абонемента
                            </button>
                        </div>

                        <MembershipTypeTable
                            membershipTypes={membershipTypes}
                            onEdit={(type) => {
                                setSelectedType(type)
                                setShowEditModal(true)
                            }}
                        />

                        <Pagination items={membershipTypes} />
                    </div>
                </main>
            </div>

            <MembershipTypeFormModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                membershipType={null}
                title="Создание типа абонемента"
            />

            <MembershipTypeFormModal
                show={showEditModal}
                onClose={() => {
                    setShowEditModal(false)
                    setSelectedType(null)
                }}
                membershipType={selectedType}
                title="Редактирование типа абонемента"
            />
        </>
    )
}
