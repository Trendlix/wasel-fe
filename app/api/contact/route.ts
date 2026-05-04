import { NextResponse } from "next/server";

type ContactPayload = {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
};

const parseMessage = (raw: string): string | null => {
    const text = raw.trim();
    if (!text) return null;
    try {
        const parsed = JSON.parse(text) as Record<string, unknown>;
        if (typeof parsed.message === "string" && parsed.message.trim()) return parsed.message.trim();
        if (typeof parsed.error === "string" && parsed.error.trim()) return parsed.error.trim();
    } catch {
        return text;
    }
    return text;
};

const decodeHtmlEntities = (raw: string): string =>
    raw
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, "\"")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

const stripHtml = (raw: string): string => decodeHtmlEntities(raw.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());

const extractAppsScriptHtmlError = (rawHtml: string): string => {
    const decoded = decodeHtmlEntities(rawHtml);
    const body = decoded.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? decoded;
    const divMatches = [...body.matchAll(/<div[^>]*>([\s\S]*?)<\/div>/gi)];
    const lastDiv = divMatches.at(-1)?.[1];
    return stripHtml(lastDiv ?? body);
};

const looksLikeHtml = (raw: string, contentType: string | null): boolean => {
    if (contentType?.toLowerCase().includes("text/html")) return true;
    const text = raw.trim().toLowerCase();
    return text.startsWith("<!doctype html") || text.startsWith("<html");
};

export async function POST(req: Request) {
    const scriptUrl =
        process.env.GOOGLE_SPREADSHEET_LINK?.replace(/^"|"$/g, "") ||
        process.env.NEXT_PUBLIC_GOOGLE_SPREADSHEET_LINK?.replace(/^"|"$/g, "");

    if (!scriptUrl) {
        return NextResponse.json(
            { message: "Contact endpoint is not configured." },
            { status: 500 },
        );
    }

    let payload: ContactPayload;
    try {
        payload = (await req.json()) as ContactPayload;
    } catch {
        return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const formBody = new URLSearchParams({
        name: (payload.name ?? "").trim(),
        email: (payload.email ?? "").trim(),
        phone: (payload.phone ?? "").trim(),
        message: (payload.message ?? "").trim(),
    });

    try {
        const upstream = await fetch(scriptUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formBody.toString(),
            cache: "no-store",
        });

        const text = await upstream.text();
        const contentType = upstream.headers.get("content-type");
        const htmlResponse = looksLikeHtml(text, contentType);
        const plainText = htmlResponse ? extractAppsScriptHtmlError(text) : stripHtml(text);
        const message = parseMessage(text) ?? (plainText || "Message sent successfully.");

        // Google Apps Script can return 200 with an HTML error page. Treat this as a failure.
        if (htmlResponse) {
            const doPostMissing =
                plainText.includes("doPost") ||
                plainText.includes("تعذر العثور على دالة النص البرمجي: doPost");
            const appendRowNull =
                plainText.includes("appendRow") && plainText.toLowerCase().includes("null");

            return NextResponse.json(
                {
                    message: doPostMissing
                        ? "Google Apps Script error: doPost function was not found. Deploy a new Apps Script version with doPost(e)."
                        : appendRowNull
                            ? "Google Apps Script error: appendRow failed because sheet tab was not found. Verify getSheetByName(...) matches the exact tab name."
                        : plainText || "Upstream form service returned an unexpected HTML response.",
                },
                { status: 502 },
            );
        }

        if (!upstream.ok) {
            return NextResponse.json(
                { message },
                { status: upstream.status >= 400 ? upstream.status : 502 },
            );
        }

        // Frontend expects 201 for success modal.
        return NextResponse.json({ message }, { status: 201 });
    } catch {
        return NextResponse.json(
            { message: "Failed to contact upstream form service." },
            { status: 502 },
        );
    }
}
