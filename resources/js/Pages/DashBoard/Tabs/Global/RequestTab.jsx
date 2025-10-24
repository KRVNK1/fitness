import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/profile/Card";
import UserRequests from "../User/UserRequests";

export default function RequestTab({ requests }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Заявки
                </CardTitle>
            </CardHeader>
            <CardContent>
                <UserRequests requests={requests} />
            </CardContent>
        </Card>
    )
}