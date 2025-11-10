export default function Pagination({ items }) {
    return (
        items.links.length > 3 ?
            <div className="mt-8 flex items-center gap-4">
                <div className="flex gap-2">
                    {items.links &&
                        items.links.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                className={`px-3 py-2 rounded border ${link.active ? "bg-blue-600 text-white border-blue-600" : "border-gray-300 hover:bg-gray-100"}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                </div>
            </div>
            : null
    )
}