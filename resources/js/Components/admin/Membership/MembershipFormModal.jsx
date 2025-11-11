import { useForm } from "@inertiajs/react"
import { useEffect } from "react"
import Modal from "@/Components/ui/Modal"

export default function MembershipFormModal({ users = [], show, onClose, membership, membershipTypes, title }) {
    const { data, setData, post, put, reset, errors, clearErrors } = useForm({
        user_id: "",
        membership_type_id: "",
        remaining_days: "",
        start_date: "",
        end_date: "",
        status: "active",
    })

    useEffect(() => {
        if (membership) {
            setData({
                user_id: membership.user_id || "",
                membership_type_id: membership.membership_type_id || "",
                remaining_days: membership.remaining_days || "",
                start_date: membership.start_date ? membership.start_date.split("T")[0] : "",
                end_date: membership.end_date ? membership.end_date.split("T")[0] : "",
                status: membership.status || "active",
            })
        } else {
            reset()
        }
        clearErrors()
    }, [membership, show])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (membership) {
            put(`/admin/memberships/${membership.id}`, {
                onSuccess: () => {
                    reset()
                    onClose()
                },
            })
        } else {
            post("/admin/memberships", {
                onSuccess: () => {
                    reset()
                    onClose()
                },
            })
        }
    }

    return (
        <Modal show={show} onClose={onClose} title={title} maxWidth="lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                {!membership && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Пользователь</label>
                        <select
                            value={data.user_id}
                            name="user_id"
                            onChange={(e) => setData("user_id", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Выберите пользователя</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.id}) {user.first_name} {user.last_name}
                                </option>
                            ))}
                        </select>
                        {errors.user_id && <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>}
                        <p className="mt-1 text-xs text-gray-500">Выберите пользователя, которому хотите выдать абонемент</p>
                    </div>
                )}

                {membership && membership.user && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Пользователь</label>
                        <div className="px-3 py-2 bg-gray-100 rounded-md text-sm">
                            {membership.user.first_name} {membership.user.last_name} ({membership.user.email})
                        </div>
                    </div>
                )}

                {membership ? (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Тип абонемента</label>
                        <div className="px-3 py-2 bg-gray-100 rounded-md text-sm">
                            {membership.membership_type?.name || "Не указан"}
                        </div>
                    </div>
                ) : (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Тип абонемента</label>
                        <select
                            value={data.membership_type_id}
                            onChange={(e) => setData("membership_type_id", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Выберите тип абонемента</option>
                            {membershipTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name} — {type.price} ₽
                                </option>
                            ))}
                        </select>
                        {errors.membership_type_id && <p className="mt-1 text-sm text-red-600">{errors.membership_type_id}</p>}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Оставшиеся дни</label>
                    <input
                        type="number"
                        value={data.remaining_days}
                        onChange={(e) => setData("remaining_days", e.target.value)}
                        placeholder="30"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.remaining_days && <p className="mt-1 text-sm text-red-600">{errors.remaining_days}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Дата начала</label>
                    <input
                        type="date"
                        value={data.start_date}
                        onChange={(e) => setData("start_date", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.start_date && <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Дата окончания</label>
                    <input
                        type="date"
                        value={data.end_date}
                        onChange={(e) => setData("end_date", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.end_date && <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                    <select
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="active">Активный</option>
                        <option value="expired">Истекший</option>
                        <option value="canceled">Отмененный</option>
                    </select>
                    {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                </div>

                <div className="flex gap-3 justify-end pt-4">
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
                        {membership ? "Обновить" : "Создать"}
                    </button>
                </div>
            </form>
        </Modal>
    )
}
