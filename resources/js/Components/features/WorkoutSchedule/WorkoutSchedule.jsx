import WorkoutDetails from "./WorkoutDetails"
import WorkoutList from "./WorkoutList"

export default function WorkoutSchedule({ selectedDayWorkouts, selectedWorkout, setSelectedWorkout, format }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WorkoutList
                workouts={selectedDayWorkouts}
                selectedWorkout={selectedWorkout}
                setSelectedWorkout={setSelectedWorkout}
                format={format}
            />

            <WorkoutDetails
                workout={selectedWorkout}
                format={format}
            />
        </div>
    )
}