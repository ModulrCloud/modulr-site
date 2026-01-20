import { NextResponse } from "next/server";

type JoinPayload = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

function isEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as JoinPayload | null;
  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Please fill out all fields." },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  // TODO: wire to email/CRM later. For now, we just accept the request.
  // eslint-disable-next-line no-console
  console.log("[join]", { firstName, lastName, email, messageLength: message.length });

  return NextResponse.json({ ok: true }, { status: 200 });
}




