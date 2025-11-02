import { Button } from "@/Components/ui/Button"
import { Input } from "@/Components/ui/Input"
import { Label } from "@/Components/ui/Label"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/profile/Card"
import { router, useForm } from "@inertiajs/react"

export default function SecurityTab() {

    // Форма для смены пароля
    const passwordForm = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    })

    const handlePasswordUpdate = (e) => {
        e.preventDefault()
        passwordForm.put(route("password.update"), {
            onSuccess: () => {
                passwordForm.reset()
            },
            preserveScroll: true
        })
    }

    const handleLogout = () => {
        router.post(route("logout"))
    }

    return (
        <>
            {/* Смена пароля */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        Смена пароля
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current_password">Текущий пароль</Label>
                            <Input
                                id="current_password"
                                type="password"
                                value={passwordForm.data.current_password}
                                onChange={(e) => passwordForm.setData("current_password", e.target.value)}
                                required
                            />
                            {passwordForm.errors.current_password && (
                                <p className="text-sm text-destructive">{passwordForm.errors.current_password}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Новый пароль</Label>
                            <Input
                                id="password"
                                type="password"
                                value={passwordForm.data.password}
                                onChange={(e) => passwordForm.setData("password", e.target.value)}
                                required
                            />
                            {passwordForm.errors.password && (
                                <p className="text-sm text-destructive">{passwordForm.errors.password}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation">Подтвердите пароль</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={passwordForm.data.password_confirmation}
                                onChange={(e) => passwordForm.setData("password_confirmation", e.target.value)}
                                required
                            />
                            {passwordForm.errors.password_confirmation && (
                                <p className="text-sm text-destructive">{passwordForm.errors.password_confirmation}</p>
                            )}
                        </div>

                        <Button className="bg-purple-600 hover:bg-purple-700" type="submit" disabled={passwordForm.processing}>
                            {passwordForm.processing ? "Сохранение..." : "Сменить пароль"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Выход из аккаунта */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        Выход из аккаунта
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4 text-sm ">
                        Нажмите кнопку ниже, чтобы выйти из своего аккаунта.
                    </p>
                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={handleLogout}>
                        Выйти
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}