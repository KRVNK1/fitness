import TrainerInfo from "@/Components/features/Trainers/Information/TrainerInfo"
import TrainerSpecialization from "@/Components/features/Trainers/Information/TrainerSpecialization"
import ScheduleLayout from "@/Layouts/ScheduleLayout"

export default function Show({ auth, trainer, schedules }) {
    return (
        <ScheduleLayout
            auth={auth}
            navText="Назад к тренерам"
            backLink="/trainers"
            headerComponent={(entity) => <TrainerInfo trainer={entity} />}
            specComponent={(entity) => <TrainerSpecialization specializations={entity.trainer_info.specializations}/>}
            schedules={schedules}
            entity={trainer}
        />
    )
}
