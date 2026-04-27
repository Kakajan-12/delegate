export const CATEGORIES = [
    { id: "delegate", name: "Делегат", color: "#185FA5", bg: "#E6F1FB" },
    { id: "visitor", name: "Визитор", color: "#5F5E5A", bg: "#F1EFE8" },
    { id: "press", name: "Пресс", color: "#D85A30", bg: "#FAECE7" },
    { id: "speaker", name: "Спикер", color: "#534AB7", bg: "#EEEDFE" },
    { id: "organizer", name: "Организатор", color: "#1D9E75", bg: "#E1F5EE" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export function getCategory(id: string) {
    return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}

export type Participant = {
    id: string;
    first_name: string;
    last_name: string;
    company: string | null;
    phone: string | null;
    email: string | null;
    created_at: string;
};