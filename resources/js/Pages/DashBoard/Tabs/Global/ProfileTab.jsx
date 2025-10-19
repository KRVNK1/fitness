import { Button } from "@/Components/ui/Button"
import { Input } from "@/Components/ui/Input"
import { Label } from "@/Components/ui/Label"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/profile/Card"
import { useForm } from "@inertiajs/react"

export default function ProfileTab({ user }) {
    // Форма для обновления профиля
    const profileForm = useForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
    })

    const handleProfileUpdate = (e) => {
        e.preventDefault()
        console.log(profileForm)
        profileForm.put(route("profile.update"),
            {
                profileForm
            },
            {
                onSuccess: () => {
                    profileForm.reset()
                },
            })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Редактирование профиля
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="first_name">Имя</Label>
                            <Input
                                id="first_name"
                                value={profileForm.data.first_name}
                                onChange={(e) => profileForm.setData("first_name", e.target.value)}
                                required
                            />
                            {profileForm.errors.first_name && (
                                <p className="text-sm text-destructive">{profileForm.errors.first_name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="last_name">Фамилия</Label>
                            <Input
                                id="last_name"
                                value={profileForm.data.last_name}
                                onChange={(e) => profileForm.setData("last_name", e.target.value)}
                                required
                            />
                            {profileForm.errors.last_name && (
                                <p className="text-sm text-destructive">{profileForm.errors.last_name}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={profileForm.data.email}
                            onChange={(e) => profileForm.setData("email", e.target.value)}
                            required
                        />
                        {profileForm.errors.email && (
                            <p className="text-sm text-destructive">{profileForm.errors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={profileForm.data.phone}
                            onChange={(e) => profileForm.setData("phone", e.target.value)}
                        />
                        {profileForm.errors.phone && (
                            <p className="text-sm text-destructive">{profileForm.errors.phone}</p>
                        )}
                    </div>

                    <Button type="submit" disabled={profileForm.processing}>
                        Сохранить изменения
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}