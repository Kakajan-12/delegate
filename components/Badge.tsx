type Props = {
    firstName: string;
    lastName: string;
    company?: string | null;
    phone?: string | null;
    email?: string | null;
};

export default function Badge({ firstName, lastName, company, phone, email }: Props) {
    return (
        <div
            style={{
                width: "89mm",
                height: "130mm",
                backgroundImage: "url(/FRONT.png)",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                position: "relative",
            }}
            className="overflow-hidden"
        >
            <div
                style={{
                    position: "absolute",
                    left: "0mm",
                    top: "42mm",
                    width: "60mm",
                    height: "12mm",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "1mm",
                }}
            >
                <div
                    style={{
                        color: "#000",
                        fontSize: "20pt",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        lineHeight: 1.1,
                        wordBreak: "break-word",
                    }}
                >
                    {firstName || "Имя"}
                </div>
            </div>

            <div
                style={{
                    position: "absolute",
                    left: "0mm",
                    top: "55mm",
                    width: "60mm",
                    height: "7mm",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        color: "#000",
                        fontSize: "16pt",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        lineHeight: 1,
                        wordBreak: "break-word",
                    }}
                >
                    {lastName || "Фамилия"}
                </div>
            </div>

            <div
                style={{
                    position: "absolute",
                    left: "0mm",
                    top: "80mm",
                    width: "60mm",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "1mm",
                }}
            >
                {company && (
                    <div
                        style={{
                            color: "#000",
                            fontSize: "18pt",
                            fontWeight: 600,
                            lineHeight: 1.2,
                            wordBreak: "break-word",
                        }}
                    >
                        {company}
                    </div>
                )}
                {phone && (
                    <div
                        style={{
                            color: "#333",
                            fontSize: "12pt",
                            lineHeight: 1.2,
                            wordBreak: "break-word",
                        }}
                    >
                        {phone}
                    </div>
                )}
                {email && (
                    <div
                        style={{
                            color: "#333",
                            fontSize: "12pt",
                            lineHeight: 1.2,
                            wordBreak: "break-all",
                        }}
                    >
                        {email}
                    </div>
                )}
            </div>
        </div>
    );
}