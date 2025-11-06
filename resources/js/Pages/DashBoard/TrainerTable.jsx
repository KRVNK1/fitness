import Footer from "@/Components/layout/Footer"
import Header from "@/Components/layout/Header"
import { Head } from "@inertiajs/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/profile/Tabs"
import { useState } from "react"
import TrainerCommentModal from "@/Components/features/Trainers/TrainerCommentModal"
import Requests from "./Tabs/Trainer/Requests"
import GroupWorkouts from "./Tabs/Trainer/GroupWorkouts"

export default function TrainerTable({ auth, requests, workouts }) {
    const [showModal, setShowModal] = useState(false)
    const [modalAction, setModalAction] = useState()
    const [selectedRequest, setSelectedRequest] = useState()
    const [activeTab, setActiveTab] = useState("requests")

    const handleCloseModal = () => {
        setShowModal(false)
        setTimeout(() => {
            setSelectedRequest(null)
            setModalAction(null)
        }, 300)
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header user={auth.user} />
            <Head title="Заявки на тренировки" />

            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="lg:inline-grid lg:grid-cols-5 lg:w-auto">
                        <TabsTrigger value="requests">Заявки</TabsTrigger>
                        <TabsTrigger value="schedule">Групповые тренировки</TabsTrigger>
                    </TabsList>

                    {/* Вкладка: Обзор */}
                    <TabsContent value="requests" className="space-y-6">
                        <Requests
                            requests={requests}
                            setSelectedRequest={setSelectedRequest}
                            setModalAction={setModalAction}
                            setShowModal={setShowModal}
                        />
                    </TabsContent>

                    {/* Вкладка: История тренировок */}
                    <TabsContent value="schedule">
                        <GroupWorkouts workouts={workouts} />
                    </TabsContent>
                </Tabs>
            </main>

            <Footer />

            {selectedRequest && (
                <TrainerCommentModal
                    show={showModal}
                    onClose={handleCloseModal}
                    request={selectedRequest}
                    action={modalAction}
                />
            )}
        </div>
    )
}
