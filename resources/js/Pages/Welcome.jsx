import Header from "@/Components/layout/Header"
import Footer from "@/Components/layout/Footer"
import { Head } from "@inertiajs/react"
import { useEffect, useState } from "react"
import PricingPlan from "@/Components/features/PricingPlan"

export default function Welcome({ auth, membershipTypes }) {
    const [spaImage, setSpaImage] = useState("https://i.ibb.co/7dw1kS5F/fin-sauna.webp")
    const [activeButton, setActiveButton] = useState(0)

    const planStyles = {
        light: {
            bg_color: "bg-blue-500",
            text_color: "text-blue",
            buttonTextColor: "text-blue-600",
            buttonHoverColor: "bg-blue-50",
        },
        smart: {
            badge: { text: "ХИТ", color: "bg-orange-400" },
            bg_color: "bg-orange-500",
            text_color: "text-orange",
            buttonTextColor: "text-orange-600",
            buttonHoverColor: "bg-orange-50",
        },
        infinity: {
            badge: { text: "ТОП", color: "bg-purple-500" },
            bg_color: "bg-purple-600",
            text_color: "text-purple",
            buttonTextColor: "text-purple-600",
            buttonHoverColor: "bg-purple-50",
        },
    }

    const plans = membershipTypes.map((membershipType) => {
        const style = planStyles[membershipType.slug]
        return {
            name: membershipType.name,
            price: `${Math.round(membershipType.price).toLocaleString("ru-RU")}₽`,
            badge: style.badge,
            bg_color: style.bg_color,
            text_color: style.text_color,
            buttonTextColor: style.buttonTextColor,
            buttonHoverColor: style.buttonHoverColor,
            link: `/membership/create/${membershipType.slug}`,
            features: membershipType.features,
        }
    })

    useEffect(() => {
        const initMap = () => {
            if (window.ymaps) {
                window.ymaps.ready(() => {
                    const myMap = new window.ymaps.Map("myMap", {
                        center: [52.283148, 104.281361],
                        zoom: 13,
                    })

                    const myPlacemark = new window.ymaps.Placemark(
                        [52.283148, 104.281361],
                        {
                            hintContent: "IRKFITNESS",
                            balloonContent: "IRKFITNESS",
                        },
                        {
                            iconLayout: "default#image",
                            iconImageHref: "https://i.ibb.co/Gffcd1Q8/location-map-pin-mark-icon-148684.png",
                            iconImageSize: [40, 40],
                        },
                    )
                    myMap.geoObjects.add(myPlacemark)
                })
            } else {
                setTimeout(initMap, 100)
            }
        }
        initMap()
    }, [])

    const handleSpaButtonClick = (imageUrl, index) => {
        setSpaImage(imageUrl)
        setActiveButton(index)
    }

    const spaButtons = [
        {
            text: "Финская сауна",
            image: "https://i.ibb.co/7dw1kS5F/fin-sauna.webp"
        },

        {
            text: "Турецкий хаммам",
            image: "https://i.ibb.co/gZVXRqHT/turkish-hammam.webp"
        },
        {
            text: "Соляная комната",
            image: "https://i.ibb.co/PZrkFWqh/solyanaya-komnata.webp"
        },
    ]

    return (
        <>
            <Head title="IRKFITNESS - Современный фитнес-клуб" />

            <Head>
                <script src="https://api-maps.yandex.ru/2.0-stable/?apikey=0aa3ee8d-e6c4-4d5b-910f-d3760f48934d&load=package.full&lang=ru-RU" type="text/javascript"></script>
            </Head>

            <div className="scroll-smooth">
                <Header user={auth.user} />

                {/* Hero section */}
                <div className="container mx-auto px-4 py-4 transition-all duration-300">
                    <div className="relative">
                        {/* Mobile */}
                        <div className="lg:hidden relative">
                            <img
                                src="https://i.ibb.co/Fb0Ys1K9/main-Mobile.webp"
                                alt="Фитнес модель мобильная"
                                className="w-full h-[525px] object-cover rounded-3xl"
                            />
                        </div>
                        {/* Desktop */}
                        <div className="hidden lg:block flex-1 relative">
                            <img
                                src="https://i.ibb.co/zhqDW1X9/main.webp"
                                alt="Фитнес модель"
                                className="w-full h-[550px] object-cover rounded-[40px]"
                            />
                        </div>

                        <div className="absolute top-0 flex-1 max-w-lg p-6 lg:p-14">
                            <h1 className="text-3xl text-white md:text-5xl font-bold leading-tight">Современный фитнес от</h1>
                            <p className="text-6xl text-white lg:text-8xl font-bold leading-tight relative">
                                1 990
                                <span className="relative">
                                    ₽
                                    <span className="absolute text-sm w-[75px] grid place-items-center h-6 top-[10px] right-[-30px] rounded-full bg-[#49bcfe] transform rotate-12 lg:text-xl lg:w-28 lg:h-10 lg:text lg:right-[-45px] lg:top-[15px]">
                                        в месяц
                                    </span>
                                </span>
                            </p>
                            <p className="text-xl mb-8 text-white font-bold">
                                Современный фитнес-клуб с профессиональным оборудованием
                            </p>
                            <button className="hidden lg:flex justify-between items-center gap-4 bg-[#7F36DD] h-[71px] text-white pl-8 pr-1 rounded-full font-semibold text-lg hover:bg-[#661CC3] transition-colors">
                                <span>Начать тренировки</span>
                                <span className="text-[#7F36DD] w-16 h-16 bg-white grid place-items-center rounded-full">
                                    <svg viewBox="-15 0 64 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15.8037 26L27.8037 14M27.8037 14L15.8037 2M27.8037 14L2.19707 14.5771"
                                            stroke="currentColor"
                                            strokeWidth="3.6"
                                            strokeLinecap="round"
                                        ></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 w-full lg:hidden">
                        <button className="flex justify-between items-center gap-4 bg-[#7F36DD] w-full h-[71px] text-white pl-8 pr-1 rounded-full font-semibold text-lg hover:bg-[#661CC3] transition-colors">
                            <span>Начать тренировки</span>
                            <span className="text-[#7F36DD] w-16 h-16 bg-white grid place-items-center rounded-full">
                                <svg viewBox="-15 0 64 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.8037 26L27.8037 14M27.8037 14L15.8037 2M27.8037 14L2.19707 14.5771"
                                        stroke="currentColor"
                                        strokeWidth="3.6"
                                        strokeLinecap="round"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <section id="pricing" className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-800">Тарифы</h2>
                        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                            Выберите подходящий тарифный план для достижения ваших фитнес-целей
                        </p>

                        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {plans.map((plan, index) => (
                                <PricingPlan
                                    key={index}
                                    name={plan.name}
                                    price={plan.price}
                                    badge={plan.badge}
                                    bg_color={plan.bg_color}
                                    text_color={plan.text_color}
                                    gradientFrom={plan.gradientFrom}
                                    gradientTo={plan.gradientTo}
                                    features={plan.features}
                                    buttonTextColor={plan.buttonTextColor}
                                    buttonHoverColor={plan.buttonHoverColor}
                                    link={plan.link}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Gym Halls Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Тренажерные залы</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src="https://i.ibb.co/JjYb4jML/kardip.webp"
                                    alt="Тренажерный зал"
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">Кардио зона</h3>
                                    <p className="text-gray-600">Современные беговые дорожки, велотренажеры и эллипсы</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                                <img
                                    src="https://i.ibb.co/R4gG3X6v/silovaya.webp"
                                    alt="Силовой зал"
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">Силовая зона</h3>
                                    <p className="text-gray-600">Профессиональные тренажеры и свободные веса</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl md:col-span-2 lg:col-span-1 overflow-hidden shadow-lg">
                                <img
                                    src="https://i.ibb.co/pjnzWsX0/kinoteatr.webp"
                                    alt="Кардио Кинотеатр"
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">Кардио кинотеатр</h3>
                                    <p className="text-gray-600">Зона для просмотра кино с велотренажерами</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SPA Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-1">
                                <h2 className="text-4xl font-bold mb-6 text-gray-800">SPA зона</h2>
                                <p className="text-lg text-gray-600 mb-8">
                                    Расслабьтесь после интенсивной тренировки в нашей SPA зоне. Сауна, хамам и соляная комната помогут
                                    восстановить силы и снять напряжение.
                                </p>
                                <div className="flex flex-col items-start gap-4">
                                    {spaButtons.map((button, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSpaButtonClick(button.image, index)}
                                            className={`w-full lg:w-64 px-8 py-3 rounded-full font-semibold transition-colors ${activeButton === index
                                                ? "bg-purple-600 text-white hover:bg-purple-700"
                                                : "border border-purple-600 text-purple-600 hover:bg-purple-50"
                                                }`}
                                        >
                                            {button.text}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1">
                                <img
                                    src={spaImage || "/placeholder.svg"}
                                    alt="SPA зона"
                                    className="w-full h-auto rounded-2xl shadow-lg transition-opacity duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-gray-800">Где нас найти</h2>

                    <div id="myMap" className="w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[600px] xl:h-[800px] rounded-2xl shadow-lg"></div>
                </section>

                <Footer />
            </div>
        </>
    )
}
