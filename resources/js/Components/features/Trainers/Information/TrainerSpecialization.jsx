export default function TrainerSpecialization({ specializations }) {

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Направления тренировок</h1>
            {specializations.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {specializations.map((specialization, index) => (
                        <div className="flex gap-4 w-auto bg-gray-100 p-5 rounded-2xl">
                            <div className="w-10 h-10 rounded-full bg-[#7f36dd] flex items-center justify-center">
                                <svg viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.33464 15.9993L13.6926 19.2678C14.2448 19.682 15.0218 19.6062 15.4836 19.0931L26.668 6.66602" stroke="white" strokeWidth="2.28571" strokeLinecap="square"></path>
                                </svg>
                            </div>
                            <p key={index} className="text-black text-base font-semibold mt-2">
                                {specialization}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}