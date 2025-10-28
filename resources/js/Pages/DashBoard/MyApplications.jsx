import Footer from "@/Components/layout/Footer"
import Header from "@/Components/layout/Header"
import { Head } from "@inertiajs/react"
import UserRequests from "./Tabs/User/UserRequests"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/profile/Card";

export default function MyApplications({ auth, requests }) {
    return (
        <div className="bg-gray-100">
            <Header user={auth.user} />
            <Head title="Мои заявки" />

            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            Заявки
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UserRequests requests={requests} />
                    </CardContent>
                </Card>
            </main>

            <Footer />
        </div>
    )
}