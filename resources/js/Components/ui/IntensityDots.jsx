export default function IntensityDots ({ level }) {
    return Array.from({ length: 3 }, (_, i) => (
        <svg
            key={i}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5">
            <path
                d="M7.2 15.75L8.1 10.9286L4.5 9.48219L10.8 2.25005L9.9 7.07147L13.5 8.5179L7.2 15.75Z"
                className={i < level ? "text-purple-500 fill-current" : "text-gray-200 fill-current"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ));
};
