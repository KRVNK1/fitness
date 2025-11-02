import { Button } from "@/Components/ui/Button";
import { useState } from "react";
import TrainerModal from "../TrainerModal";

export default function TrainerInfo({ trainer }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* Фото тренера */}
            <div className="flex-shrink-0">
                {trainer.trainer_info.photo ? (
                    <img
                        src={trainer.trainer_info.photo}
                        alt={`${trainer.first_name} ${trainer.last_name}`}
                        className="w-80 h-80 object-cover object-top rounded-lg"
                    />
                ) : (
                    <div className="relative w-48 h-64 rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-24 h-24 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                    </div>
                )}
            </div>

            {/* Информация */}
            <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {trainer.first_name} {trainer.last_name}
                </h1>

                {trainer.trainer_info.experience_years && (
                    <p className="text-gray-700 mb-4">
                        <span>Стаж: </span>
                        <span className="font-semibold">
                            {`${trainer.trainer_info.experience_years}
                            ${trainer.trainer_info.experience_years === 1
                                    ? "год"
                                    : trainer.trainer_info.experience_years < 5
                                        ? "года"
                                        : "лет"}`}
                        </span>
                    </p>
                )}

                <div className="max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                        {trainer.trainer_info.description || "Информация о тренере отсутствует"}
                    </p>
                </div>

                <div className="">
                    <Button
                        onClick={() => setShowModal(true)}
                    >
                        Записаться к тренеру
                    </Button>
                </div>
            </div>

            <TrainerModal trainer={trainer} show={showModal} onClose={() => setShowModal(false)} />
        </div>
    )
}