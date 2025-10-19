import ScheduleLayout from "@/Layouts/ScheduleLayout";
import WorkoutInfo from "@/Components/features/WorkoutType/Information/WorkoutInfo";

export default function Show({ auth, workout, schedules }) {

    return (
        <ScheduleLayout
            auth={auth}
            navText="Назад к тренировкам"
            backLink="/workouts/catalog"
            headerComponent={(entity) => <WorkoutInfo workout={entity} />}
            schedules={schedules}
            entity={workout}
        />
    )
}
