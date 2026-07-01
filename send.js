export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const { texte } = req.body;

    if (!texte || texte.length < 25) {
        return res.status(400).json({
            error: "Texte trop court"
        });
    }

    try {

        await fetch(process.env.DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: "```\n" + texte + "\n```"
            })
        });

        return res.status(200).json({
            success: true
        });

    } catch (err) {

        return res.status(500).json({
            error: "Erreur serveur"
        });

    }
}
