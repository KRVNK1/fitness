import Header from "../../Components/layout/Header"
import Footer from "../../Components/layout/Footer"
import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="scroll-smooth">
            <Header />

            <main className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Регистрация</h2>
                            <p className="text-gray-600">Создайте аккаунт для доступа к тренировкам</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="first_name" className="block text-gray-700 font-medium mb-2">
                                        Имя
                                    </label>
                                    <Input
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        value={data.first_name}
                                        onChange={handleChange}
                                        placeholder="Ваше имя"
                                        autoComplete="given-name"
                                    />
                                    {errors.first_name && <p className="mt-2 text-sm text-red-600">{errors.first_name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="last_name" className="block text-gray-700 font-medium mb-2">
                                        Фамилия
                                    </label>
                                    <Input
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        value={data.last_name}
                                        onChange={handleChange}
                                        placeholder="Ваша фамилия"
                                        autoComplete="family-name"
                                    />
                                    {errors.last_name && <p className="mt-2 text-sm text-red-600">{errors.last_name}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                    Email адрес
                                </label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder="Введите ваш email"
                                    autoComplete="username"
                                />
                                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                    Пароль
                                </label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder="Создайте пароль"
                                    autoComplete="new-password"
                                />
                                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block text-gray-700 font-medium mb-2">
                                    Подтвердите пароль
                                </label>
                                <Input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={handleChange}
                                    placeholder="Повторите пароль"
                                    autoComplete="new-password"
                                />
                                {errors.password_confirmation && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password_confirmation}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#7f36dd] text-white py-3 px-4 rounded-xl font-semibold text-lg hover:bg-[#661CC3] transition-colors duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? "Регистрация..." : "Зарегистрироваться"}
                            </button>

                            <div className="text-center pt-4 border-t border-gray-200">
                                <div className="text-gray-600">
                                    <span>Уже есть аккаунт? </span>
                                    <a href="/login" className="text-[#7f36dd] hover:text-[#661CC3] font-semibold transition-colors">
                                        Войти
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}