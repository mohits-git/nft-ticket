import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const uploadData = await pinata.upload.json(data);
    const url = await pinata.gateways.convert(uploadData.IpfsHash)
    return NextResponse.json({ jsonUrl: url }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
