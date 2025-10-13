import Footer from "@/Components/layout/Footer"
import Header from "@/Components/layout/Header"
import Title from "@/Components/ui/Title"
import TrainerCard from "@/Components/features/TrainerCard"
import { Head } from "@inertiajs/react"

export default function Index({ auth, trainers }) {
    return (
        <div className="bg-gray-100">
            <Head title="IRKFITNESS - Тренеры" />

            <Header user={auth.user} />

            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Заголовок страницы */}
                <Title subtitle={"Выберите подходящего тренера и начните тренировку!"}>
                    Наши тренеры
                </Title>

                {/* Результаты */}
                <div className="mb-6">
                    <p className="text-gray-600">Всего тренеров: {trainers.length}</p>
                </div>

                {/* Сетка тренеров */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {trainers.length > 0 ? (
                        trainers.map((trainer) =>
                            <TrainerCard key={trainer.id} trainer={trainer} />
                        )
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">Тренеры не найдены</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
