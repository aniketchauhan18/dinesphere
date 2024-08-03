import { fetchUserById } from "../../../../lib/data";
import { NextResponse } from "next/server";

export async function GET(req: { params: { id: string } }) {
  try {
    const { id } = req.params;
    const user = await fetchUserById(id);
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
