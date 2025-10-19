import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/profile/Card";
import Requests from "../User/Requests";

export default function RequestTab({ requests }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Смена пароля
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Requests requests={requests} />
            </CardContent>
        </Card>
    )
}