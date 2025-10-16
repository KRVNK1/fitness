import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import { Link } from "@inertiajs/react";
import IntensityDots from "@/Components/ui/IntensityDots";
import { useEffect, useState } from "react";
import WorkoutsSchedule from "@/Components/features/Trainers/WorkoutSchedule/WorkoutSchedule";
import DaySelector from "@/Components/ui/DaySelector";
import useDays from "@/hooks/global/useDays";
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
