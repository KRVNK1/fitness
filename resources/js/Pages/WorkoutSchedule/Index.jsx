import WorkoutsScheduleInfo from "@/Components/features/WorkoutSchedule/Information/WorkoutScheduleInfo";
import ScheduleLayout from "@/Layouts/ScheduleLayout";


export default function Index({ auth, schedules }) {
    return (
        <ScheduleLayout
            auth={auth}
            schedules={schedules}
            backLink="/"
            navText="На главную"
            headerComponent={() => <WorkoutsScheduleInfo />}
        />
    )
}