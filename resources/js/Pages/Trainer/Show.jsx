import TrainerInfo from "@/Components/features/Trainers/Information/TrainerInfo"
import ScheduleLayout from "@/Layouts/ScheduleLayout"

export default function Show({ auth, trainer, schedules }) {
    return (
        <ScheduleLayout
            auth={auth}
            navText="Назад к тренерам"
            backLink="/trainers"
            headerComponent={(entity) => <TrainerInfo trainer={entity} />}
            schedules={schedules}
            entity={trainer}
        />
    )
}
