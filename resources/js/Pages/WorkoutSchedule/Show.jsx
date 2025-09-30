import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";

export default function Show({ auth, workout }) {
    return (
        <>
            <Header user={auth.user} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <div className="space-y-4 md:space-y-0 md:flex md:items-end md:space-x-6">
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <div className="">
                                    {workout.name}
                                </div>
                                <div className="">
                                    Длительность {workout.duration_minutes} минут
                                </div>
                            </div>
                            <div className="">
                                {workout.description}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Расписание</h1>
                </div>
            </main>

            <Footer />
        </>
    )
}
